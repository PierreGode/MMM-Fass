Module.register("MMM-Fass", {
    // Default module config.
    defaults: {
        updateInterval: 600000, // Update every 10 minutes.
    },

    start: function() {
        this.stockInfo = null;
        this.getStockInfo();
        this.scheduleUpdate();
    },

    getStockInfo: function() {
        this.sendSocketNotification("GET_STOCK_INFO", {
            apiUrl: "https://api.fass.se/endpoint" // Your actual API endpoint here
        });
    },

    // Override dom generator.
    getDom: function() {
        var wrapper = document.createElement("div");

        if (this.stockInfo) {
            wrapper.innerHTML = "Stock information here"; // Add meaningful content using stockInfo data
            // You can iterate over this.stockInfo and build your DOM elements accordingly.
        } else {
            wrapper.innerHTML = "Loading...";
        }

        return wrapper;
    },

    scheduleUpdate: function() {
        var self = this;
        setInterval(function() {
            self.getStockInfo();
        }, this.config.updateInterval);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "STOCK_INFO") {
            this.stockInfo = payload;
            this.updateDom();
        }
    }
});
