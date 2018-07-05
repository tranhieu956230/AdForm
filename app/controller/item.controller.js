const db = require('../config/db.config');

const Item = db.item;
const AdCareer = db.adcareer;
const AdPurpose = db.adpurpose;
const AdType = db.adtype;
const AdBase = db.adbase;
module.exports.queryData = (req, res) => {
    const adcareerID = req.body.adcareerID;
    const adpurposeID = req.body.adpurposeID;
    const adtypeID = req.body.adtypeID;
    const adbaseID = req.body.adbaseID;
    var os = (req.body.page - 1) * 12;
    var objc = {};
    var objp = {};
    var objt = {};
    var objb = {};
    if (adcareerID >= 1 && adcareerID != null && typeof adcareerID != "undefined") objc.ad_id = adcareerID;
    if (adpurposeID >= 1 && adpurposeID != null && typeof adpurposeID != "undefined") objp.ad_id = adpurposeID;
    if (adtypeID >= 1 && adtypeID != null && typeof adtypeID != "undefined") objt.ad_id = adtypeID;
    if (adbaseID >= 1 && adbaseID != null && typeof adbaseID != "undefined") objb.ad_id = adbaseID;

    Item.findAll({
        attributes: ['id', 'link', 'thumb', 'title', 'post_date', 'link_embed'],
        include: [{
            model: AdCareer,
            where: objc,
        }, {
            model: AdPurpose,
            where: objp,
        }, {
            model: AdType,
            where: objt,
        }, {
            model: AdBase,
            where: objb,
        }],
        offset: os,
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
    return Item.create({
        link: req.body.link,
        thumb: req.body.thumb,
        title: req.body.title,
        post_date: `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`,
        link_embed: req.body.link_embed,
        adcareerID: req.body.adcareerID,
        adpurposeID: req.body.adpurposeID,
        adtypeID: req.body.adtypeID,
        adbaseID: req.body.adbaseID,
    })
        .then((item) => {
            return AdCareer.findOne({
                where: {
                    ad_id: req.body.adcareerID,
                }
            }).then((adcareer) => {
                return adcareer.setItems(item);
            })
                .catch(err => {
                    console.log(err);
                })
                .then(() => {
                    return AdPurpose.findOne({
                        where: {
                            ad_id: req.body.adpurposeID
                        }
                    }).then((adpurpose) => {
                        return adpurpose.setItems(item);
                    })
                })
                .catch(err => {
                    console.log(err);
                })
                .then(() => {
                    return AdType.findOne({
                        where: {
                            ad_id: req.body.adtypeID
                        }
                    }).then((adtype) => {
                        return adtype.setItems(item);
                    })
                })
                .catch(err => {
                    console.log(err);
                })
                .then(() => {
                    return AdBase.findOne({
                        where: {
                            ad_id: req.body.adbaseID
                        }
                    }).then((adbase) => {
                        return adbase.setItems(item);
                    })
                }).catch(err => {
                    console.log(err);
                })
        })
        .then(() => {
            res.send('Item created')
        }).catch(err => {
            res.status(500).send(err);
        })
}

module.exports.deleteItem = (req, res) => {
    return Item.findOne({
        where: {
            id: req.body.id,
        }
    }).then((item) => {
        return item.destroy()

    }).then(() => {
        res.status(200).send("Item deleted");
    })
        .catch(err => {
            res.status(404).send(err);
        });
}

module.exports.updateItem = (req, res) => {
    return Item.findOne({
        where: {
            id: req.body.id,
        }
    }).then((item) => {
        return item.update({
            link: req.body.link,
            thumb: req.body.thumb,
            title: req.body.title,
            link_embed: req.body.link_embed,
        }).then(() => {
            console.log("Item updated");
            res.send("ok");
        }).catch(err => {
            res.status(404).send(err);
        })
    }).catch((err) => {
        res.status(404).send(err);
    })
}

