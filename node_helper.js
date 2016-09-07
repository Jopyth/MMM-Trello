/* Magic Mirror
 * Node Helper: Trello
 *
 * By Joseph Bethge
 * MIT Licensed.
 */

const Trello = require("node-trello");
const NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
    // Subclass start method.
    start: function() {
        var self = this;
        console.log("Starting node helper for: " + self.name);

        self.api_key = ""
        self.token = ""
        self.list = ""

        self.trello = false;
    },

    // Subclass socketNotificationReceived received.
    socketNotificationReceived: function(notification, payload) {
        var self = this;

        if (notification === "TRELLO_CONFIG") {
            self.api_key = payload.api_key;
            self.token = payload.token;

            self.createTrelloConnection();
        }

        if (notification === "REQUEST_LIST_CONTENT") {
            const list = payload.list;

            if (self.trello)
            {
                self.retrieveListContent(list);
            }
        }
    },

    // create trello connection
    createTrelloConnection: function() {
        var self = this;

        self.trello = new Trello(self.api_key, self.token);
    },

    // retrieve list content
    retrieveListContent: function(list) {
        var self = this;

        const path = "/1/lists/" + list + "/cards";

        self.trello.get(path, {}, function(error, data) {
            if (error)
            {
                self.sendSocketNotification("TRELLO_ERROR", error);
                return;
            }
            for (var card in data)
            {
                for (var checklist in data[card].idChecklists)
                {
                    const checklistId = data[card].idChecklists[checklist];
                    const checklistPath = "/1/checklists/" + checklistId;
                    self.trello.get(checklistPath, {}, function(error, checklistData) {
                        if (error)
                        {
                            console.log(error);
                            return;
                        }
                        self.sendSocketNotification("CHECK_LIST_CONTENT", checklistData);
                    });
                }
            }
            self.sendSocketNotification("LIST_CONTENT", data);
        });
    },
});
