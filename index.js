const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  request('http://www.imdb.com', function(error, response, body) {
    let arr = [];
    if (!error && response.statusCode == 200) {
      let $ = cheerio.load(body);
      $('div .title')
        .children('a')
        .each((i, element) => {
          arr.push({ [i]: element.attribs.href });
        });
      res.json(arr);
    }
  });
});

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
