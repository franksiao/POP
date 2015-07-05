var React = require('react');
var $ = window.jQuery;

var Button = require('react-bootstrap').Button;
var ContractStore = require('../stores/ContractStore');
var ContractEditDialog = require('../components/ContractEditDialog');
var ContractDeleteConfirmation = require('../components/ContractDeleteConfirmation');

var ContractsView = React.createClass({
	getInitialState: function() {
		return {
			remove_disabled: true,
			editData: {},
			deleteData: [],
			showEditDialog: false,
			showDeleteConfirmation: false
		};
	},
	componentWillUnmount: function() {
		var $table = $(this.refs.table.getDOMNode());
		$table.off('check.bs.table uncheck.bs.table ' +
			'check-all.bs.table uncheck-all.bs.table', this._countCheckbox.bind(this));
		$table.bootstrapTable('destroy');
		ContractStore.removeChangeHandler(this._onDataChange);
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

		ContractStore.addChangeListener(this._onDataChange);
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
					show={this.state.showEditDialog}
					contractData={this.state.editData}
					onClose={this._closeEditDialog} />
				<ContractDeleteConfirmation
					show={this.state.showDeleteConfirmation}
					contractData={this.state.deleteData}
					onClose={this._closeDeleteConfirmation} />
			</div>
		);
	},
	_openNewDialog: function() {
		this.setState({
			showEditDialog: true,
			editData: {}
		});
	},
	_openEditDialog: function(e, value, contract) {
		this.setState({
			showEditDialog: true,
			editData: contract
		});
	},
	_openDeleteDialog: function() {
		this.setState({
			showDeleteConfirmation: true,
			deleteData: $(this.refs.table.getDOMNode()).bootstrapTable('getSelections')
		});
	},
	_closeDeleteConfirmation: function() {
		this.setState({
			showDeleteConfirmation: false,
			deleteData: []
		});
	},
	_closeEditDialog: function() {
		this.setState({
			showEditDialog: false,
			editData: {}
		});
	},
	_formatEditButton: function() {
		return '<button type="button" class="btn btn-primary btn-xs edit-contract">Edit</button>';
	},
	_onDataChange: function() {
		$(this.refs.table.getDOMNode()).bootstrapTable('load', ContractStore.getContracts());
	},
	_countCheckbox: function() {
		this.setState({
			remove_disabled: ($(this.refs.table.getDOMNode()).bootstrapTable('getSelections').length === 0)
		});
	}
});

module.exports = ContractsView;