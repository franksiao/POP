var $ = window.jQuery;
var _ = require('underscore');
var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var PortfolioStore = require('../stores/PortfolioStore');

PortfolioStore.addChangeListener(fetchGeography, Constants.UPDATE_CURRENT_PORTFOLIO_ID);

var _geographyByPortfolioIds = {};
function fetchGeography(refetch) {
	var portfolioId = PortfolioStore.getCurrentPortfolioId();
	if (!refetch && _geographyByPortfolioIds[portfolioId]) {
		Dispatcher.dispatch({
			type: Constants.UPDATE_GEOGRAPHY,
			value: _geographyByPortfolioIds[portfolioId]
		});
	}
	$.ajax({
		url: 'geography',
		type: 'GET',
		data: {portfolio_id: portfolioId}
	}).done(function(response) {
		Dispatcher.dispatch({
			type: Constants.UPDATE_GEOGRAPHY,
			value: _.pluck(response.data, 'geography')
		});
	}).fail(console.error);
}

module.exports = {
	fetch: fetchGeography
};
