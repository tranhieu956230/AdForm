const db = require('../config/db.config');

const Item = db.item;

module.exports.queryData = (req, res) => {
    const adcareerID = req.body.adcareerID;
    const adpurposeID = req.body.adpurposeID;
    const adtypeID = req.body.adtypeID;
    const adbaseID = req.body.adbaseID;
    const offset = (req.body.page - 1) * 12;
    const queryObj = {}

    if (adcareerID != -1) queryObj.adcareerID = adcareerID;
    if (adtypeID != -1) queryObj.adtypeID = adtypeID;
    if (adpurposeID != -1) queryObj.adpurposeID = adpurposeID;
    if (adbaseID != -1) queryObj.adbaseID = adbaseID;

    Item.findAll({
        attributes: ['id', 'link', 'thumb', 'title', 'postDate', 'link_embed'],
        where: queryObj,
        offset: offset,
        limit: 12,
    }).then((items) => {
        console.log(items);
        res.json(items);
    }).catch(err => {
        res.status(500).send(err);
    })

}

module.exports.postItem = (req, res) => {
    var d = new Date();
    Item.create({
        link: req.body.link,
        thumb: req.body.thumb,
        title: req.body.title,
        postDate: `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`,
        link_embed: req.body.link_embed,
        adcareerID: req.body.adcareerID,
        adpurposeID: req.body.adpurposeID,
        adtypeID: req.body.adtypeID,
        adbaseID: req.body.adbaseID,
    }).then(() => {
        res.send('Item created successful')
    }).catch(err => {
        res.status(500).send(err);
    })
}