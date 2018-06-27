const items = require('./item.controller');
module.exports = (app) => {
    app.post('/api/getitems', items.queryData);

    app.post('/api/postitem', items.postItem);

    app.delete('/api/deleteitem/', items.deleteItem);

    app.put('/api/updateitem', items.updateItem);

}