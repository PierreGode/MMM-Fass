const NodeHelper = require("node_helper");
const request = require("request");

module.exports = NodeHelper.create({
    start: function() {
        console.log("MMM-Fass helper started...");
    },

    getStockInfo: function(productId, authToken) {
        var self = this;
        var options = {
            url: `https://api.fass.se/medicinal-product/${productId}`,
            method: 'GET',
            headers: {
                'Accept': 'application/fassapi-v1+json',
                'Authorization': `Bearer ${authToken}`
            }
        };

        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                self.sendSocketNotification("STOCK_INFO", JSON.parse(body));
            } else {
                console.log("Error getting stock information: ", error ? error : response.statusCode);
            }
        });
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "GET_STOCK_INFO") {
            this.getStockInfo(payload.productId, payload.authToken);
        }
    }
});
