const contentful = require("contentful");
const fs = require("fs");
require("dotenv").config();
const orderBy = require("lodash.orderby");
const chalk = require("chalk");

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: process.env.CONTENTFUL_SPACE,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: process.env.CONTENTFUL_TOKEN,
});

function getFileSizeInMegabytes(filename) {
  var stats = fs.statSync(filename);
  var fileSizeInBytes = stats["size"] / 1000000.0;
  return Math.round(fileSizeInBytes * 1000) / 1000;
}

function writeDataToDrive(data, path, lengthOfData) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2), {
    encoding: "utf-8",
  });
  let fileSize = getFileSizeInMegabytes(path);
  console.log(
    chalk.bgGreen(
      "Successfully save",
      lengthOfData,
      "data:",
      fileSize,
      "MBs. With each file cost approximately",
      Math.round((fileSize / lengthOfData) * 1000) / 1000,
      "MBs."
    )
  );
}

function sanitizeCollection(data) {
  let collections = {
    byIds: {},
    allIds: [],
  };

  data.forEach((item) => {
    const id = item.sys.id;
    const fields = item.fields;
    collections.byIds[id] = {
      ...fields,
      id: id,
      groups: fields.groups ? fields.groups.map((group) => group.sys.id) : [],
    };
    collections.allIds.push(id);
  });

  function reorderCollectionIds() {
    let collectionsObj = collections.allIds.map((id) => collections.byIds[id]);
    collectionsObj = orderBy(collectionsObj, "order", "asc");
    collections.allIds = collectionsObj.map((obj) => obj.id);
  }

  reorderCollectionIds();

  return collections;
}

(async function getCollectionData() {
  let collectionRes = await client.getEntries({
    limit: 100,
    content_type: "collection",
    include: 0,
  });
  console.log(
    chalk.blue(
      "Fetched",
      collectionRes.total,
      "collection items from database."
    )
  );
  let collections = sanitizeCollection(collectionRes.items);
  writeDataToDrive(
    collections,
    "./database/collections.json",
    collections.allIds.length
  );
})();

function sanitizeGroup(data) {
  let groups = {
    byIds: {},
    allIds: [],
  };
  data.forEach((item) => {
    let id = item.sys.id;
    let fields = item.fields;
    groups.byIds[id] = {
      ...fields,
      id: id,
      suttas: fields.suttas ? fields.suttas.map((sutta) => sutta.sys.id) : [],
    };
    groups.allIds.push(id);
  });
  return groups;
}

(async function getGroupData() {
  try {
    let groupRes = await client.getEntries({
      limit: 1000,
      content_type: "group",
      include: 0,
    });
    console.log(
      chalk.blue("Fetched", groupRes.total, "group items from database.")
    );
    let groups = sanitizeGroup(groupRes.items);
    writeDataToDrive(groups, "./database/groups.json", groups.allIds.length);
  } catch (error) {
    console.error(error);
  }
})();

function sanitizeSutta(data) {
  let suttas = {
    byIds: {},
    allIds: [],
  };
  let suttasText = {
    byIds: {},
    allIds: [],
  };

  data.forEach((item) => {
    let id = item.sys.id;
    let fields = item.fields;
    fields.belongToGroup = fields.belongToGroup.sys.id;
    fields.belongToCollection = fields.belongToCollection.sys.id;

    if (!fields.text) {
      console.log(fields.name, "does not have text");
      process.exit(1);
    }

    let joinedText = fields.text;
    if (fields.textExtended) {
      joinedText.concat(fields.textExtended);
    }
    if (fields.textFurtherExtended) {
      joinedText.concat(fields.textFurtherExtended);
    }
    if (fields.textFurtherExtended2) {
      joinedText.concat(fields.textFurtherExtended2);
    }
    if (fields.textFurtherExtended3) {
      joinedText.concat(fields.textFurtherExtended3);
    }

    suttasText.byIds[id] = joinedText;
    suttasText.allIds.push(id);

    delete fields.text;
    delete fields.textExtended;
    delete fields.textFurtherExtended;

    suttas.byIds[id] = {
      ...fields,
      id: id,
    };
    if (suttas.byIds[id].tracks) {
      suttas.byIds[id].tracks = suttas.byIds[id].tracks.map(
        (track) => track.sys.id
      );
    }
    suttas.allIds.push(id);
  });

  return { suttas, suttasText };
}

(async function getSuttaData() {
  try {
    let items = [];
    for (let i = 0; i < 10; i++) {
      console.log("Fetching sutta", i + 1, "/10");
      let res = await client.getEntries({
        limit: 100,
        skip: i * 100,
        content_type: "sutta",
        include: 0,
      });
      items = [...items, ...res.items];
    }

    console.log(
      chalk.blue("Fetched", items.length, "sutta items from database.")
    );
    let { suttas, suttasText } = sanitizeSutta(items);
    writeDataToDrive(suttas, "./database/suttas.json", suttas.allIds.length);
    writeDataToDrive(
      suttasText,
      "./database/suttasText.json",
      suttasText.allIds.length
    );
  } catch (error) {
    console.error(error);
  }
})();

(async function getTrackData() {
  try {
    let assets = await client.getAssets({
      limit: 500,
    });
    console.log(chalk.bgBlueBright("Fetched", assets.items.length, "assets."));
    let tracks = {
      byIds: {},
      allIds: [],
    };
    assets.items.forEach((item) => {
      let id = item.sys.id;
      if (item.fields.file.contentType === "audio/mpeg") {
        tracks.byIds[id] = {
          ...item.fields.file,
          size: item.fields.file.details.size,
          title: item.fields.title,
          id: id,
        };
        delete tracks.byIds[id].details;
        tracks.allIds.push(id);
      }
    });
    writeDataToDrive(tracks, "./database/tracks.json", tracks.allIds.length);
  } catch (error) {
    console.error(error);
  }
})();
