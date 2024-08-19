const pdf = require('pdf-parse');

const parsePDFText = async (fileBuffer) => {
  const data = await pdf(fileBuffer);
  return data.text;
};

module.exports = { parsePDFText };