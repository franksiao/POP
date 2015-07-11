var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _constraints = [];

var ConstraintStore = assign({}, EventEmitter.prototype, {
	getConstraints: function() {
		return _constraints;
	},
	getConstraintsById: function() {
		var formatted = {};
		_constraints.forEach(function(constraint) {
			formatted[constraint.id] = constraint;
		});
		return formatted;
	},
	getDefaultConstraint: function() {
		return {
			name: null,
			target_return: null,
			target_tvar_threshold: null,
			total_size: null,
			contract_constraint: [],
			geography_constraint: []
		};
	},
	addChangeListener: function(callback, type) {
		this.addListener(type || Constants.ALL, callback);
	},
	removeChangeListener: function(callback, type) {
		this.removeListener(type || Constants.ALL, callback);
	}
});

ConstraintStore.dispatchToken = Dispatcher.register(function(message) {
	switch (message.type) {
		case Constants.UPDATE_CONSTRAINTS:
			_constraints = message.value;
			ConstraintStore.emit(Constants.UPDATE_CONSTRAINTS, _constraints);
			break;
		default:
	}
	ConstraintStore.emit(Constants.ALL);
	return true;
});

module.exports = ConstraintStore;