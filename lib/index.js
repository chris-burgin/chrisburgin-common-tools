#!/usr/bin/env node

// wrapper to provide async
const main = async () => {
  // library imports
  const cli = require("cli")
  const chalk = require("chalk")

  // local imports
  const install = require("./commands/install")

  // setup parser
  cli.parse(null, ["install"])

  // setup the switch too direct commands
  const cmdSwitch = {
    install: install,
  }
  // execute a command
  try {
    await cmdSwitch[cli.command]()
    console.log(chalk.green("Done 🔥"))
  } catch (e) {
    console.log(chalk.red("Failed to execute command."))
  }
} // execute main
main()
