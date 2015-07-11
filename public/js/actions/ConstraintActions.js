var $ = window.jQuery;
var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var PortfolioStore = require('../stores/PortfolioStore');

PortfolioStore.addChangeListener(fetchConstraints, Constants.UPDATE_CURRENT_PORTFOLIO_ID);

var _constraintsByPortfioIds = {};
function removeConstraints(constraintIds) {
	var portfolioId = PortfolioStore.getCurrentPortfolioId();
	$.ajax({
		url: 'constraint',
		type: 'DELETE',
		data: {id: constraintIds, portfolio_id: portfolioId}
	}).done(function() {
		fetchConstraints(true);
	}).fail(console.error);
}

function updateConstraint(constraintId, constraint) {
	var portfolioId = PortfolioStore.getCurrentPortfolioId();
	constraint.portfolio_id = portfolioId;
	constraint.id = constraintId;
	$.ajax({
		url: 'constraint',
		type: 'PUT',
		data: constraint
	}).done(function(response) {
		console.log('PUT Constraint:', response);
		fetchConstraints(true);
	}).fail(console.error);
}

function createConstraint(constraint) {
	var portfolioId = PortfolioStore.getCurrentPortfolioId();
	constraint.portfolio_id = portfolioId;
	$.ajax({
		url: 'constraint',
		type: 'POST',
		data: constraint
	}).done(function(response) {
		fetchConstraints(true);
	}).fail(console.error);
}

function fetchConstraints(refetch) {
	var portfolioId = PortfolioStore.getCurrentPortfolioId();
	if (!refetch && _constraintsByPortfioIds[portfolioId]) {
		Dispatcher.dispatch({
			type: Constants.UPDATE_CONSTRAINTS,
			value: _constraintsByPortfioIds[portfolioId]
		});
	}
	$.ajax({
		url: 'constraint',
		type: 'GET',
		data: {portfolio_id: portfolioId}
	}).done(function(response) {
		_constraintsByPortfioIds[portfolioId] = response.data;
		Dispatcher.dispatch({
			type: Constants.UPDATE_CONSTRAINTS,
			value: response.data
		});
	}).fail(console.error);
}

module.exports = {
	create: createConstraint,
	update: updateConstraint,
	fetch: fetchConstraints,
	remove: removeConstraints
};
