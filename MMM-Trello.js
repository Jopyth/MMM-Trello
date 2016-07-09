/* global Module */

/* Magic Mirror
 * Module: Trello
 *
 * By Joseph Bethge
 * MIT Licensed.
 */

Module.register("MMM-Trello", {

	// Default module config.
	defaults: {
		reloadInterval: 5 * 60 * 1000, // every 10 minutes
		updateInterval: 10 * 1000, // every 10 seconds
		animationSpeed: 2.5 * 1000, // 2.5 seconds
		showTitle: true,
		api_key: "",
		token: "",
		list: ""
	},

	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);

		this.listContent = [];
		this.activeItem = 0;

		this.loaded = false;
		this.error = false;
		this.errorMessage = "";
		this.retry = true;

		this.setTrelloConfig();

		this.requestUpdate();
		this.scheduleUpdateRequestInterval();
	},

	/* scheduleVisualUpdateInterval()
	 * Schedule visual update.
	 */
	scheduleVisualUpdateInterval: function() {
		var self = this;

		self.updateDom(self.config.animationSpeed);

		setInterval(function() {
			self.activeItem++;
			self.updateDom(self.config.animationSpeed);
		}, this.config.updateInterval);
	},

	/* scheduleUpdateRequestInterval()
	 * Schedule visual update.
	 */
	scheduleUpdateRequestInterval: function() {
		var self = this;

		setInterval(function() {
			if (self.retry)
			{
				self.requestUpdate();
			}
		}, this.config.reloadInterval);
	},

	// Override required translations.
	getTranslations: function() {
		return {
			en: "translations/en.json",
			de: "translations/de.json"
		};
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");

		if (this.activeItem >= this.listContent.length) {
			this.activeItem = 0;
		}

		if (this.loaded) {
			if (this.listContent.length == 0) {
				wrapper.innerHTML = this.translate("NO_CARDS");
				wrapper.className = "small dimmed";
			}
			else
			{
				if (this.config.showTitle) {
					var name = document.createElement("div");
					name.className = "bright medium light";
					name.innerHTML = this.listContent[this.activeItem].name;
					wrapper.appendChild(name);
				}
				var desc = document.createElement("div");
				desc.className = "small light";
				desc.innerHTML = this.listContent[this.activeItem].desc;
				wrapper.appendChild(desc);
			}
		} else {
			if (this.error)
			{
				wrapper.innerHTML = "Please check your config file, an error occured: " + this.errorMessage;
				wrapper.className = "xsmall dimmed";
			}
			else
			{
				wrapper.innerHTML = this.translate("LOADING");
				wrapper.className = "small dimmed";
			}
		}

		return wrapper;
	},

	/* setTrelloConfig()
	 * intializes trello backend
	 */
	setTrelloConfig: function() {
		this.sendSocketNotification("TRELLO_CONFIG", { api_key: this.config.api_key, token: this.config.token });
	},

	/* requestUpdate()
	 * request a list content update
	 */
	requestUpdate: function() {
		this.sendSocketNotification("REQUEST_LIST_CONTENT", { list: this.config.list });
	},

	// Override socket notification handler.
	socketNotificationReceived: function(notification, payload) {
		if (notification === "TRELLO_ERROR") {
			this.errorMessage = "Error " + payload.statusCode + "(" + payload.statusMessage + "): " + payload.responseBody;
			Log.error(this.errorMessage);

			if (payload.statusCode == 401 || payload.statusCode == 400) {
				this.error = true;
				this.retry = false;
				this.updateDom(self.config.animationSpeed);
			}
		}
		if (notification === "LIST_CONTENT") {
			this.error = false;

			this.listContent = payload;

			if (!this.loaded) {
				this.scheduleVisualUpdateInterval();
				this.loaded = true;
			}
		}
	},
});
