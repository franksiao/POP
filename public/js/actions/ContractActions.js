var $ = window.jQuery;
var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var PortfolioStore = require('../stores/PortfolioStore');

//external dependency
PortfolioStore.addChangeListener(fetchContracts, Constants.UPDATE_CURRENT_PORTFOLIO_ID);

function updateContract(contract) {
	contract.portfolio_id = PortfolioStore.getCurrentPortfolioId();
	$.ajax({
		url: 'contract',
		type: 'PUT',
		data: contract
	}).done(function() {
		fetchContracts(true);
	}).fail(console.error);
}
function removeContract(contractIds) {
	var portfolioId = PortfolioStore.getCurrentPortfolioId();
	$.ajax({
		url: 'contract',
		type: 'DELETE',
		data: {id: contractIds, portfolio_id: portfolioId}
	}).done(function() {
		fetchContracts(true);
	}).fail(console.error);
}

function createContract(contract) {
	contract.portfolio_id = PortfolioStore.getCurrentPortfolioId();
	$.ajax({
		url: 'contract',
		type: 'POST',
		data: contract
	}).done(function() {
		fetchContracts(true);
	}).fail(console.error);
}

var _contractsByPortfolioIds = {};
function fetchContracts(refetch) {
	var portfolioId = PortfolioStore.getCurrentPortfolioId();
	if (!refetch && _contractsByPortfolioIds[portfolioId]) {
		Dispatcher.dispatch({
			type: Constants.UPDATE_CONTRACTS,
			value: _contractsByPortfolioIds[portfolioId]
		});
	}
	$.ajax({
		url: 'contract',
		type: 'GET',
		data: {portfolio_id: portfolioId}
	}).done(function(response) {
		_contractsByPortfolioIds[portfolioId] = response.data;
		Dispatcher.dispatch({
			type: Constants.UPDATE_CONTRACTS,
			value: response.data
		});
	}).fail(console.error);
}

module.exports = {
	fetch: fetchContracts,
	remove: removeContract,
	create: createContract,
	update: updateContract
};
