const contentful = require("contentful");
require("dotenv").config();
const chalk = require("chalk");

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: process.env.CONTENTFUL_SPACE,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: process.env.CONTENTFUL_TOKEN,
});

function checkAllDocsHaveTextField(data) {
  let isAllDocsHaveTextField = [];
  data.forEach((item) => {
    if (!item.fields.text) {
      isAllDocsHaveTextField.push(item.fields.name);
    }
  });
  if (isAllDocsHaveTextField.length <= 0) {
    console.log(chalk.green("✔️All suttas have text field"));
  } else {
    isAllDocsHaveTextField.forEach((name) => {
      console.log(chalk.yellow(name, "missing text field"));
    });
  }
}

function checkAllDocsHaveHasDifficultyLevelField(data) {
  let errors = [];
  data.forEach((item) => {
    if (!item.fields.hasOwnProperty("hasDifficultyLevel")) {
      errors.push(item.fields.codeName);
    }
  });
  if (errors.length <= 0) {
    console.log(chalk.green("✔️All suttas have has difficulty level field"));
  } else {
    errors.forEach((name) => {
      console.log(chalk.yellow(name, "missing has difficulty level field"));
    });
  }
}

function checkAllDocsHasIncorrectDifficultyLevel(data) {
  let errors = [];
  data.forEach((item) => {
    if (item.fields.hasDifficultyLevel && !item.fields.difficultyLevel) {
      errors.push(item.fields.codeName);
    }
  });
  if (errors.length <= 0) {
    console.log(chalk.green("✔️All suttas have has correct difficulty level"));
  } else {
    errors.forEach((name) => {
      console.log(chalk.yellow(name, "missing has incorrect difficulty level"));
    });
  }
}

function checkAllDocsHaveHasAudioField(data) {
  let errors = [];
  data.forEach((item) => {
    if (!item.fields.hasOwnProperty("hasAudio")) {
      errors.push(item.fields.codeName);
    }
  });
  if (errors.length <= 0) {
    console.log(chalk.green("✔️All suttas have has audio field"));
  } else {
    errors.forEach((name) => {
      console.log(chalk.yellow(name, "missing has audio field"));
    });
  }
}

(async function runAllCheckers() {
  try {
    let res = await client.getEntries({
      limit: 500,
      content_type: "sutta",
    });
    console.log(chalk.blue("Fetched", res.total, "sutta items from database."));

    let { items } = res;

    checkAllDocsHaveTextField(items);
    checkAllDocsHaveHasDifficultyLevelField(items);
    checkAllDocsHasIncorrectDifficultyLevel(items);
    checkAllDocsHaveHasAudioField(items);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
