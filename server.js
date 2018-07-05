const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./app/controller/item.route');
const path = require('path');
const [name, port] = process.env.argv;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static(path.join(__dirname, '/client/build/')));

app.get('/', (req, res) => {
    res.send('index.html');
})

routes(app);

app.listen(port, () => {
    console.log(name, 'is now listening on port', port);
})
