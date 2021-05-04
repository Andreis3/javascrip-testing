const TextProcessorFluentAPI = require('./textProcessorFluentAPI');

class TextProcessorFacade{
  #textProcessorFluentApi;
  constructor(text) {
    this.#textProcessorFluentApi = new TextProcessorFluentAPI(text);
  }

  getPeopleFromPDF() {
    return this.#textProcessorFluentApi
            .extractPeopleData()
            .divideTextInColumns()
            .removeEmptyCharacters()
            .mapPerson()
            .build()
  }
}

module.exports = TextProcessorFacade;