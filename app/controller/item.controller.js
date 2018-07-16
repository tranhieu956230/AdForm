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
    let association = [];
    if (adcareerID >= 1 && adcareerID != null && typeof adcareerID != "undefined") {
        association.push({
            model: AdCareer,
            where: {
                ad_id: adcareerID,
            }
        })
    }
    if (adpurposeID >= 1 && adpurposeID != null && typeof adpurposeID != "undefined"){
        association.push({
            model: AdPurpose,
            where: {
                ad_id: adpurposeID,
            }
        })
    };
    if (adtypeID >= 1 && adtypeID != null && typeof adtypeID != "undefined") {
        association.push({
            model: AdType,
            where: {
                ad_id: adtypeID,
            }
        })
    };
    if (adbaseID >= 1 && adbaseID != null && typeof adbaseID != "undefined") {
        association.push({
            model: AdBase,
            where: {
                ad_id: adbaseID
            }
        })
    };
    console.log("--------------Association------------------");
    console.log(association);
    
    
    Item.findAndCountAll({
        attributes: ['id', 'link', 'thumb', 'title', 'post_date', 'link_embed'],
        include: association,
        offset: os,
        limit: 12,
    }).then((result) => {
        let data = result.rows.map(obj => {
            return Object.assign({}, {
                id: obj.id,
                link: obj.link,
                title: obj.title,
                thumb: obj.thumb,
                post_date: obj.post_date,
                link_embed: obj.link_embed,

            })
        })
        const ret = {
            pagin: Math.floor(result.count /12 )+ ((result.count % 12 === 0) ? 0 : 1),
            data: data
        }
        res.json(ret);
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

