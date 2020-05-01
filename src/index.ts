#!/usr/bin/env node

const inquirer = require('inquirer');
const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');
const ora = require('ora');
const { readdirSync } = require('fs');
const path = require('path');
const ncp = require('ncp').ncp;

console.log(
  chalk.red(figlet.textSync('firebase-switch', { horizontalLayout: 'full' }))
);

const base_path = 'firebase-switch';
const getDirectories = (source: any) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent: any) => dirent.isDirectory())
    .map((dirent: any) => dirent.name);
var choices = getDirectories(base_path);
if (choices.length == 0) {
  console.log('No project found! Check firebase-switch folder.');
} else {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'selected_folder',
        message: 'Select project to switch:',
        choices: choices
      }
    ])
    .then((answers: any) => {
      var source = path.join(base_path, answers.selected_folder)
      var destination = ".";
      ncp(source, destination, (err: any) =>  {
        if (err) {
          return console.error(err);
        }
        console.log('done!');
       });
    });
}