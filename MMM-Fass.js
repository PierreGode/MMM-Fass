//Unkompleted//
Module.register("MMM-Fass", {
    // Default module config.
    defaults: {
        updateInterval: 600000, // Update every 10 minutes.
        fassProductId: '', // User will define this in their config
        fassAuthToken: '', // Secure token for API access, the user needs to add their own token here
    },

    start: function() {
        this.stockInfo = null;
        this.getStockInfo();
        this.scheduleUpdate();
    },

    getStockInfo: function() {
        if(this.config.fassProductId === '' || this.config.fassAuthToken === '') {
            Log.error("FASS Product ID or Auth Token is not defined.");
            return;
        }
        this.sendSocketNotification("GET_STOCK_INFO", {
            productId: this.config.fassProductId, // Uses the user-defined product ID from config
            authToken: this.config.fassAuthToken, // Uses the user-defined auth token from config
        });
    },

    // Override dom generator.
    getDom: function() {
        var wrapper = document.createElement("div");

        if (this.stockInfo) {
            // You can add the logic to display the stockInfo in a meaningful way
            // Example: wrapper.innerHTML = this.stockInfo.productName + " stock information";
            wrapper.innerHTML = JSON.stringify(this.stockInfo, undefined, 2); // Temporary to show data
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
            this.updateDom(); // Ensure to call updateDom to refresh the view with new data
        }
    }
});
