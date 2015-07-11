var React = require('react');
var $ = window.jQuery;
var Bootstrap = require('react-bootstrap');
var Button = Bootstrap.Button;
var Modal = Bootstrap.Modal;

var ConstraintForm = require('components/forms/ConstraintForm/ConstraintForm');
var ConstraintActions = require('actions/ConstraintActions');
var ConstraintStore = require('stores/ConstraintStore');
var PortfolioStore = require('stores/PortfolioStore');
var ContractStore = require('stores/ContractStore');
var GeographyStore = require('stores/GeographyStore');

var ConstraintEditDialog = React.createClass({
	save: function() {
		var constraintForm = this.refs.constraint_form;

		var data = constraintForm.getData();
		var isNew = !(this.props.constraintData && this.props.constraintData.id);

		if (data) {
			if (isNew) {
				ConstraintActions.create(data);
			} else {
				ConstraintActions.update(this.props.constraintData.id, data);
			}
			this.props.onClose();
		}
	},
	render: function() {
		var isNew = !(this.props.constraintData && this.props.constraintData.id);
		var contracts = ContractStore.getContracts();
		var geographies = GeographyStore.getGeographies();
		var constraint = isNew ? ConstraintStore.getDefaultConstraint() : this.props.constraintData;
		var portfolioMap = PortfolioStore.getPortfolioMap();
		var portfolioId = PortfolioStore.getCurrentPortfolioId();
		var portfolio = portfolioMap[portfolioId];

		return(
			<Modal show={this.props.show} onHide={this.props.onClose}>
				<Modal.Header closeButton>
					<Modal.Title>{isNew ? 'Constraint' : ('Edit ' + constraint.name)}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ConstraintForm
						ref="constraint_form"
						portfolio={portfolio}
						contracts={contracts}
						geographies={geographies}
						constraint={constraint} />
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.onClose}>Cancel</Button>
					<Button onClick={this.save}>Save</Button>
				</Modal.Footer>
			</Modal>
		);
	}
});

module.exports = ConstraintEditDialog;