var React = require('react');
var $ = window.jQuery;
var Bootstrap = require('react-bootstrap');
var Button = Bootstrap.Button;
var Modal = Bootstrap.Modal;

var ContractForm = require('components/forms/ContractForm/ContractForm');
var ContractActions = require('actions/ContractActions');

var ContractEditDialog = React.createClass({
	save: function() {
		var contractForm = this.refs.contract_form;
		contractForm.validateForm();

		var data = contractForm.getContractData();
		var isNew = !(this.props.contractData && this.props.contractData.id);

		if (data) {
			if (isNew) {
				ContractActions.create(data);
			} else {
				data.id = this.props.contractData.id;
				ContractActions.update(data);
			}
			this.props.onClose();
		}
	},
	render: function() {
		var contract = this.props.contractData;
		var isNew = !(contract && contract.id);

		return(
			<Modal show={this.props.show} onHide={this.props.onClose}>
				<Modal.Header closeButton>
					<Modal.Title>{isNew ? 'Contract' : ('Edit ' + contract.name)}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ContractForm
						ref="contract_form"
						showUpload={isNew}
						name={contract.name ? contract.name : ''}
						returnValue={contract.return_value ? contract.return_value : 0}/>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.onClose}>Cancel</Button>
					<Button onClick={this.save}>Save</Button>
				</Modal.Footer>
			</Modal>
		);
	}
});

module.exports = ContractEditDialog;