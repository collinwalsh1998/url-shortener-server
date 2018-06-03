//packages
let mongoose = require("mongoose");
let uniqid = require("uniqid");

//models
let Url = require("../models/UrlModel");

module.exports.generateURL = function(req, res) {
    let url = req.body.url;

    if(!validateUrl(url)) {
        res.status(400);
        res.json({ success: false, message: "An invalid URL has been received" });
        return;
    }

    let urlEntry = new Url({
        shortener_id: uniqid(),
        url: url,
        shortened_url: uniqid(),
        created_at: new Date(),
    });

    urlEntry.save(function(error) {
        if(error) {
            res.status(400);
            res.json({ success: false, message: "An error occurred generating the URL" });
            return;
        }

        let urlData = urlEntry.toObject();
        delete urlData._id;
        delete urlData.__v;
        delete urlData.shortener_id;
        delete urlData.url;
        delete urlData.created_at;

        res.status(200);
        res.json(urlData);
        return;
    });
}

function validateUrl(url) {
    let urlPattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    
    if(!url || !urlPattern.test(url)) {
        return false;
    }

    return true;
}