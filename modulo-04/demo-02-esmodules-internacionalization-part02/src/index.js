import database from "../database.json";
import TerminalController from './terminalController.js'
import Person from './person.js';

const DEFAULT_LANG = 'pt-BR';
const STOP_TERMINAL = ':q';

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANG);

async function mainLoop() {
  try {
    const answer = await terminalController.question('What??');

    if(answer === STOP_TERMINAL) {
      terminalController.closeTerminal();
      console.log('process finished!!!');
      return;
    }

    // 2 Bike,Avião,Navio 200000000 2000-01-01 2002-02-01
    const person = Person.generateInstanceFromString(answer);
    console.log('person', person.formatted(DEFAULT_LANG));
    
    return mainLoop();

  } catch (error) {
    console.error('DEU RUIM**',error);
    return mainLoop();
  }
}

await mainLoop()
