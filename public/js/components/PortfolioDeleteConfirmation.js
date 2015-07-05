var React = require('react');
var $ = window.jQuery;
var _ = require('underscore');
var Bootstrap = require('react-bootstrap');
var Button = Bootstrap.Button;
var Modal = Bootstrap.Modal;
var PortfolioActions = require('../actions/PortfolioActions');
var PortfolioStore = require('../stores/PortfolioStore');

var PortfolioDeleteConfirmation = React.createClass({
	delete: function() {
		var currentPortfolioId = PortfolioStore.getCurrentPortfolioId();
		PortfolioActions.remove(currentPortfolioId);
		this.props.onClose();
	},
	render: function() {
		var currentPortfolioId = PortfolioStore.getCurrentPortfolioId();
		var portfolioMap = PortfolioStore.getPortfolioMap();
		var name = '';
		var show = false;
		if (currentPortfolioId && portfolioMap && portfolioMap[currentPortfolioId]) {
			name = portfolioMap[currentPortfolioId].name;
			show = this.props.show;
		}

		return(
			<Modal show={show} onHide={this.props.onClose}>
				<Modal.Header closeButton>
					Delete Portfolio
				</Modal.Header>
				<Modal.Body>
					<div>
					Are you sure you want to delete {name}? Any associated contracts and constraints will also be removed.
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.onClose}>Cancel</Button>
					<Button bsStyle='danger' onClick={this.delete}>Delete</Button>
				</Modal.Footer>
			</Modal>
		);
	}
});

module.exports = PortfolioDeleteConfirmation;
