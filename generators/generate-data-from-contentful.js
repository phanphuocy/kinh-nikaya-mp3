const contentful = require("contentful");
const fs = require("fs");
require("dotenv").config();
const orderBy = require("lodash.orderby");

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

(async function getAllEntries() {
  const entries = await client.getEntries();

  let collections = {
    byIds: {},
    allIds: [],
  };
  let groups = {
    byIds: {},
    allIds: [],
  };
  let suttas = {
    byIds: {},
    allIds: [],
  };
  let suttasText = {
    byIds: {},
    allIds: [],
  };

  function sanitizeAndPopulateCollection(id, fields) {
    collections.byIds[id] = {
      ...fields,
      id: id,
      groups: fields.groups
        ? fields.groups.map((group) => {
            delete group.fields.suttas;
            return {
              ...group.fields,
              id: group.sys.id,
            };
          })
        : [],
    };

    collections.allIds.push(id);
  }

  function sanitizeAndPopulateGroup(id, fields) {
    groups.byIds[id] = {
      ...fields,
      id: id,
      suttas: fields.suttas
        ? fields.suttas.map((sutta) => {
            delete sutta.fields.text;
            delete sutta.fields.textExtended;
            return {
              ...sutta.fields,
              id: sutta.sys.id,
            };
          })
        : [],
    };
    groups.allIds.push(id);
  }

  function sanitizeAndPopulateSutta(id, fields) {
    let joinedText = fields.text.concat(fields.textExtended);

    suttasText.byIds[id] = joinedText;
    suttasText.allIds.push(id);

    delete fields.text;
    delete fields.textExtended;

    suttas.byIds[id] = {
      ...fields,
      id: id,
    };
    suttas.allIds.push(id);
  }

  entries.items.forEach((item) => {
    let contentType = item.sys.contentType.sys.id;
    let id = item.sys.id;
    let fields = item.fields;

    switch (contentType) {
      case "collection":
        sanitizeAndPopulateCollection(id, fields);
        break;
      case "group":
        sanitizeAndPopulateGroup(id, fields);
        break;
      case "sutta":
        sanitizeAndPopulateSutta(id, fields);
        break;
      default:
        return;
    }
  });

  function reorderCollectionIds() {
    let collectionsObj = collections.allIds.map((id) => collections.byIds[id]);
    collectionsObj = orderBy(collectionsObj, "order", "asc");
    collections.allIds = collectionsObj.map((obj) => obj.id);
  }

  reorderCollectionIds();

  function writeDataToDrive(data, path, lengthOfData) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2), {
      encoding: "utf-8",
    });
    let fileSize = getFileSizeInMegabytes(path);
    console.log(
      "Successfully save",
      lengthOfData,
      "data:",
      fileSize,
      "MBs. With each file cost approximately",
      Math.round((fileSize / lengthOfData) * 1000000) / 1000000,
      "MBs."
    );
  }

  writeDataToDrive(
    collections,
    "./database/collections.json",
    collections.allIds.length
  );
  writeDataToDrive(groups, "./database/groups.json", groups.allIds.length);
  writeDataToDrive(suttas, "./database/suttas.json", suttas.allIds.length);
  writeDataToDrive(
    suttasText,
    "./database/suttasText.json",
    suttasText.allIds.length
  );
})();
