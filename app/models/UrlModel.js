var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ShortenerSchema = new Schema({
    shortener_id: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    shortened_url: { type: String, required: true, unique: true },
	created_at: Date
});

var Url = mongoose.model("Url", ShortenerSchema);
module.exports = Url;