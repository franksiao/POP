var $ = window.jQuery;
var _ = require('underscore');
var RSVP = require('rsvp');


function getGeographiesByPortfolio(portfolioId) {
	return (new RSVP.Promise(function(resolve, reject) {
		$.ajax({
			url: 'geography',
			type: 'GET',
			data: {portfolio_id: portfolioId}
		}).done(function(response) {
			resolve(_.pluck(response.data, 'geography'));
		}).fail(function(err) {
			reject(err);
		});
	}));
}

module.exports {
	getGeographiesByPortfolio: getGeographiesByPortfolio
};
