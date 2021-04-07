import Draftlog from 'draftlog';
import Chalk from 'chalk';
import chalkTable from 'chalk-table';
import readLine from 'readline';

import database from "./../database.json";
import Person from './person.js';


Draftlog(console).addLineListener(process.stdin);
const DEFAULT_LANG = 'pt-BR';

const options = {
  leftPad: 2,
  columns: [
    { field: 'id', name: Chalk.cyan("ID") },
    { field: 'vehicles', name: Chalk.magenta("Vehicles") },
    { field: 'kmTraveled', name: Chalk.cyan("Km Traveled") },
    { field: 'from', name: Chalk.cyan("From") },
    { field: 'to', name: Chalk.cyan("To") },
  ]
};

const table = chalkTable(options, database.map(item => new Person(item).formatted(DEFAULT_LANG)));
const print = console.draft(table);

const terminal = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
});

terminal.question('Qual seu nome?', msg => {
  console.log('msg', msg.toString());
})