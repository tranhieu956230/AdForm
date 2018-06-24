const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./app/controller/item.route');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

routes(app);

app.listen(process.env.PORT || 3000, () => {
    console.log('server now listen on port 3000');
})
