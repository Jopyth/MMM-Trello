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

        self.trelloConnections = {};
    },

    // Subclass socketNotificationReceived received.
    socketNotificationReceived: function(notification, payload) {
        var self = this;

        if (notification === "TRELLO_CONFIG") {
            self.createTrelloConnection(payload.id, payload.api_key, payload.token);
        }

        if (notification === "REQUEST_LIST_CONTENT") {
            const list = payload.list;
            const id = payload.id;

            self.retrieveListContent(list, id);
        }
    },

    // create trello connection
    createTrelloConnection: function(id, key, token) {
        var self = this;

        if (key === "")
        {
            var error = {statusCode: 400, statusMessage: "api_key is empty", responseBody: "Please add it."};
            self.sendSocketNotification("TRELLO_ERROR", {id: id, error: error});
            return;
        }

        self.trelloConnections[id] = new Trello(key, token);
    },

    // retrieve list content
    retrieveListContent: function(list, id) {
        var self = this;

        if (!self.trelloConnections[id]) {
            return;
        }

        const path = "/1/lists/" + list + "/cards";

        self.trelloConnections[id].get(path, {}, function(error, data) {
            if (error)
            {
                console.log(error);
                self.sendSocketNotification("TRELLO_ERROR", {id: id, error: error});
                return;
            }
            for (var card in data)
            {
                for (var checklist in data[card].idChecklists)
                {
                    const checklistId = data[card].idChecklists[checklist];
                    const checklistPath = "/1/checklists/" + checklistId;
                    self.trelloConnections[id].get(checklistPath, {}, function(error, checklistData) {
                        if (error)
                        {
                            console.log(error);
                            return;
                        }
                        self.sendSocketNotification("CHECK_LIST_CONTENT", {id: id, data: checklistData});
                    });
                }
            }
            self.sendSocketNotification("LIST_CONTENT", {id: id, data: data});
        });
    },
});
