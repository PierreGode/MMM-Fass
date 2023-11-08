const NodeHelper = require("node_helper");
const request = require("request");

module.exports = NodeHelper.create({
    start: function() {
        console.log("MMM-Fass helper started...");
    },

    getStockInfo: function(apiUrl) {
        var self = this;
        request({ url: apiUrl, method: 'GET' }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Send the response to the frontend module
                self.sendSocketNotification("STOCK_INFO", JSON.parse(body));
            } else {
                console.log("Error getting stock information: " + response.statusCode);
            }
        });
    },

    // Subclass socketNotificationReceived received.
    socketNotificationReceived: function(notification, payload) {
        if (notification === "GET_STOCK_INFO") {
            this.getStockInfo(payload.apiUrl);
        }
    }
});
