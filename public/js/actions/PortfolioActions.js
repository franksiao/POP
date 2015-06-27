var PopDispatcher = require('../dispatcher/PopDispatcher');
// var $ = require('jquery');
var $ = window.jQuery;

var PortfolioActions = {
	getPortfolios: function() {
		$.ajax({
			url: 'portfolio',
			type: 'GET'
		}).done(function(response) {
			PopDispatcher.dispatch({
				type: 'get_portfolios',
				response: response.data
			});
		}).fail(function(err) {
			PopDispatcher.dispatch({
				type: 'get_portfolios',
				response: 'failed'
			});
		});
	},
	setCurrentPortfolioId: function(id) {
		PopDispatcher.dispatch({
			type: 'set_current_portfolio_id',
			id: id
		});
	}
};

module.exports = PortfolioActions;
