var PopDispatcher = require('../dispatcher/PopDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _portfolios = [];
var _portfolioMap = {};
var _currentPortfolioId = null;

var PortfolioStore = assign({}, EventEmitter.prototype, {
	getPortfolios: function() {
		return _portfolios;
	},
	getPortfolioMap: function() {
		return _portfolioMap;
	},
	getCurrentPortfolioId: function() {
		return _currentPortfolioId;
	},
	setCurrentPortfolioId: function(id) {
		_currentPortfolioId = id;
	},
	addChangeListener: function(callback){
		this.addListener('change', callback);
	},
	removeChangeListener: function(callback) {
		this.removeListener('change', callback);
	},
	emitChange: function(messages){
		this.emit('change', messages);
	}
});

PortfolioStore.dispatchToken = PopDispatcher.register(function(request) {
	switch(request.type) {
		case 'get_portfolios':
			_portfolios = request.response;
			_portfolioMap = {};
			if (!_currentPortfolioId && _portfolios.length > 0) {
				_currentPortfolioId = _portfolios[0].id;
			}
			_portfolios.forEach(function(port) {
				_portfolioMap[port.id] = port;
			});
			break;
		case 'set_current_portfolio_id':
			_currentPortfolioId = request.id;
			break;
		default:
			//no op
	}
	PortfolioStore.emitChange();
	return true;
});

module.exports = PortfolioStore;