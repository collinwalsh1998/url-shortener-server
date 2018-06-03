//controllers
let UrlController = require("../controllers/UrlController");

module.exports = function(app) {
    app.post("/generateURL", UrlController.generateURL);
}