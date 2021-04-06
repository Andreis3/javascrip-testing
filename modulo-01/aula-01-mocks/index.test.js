const { rejects, deepStrictEqual } = require('assert');
const { error } = require('./src/constants');
const File = require('./src/File');
(async () => {
  {
    const filePath = './mocks/empty-files-invalid.csv';
    const rejection = new  Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = './mocks/four-items-invalid.csv';
    const rejection = new  Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = './mocks/three-items-valid.csv';
    const result = await File.csvToJson(filePath);
    const expect = 
      [
        {
          "id": 123,
          "name": "Goku",
          "profession": "Javascript Instructor",
          "birthDay": 1991
        },
        {
          "id": 456,
          "name": "Vegeta",
          "profession": "Javascript Specialist",
          "birthDay": 1990
        },
        {
          "id": 789,
          "name": "Piccolo",
          "profession": "Java Developer",
          "birthDay": 1916
        }
      ]
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expect));
  } 
})();