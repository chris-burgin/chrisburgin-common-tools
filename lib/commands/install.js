// library import
const fs = require("fs-extra")
const path = require("path")
const chalk = require("chalk")

// installer entry point that executes multiple installers
const install = async () =>
  new Promise(async (resolve, reject) => {
    log("Installing...")

    try {
      // eslint
      await eslint()
      await eslintignore()
      logG("eslint ✓")

      // prettier
      await prettier()
      await prettierIgnore()
      logG("prettier ✓")

      // vscode settings
      await vscode()
      logG("vscode ✓")

      // done
      log("Finished Installing.")
      resolve()
    } catch (e) {
      reject(e)
    }
  })

// installers
// eslint
const eslint = async () =>
  fs.copy(current("../../configs/.eslintrc"), join(process.cwd(), ".eslintrc"))

const eslintignore = async () =>
  fs.copy(
    current("../../configs/.eslintignore"),
    join(process.cwd(), ".eslintignore")
  )

// prettier
const prettier = async () =>
  fs.copy(
    current("../../configs/prettier.config.js"),
    join(process.cwd(), "prettier.config.js")
  )

const prettierIgnore = async () =>
  fs.copy(
    current("../../configs/.prettierignore"),
    join(process.cwd(), ".prettierignore")
  )

// vscode
const vscode = async () =>
  fs.copy(
    current("../../configs/vscode.settings.json"),
    join(process.cwd(), ".vscode", "settings.json")
  )

// helpers
const current = (...args) => path.join(__dirname, ...args)
const join = (...args) => path.join(...args)
const log = msg => console.log(chalk.blue(msg))
const logG = msg => console.log(chalk.green(msg))

// export
module.exports = install
