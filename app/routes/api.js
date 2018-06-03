//controllers
let UrlController = require("../controllers/UrlController");

module.exports = function(app) {
    app.get("/:urlId", UrlController.redirect);
    app.post("/generateURL", UrlController.generateURL);
}