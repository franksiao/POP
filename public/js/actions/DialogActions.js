var $ = window.jQuery;
var BootstrapDialog = require('../lib/bootstrap-dialog');
var PortfolioModel = require('../models/PortfolioModel');
var PortfolioStore = require('../stores/PortfolioStore');
var PortfolioActions = require('../actions/PortfolioActions');

var DialogActions = {
	open: function() {
		BootstrapDialog.confirm({
			title: 'Set Portfolio Name',
			message: function(dialog) {
				return $('<input type="text" class="form-control" id="new-portfolio-name" placeholder="New Portfolio Name">');
			},
			btnOKLabel: 'Create',
			callback: function(confirmed) {
				if (confirmed) {
					var name = $('#new-portfolio-name').val();
					if (name && name.length > 0) {
						PortfolioModel.postPortfolio(name).then(function(portfolioId) {
							PortfolioStore.setCurrentPortfolioId(portfolioId);
							PortfolioActions.getPortfolios();
							_currentPortfolioId = portfolioId;
						});
					} else {
						//TODO: validation
					}
				}
			}
		});
	}
};

module.exports = DialogActions;
