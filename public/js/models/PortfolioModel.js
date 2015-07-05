var $ = window.jQuery;
var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var PortfolioStore = require('../stores/PortfolioStore');

function fetchPortfolios(currentPortfolioId) {
	$.ajax({
		url: 'portfolio',
		type: 'GET'
	}).done(function(response) {
		Dispatcher.dispatch({
			type: Constants.FETCH_PORTFOLIOS,
			value: response.data
		});
		if (currentPortfolioId) {
			Dispatcher.dispatch({
				type: Constants.UPDATE_CURRENT_PORTFOLIO_ID,
				value: currentPortfolioId
			});
		}
	}).fail(console.error);
}
function createPortfolio(name) {
	$.ajax({
		url: 'portfolio',
		type: 'POST',
		data: {name: name}
	}).done(function(response) {
		fetchPortfolios(response.data.id);
	}).fail(console.err);
}
function updatePortfolio(portfolio) {
	$.ajax({
		url: 'portfolio',
		type: 'PUT',
		data: portfolio
	}).done(function(response) {
		fetchPortfolios();
	}).fail(console.err);
}

function removePortfolio(id) {
	$.ajax({
		url: 'portfolio',
		type: 'DELETE',
		data: {
			id: id
		}
	}).done(function(response) {
		fetchPortfolios();
	}).fail(console.err);
}

module.exports = {
	fetch: fetchPortfolios,
	create: createPortfolio,
	update: updatePortfolio,
	remove: removePortfolio
};
