var React = require('react');
var $ = window.jQuery;

var Button = require('react-bootstrap').Button;
var ContractStore = require('../stores/ContractStore');
var ContractEditDialog = require('../components/ContractEditDialog');

var ContractsView = React.createClass({
	getInitialState: function() {
		return {
			contracts: [],
			remove_disabled: true,
			contractEditData: {},
			showContractEditDialog: false
		};
	},
	componentWillUnmount: function() {
		var $table = $(this.refs.table.getDOMNode());
		$table.off('check.bs.table uncheck.bs.table ' +
			'check-all.bs.table uncheck-all.bs.table', this._countCheckbox.bind(this));
		$table.bootstrapTable('destroy');
		ContractStore.removeChangeHandler(this._onChange);
	},
	componentDidMount: function() {
		var $table = $(this.refs.table.getDOMNode());
		$table.bootstrapTable({
			height: 460,
			search: true,
			pagination: false,
			toolbar: '#contract-button-toolbar',
			columns: [
				{
					field: 'checked',
					checkbox: true
				},
				{
					field: 'name',
					title: 'Name',
					sortable: true
				},
				{
					field: 'return_value',
					title: 'Return',
					sortable: true
				},
				{
					title: '',
					formatter: this._formatEditButton,
					events: {
						'click .edit-contract': this._openEditDialog
					}
				}
			]
		});

		$table.on('check.bs.table uncheck.bs.table ' +
			'check-all.bs.table uncheck-all.bs.table', this._countCheckbox);

		ContractStore.addChangeListener(this._onChange);
	},
	componentDidUpdate: function() {
		$(this.refs.table.getDOMNode()).bootstrapTable('load', this.state.contracts);
	},
	render: function() {
		return (
			<div id="ContractsView">
				<h3>Contracts</h3>
				<div id="contract-button-toolbar" className="button-toolbar">
					<Button
						bsStyle='primary'
						bsSize='small'
						onClick={this._openNewDialog}>
						<i className="glyphicon glyphicon-plus"></i> New
					</Button>
					<Button
						bsStyle='danger'
						bsSize='small'
						onClick={this._openDeleteDialog}
						disabled={this.state.remove_disabled}>
						<i className="glyphicon glyphicon-remove"></i> Remove
					</Button>
				</div>
				<div id="ContractsTable" className="container">
					<table ref="table" />
				</div>
				<ContractEditDialog
					show={this.state.showContractEditDialog}
					contractData={this.state.contractEditData}
					onClose={this._closeDialog} />
			</div>
		);
	},
	_openNewDialog: function(e, value, contract) {
		this.setState({
			showContractEditDialog: true,
			contractEditData: {}
		});
	},
	_openEditDialog: function(e, value, contract) {
		this.setState({
			showContractEditDialog: true,
			contractEditData: contract
		});
	},
	_closeDialog: function() {
		this.setState({
			showContractEditDialog: false,
			contractEditData: {}
		});
	},
	_formatEditButton: function() {
		return '<button type="button" class="btn btn-primary btn-xs edit-contract">Edit</button>';
	},
	_onChange: function(type) {
		this.setState({
			contracts: ContractStore.getContracts()
		});
	},
	_countCheckbox: function() {
		var disabled = ($(this.refs.table.getDOMNode()).bootstrapTable('getSelections').length === 0);
		this.setState({
			remove_disabled: disabled
		});
	}
});

module.exports = ContractsView;