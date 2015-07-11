var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _geography = [];

var GeographyStore = assign({}, EventEmitter.prototype, {
	getGeographies: function() {
		return _geography;
	},
	addChangeListener: function(callback, type) {
		this.addListener(type || Constants.ALL, callback);
	},
	removeChangeListener: function(callback, type) {
		this.removeListener(type || Constants.ALL, callback);
	}
});

GeographyStore.dispatchToken = Dispatcher.register(function(message) {
	switch (message.type) {
		case Constants.UPDATE_GEOGRAPHY:
			_geography = message.value;
			GeographyStore.emit(Constants.UPDATE_GEOGRAPHY, _geography);
			break;
		default:
	}
	GeographyStore.emit(Constants.ALL);
	return true;
});

module.exports = GeographyStore;