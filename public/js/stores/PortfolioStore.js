var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _portfolios = [];

var _currentPortfolioId = null;

var PortfolioStore = assign({}, EventEmitter.prototype, {
	getPortfolios: function() {
		return _portfolios;
	},
	getPortfolioMap: function() {
		var formatted = {};
		_portfolios.forEach(function(portfolio) {
			formatted[portfolio.id] = portfolio;
		});
		return formatted;
	},
	getCurrentPortfolioId: function() {
		return _currentPortfolioId;
	},
	setCurrentPortfolioId: function(id) {
		_currentPortfolioId = id;
	},
	addChangeListener: function(callback, type) {
		this.addListener(type || Constants.ALL, callback);
	},
	removeChangeListener: function(callback, type) {
		this.removeListener(type || Constants.ALL, callback);
	}
});

PortfolioStore.dispatchToken = Dispatcher.register(function(message) {
	switch(message.type) {
		case Constants.UPDATE_PORTFOLIOS:
			_portfolios = message.value;
			var map = PortfolioStore.getPortfolioMap();
			//we want to update the current portfolio id if
			//during initial load and the current id hasnt been set yet or
			//if the current id has been deleted which is the second condition here
			if ((!_currentPortfolioId && _portfolios.length > 0) ||
				(_currentPortfolioId && !map[_currentPortfolioId] && _portfolios.length)) {
				_currentPortfolioId = _portfolios[0].id;
				PortfolioStore.emit(Constants.UPDATE_CURRENT_PORTFOLIO_ID, _currentPortfolioId);
			}
			PortfolioStore.emit(Constants.UPDATE_PORTFOLIOS, _portfolios);
			break;
		case Constants.UPDATE_CURRENT_PORTFOLIO_ID:
			if (_currentPortfolioId !== message.value) {
				_currentPortfolioId = message.value;
				PortfolioStore.emit(Constants.UPDATE_CURRENT_PORTFOLIO_ID, _currentPortfolioId);
			}
			break;
		default:
	}
	PortfolioStore.emit(Constants.ALL);
	return true;
});

module.exports = PortfolioStore;