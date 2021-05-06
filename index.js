const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const csvjson = require('csvjson');
const url = require('url');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.format({
        'text/html': function() {
            fs.readFile('gradovi.txt', (err, data) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                let jsonObj = csvjson.toObject(data.toString());
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('<table><tr><th>Grad</th>');
                res.write('<th>Drzava</th>');

                for (var i = 0; i < jsonObj.length; i++) {
                    res.write('<tr><td>' + jsonObj[i].Grad + '</td>');
                    res.write('<td>' + jsonObj[i].Drzava + '</td>');

                    res.write('</tr>');
                }
                res.write('</table>');
                res.send();
            });
        },

        'default': function() {
            // log the request and respond with 406
            res.status(406).send('Not Acceptable')
        }
    })
});

app.listen(8080);