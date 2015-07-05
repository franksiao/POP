var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _contracts = [];
function _formatContracts(data) {
	var formattedContracts = {};
	data.forEach(function(contract) {
		formattedContracts[contract.id] = contract;
	});
	return formattedContracts;
}

var ContractStore = assign({}, EventEmitter.prototype, {
	getContracts: function() {
		return _contracts;
	},
	getContractsByPortfolio: function() {
		return _formatContracts(_contracts);
	},
	addChangeListener: function(callback, type) {
		this.addListener(type || Constants.ALL, callback);
	},
	removeChangeListener: function(callback, type) {
		this.removeListener(type || Constants.ALL, callback);
	}
});

ContractStore.dispatchToken = Dispatcher.register(function(message) {
	switch (message.type) {
		case Constants.UPDATE_CONTRACTS:
			_contracts = message.value;
			ContractStore.emit(Constants.UPDATE_CONTRACTS, _contracts);
			break;
		default:
	}
	ContractStore.emit(Constants.ALL);
	return true;
});

module.exports = ContractStore;