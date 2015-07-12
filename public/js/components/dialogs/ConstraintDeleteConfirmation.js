var React = require('react');
var $ = window.jQuery;
var _ = require('underscore');
var Bootstrap = require('react-bootstrap');
var Button = Bootstrap.Button;
var Modal = Bootstrap.Modal;
var ConstraintActions = require('actions/ConstraintActions');

var ConstraintDeleteConfirmation = React.createClass({
	delete: function() {
		ConstraintActions.remove(_.pluck(this.props.constraintData, 'id'));
		this.props.onClose();
	},
	render: function() {
		return(
			<Modal show={this.props.show} onHide={this.props.onClose}>
				<Modal.Header closeButton>
					<Modal.Title>Are you sure you want to delete the following constraint(s)?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>{_.pluck(this.props.constraintData, 'name').join(' ,')}</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.onClose}>Cancel</Button>
					<Button bsStyle='danger' onClick={this.delete}>Delete</Button>
				</Modal.Footer>
			</Modal>
		);
	}
});

module.exports = ConstraintDeleteConfirmation;
