var React = require('react');
var $ = window.jQuery;

var Button = require('react-bootstrap').Button;
var ConstraintStore = require('stores/ConstraintStore');
var ConstraintActions = require('actions/ConstraintActions');
var GeographyActions = require('actions/GeographyActions');


var ConstraintEditDialog = require('components/dialogs/ConstraintEditDialog');
// var ConstraintDeleteConfirmation = require('../components/ConstraintDeleteConfirmation');

var ConstraintsView = React.createClass({
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
		ConstraintStore.removeChangeHandler(this._onDataChange);
	},
	componentDidMount: function() {
		var $table = $(this.refs.table.getDOMNode());
		$table.bootstrapTable({
			height: 460,
			search: true,
			pagination: false,
			toolbar: '#constraint-button-toolbar',
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
					field: 'target_return',
					title: 'Target Return',
					sortable: true
				},
				{
					field: 'target_tvar_threshold',
					title: 'Target tVar Threshold',
					sortable: true
				},
				{
					field: 'total_size',
					title: 'Size',
					sortable: true
				},
				{
					title: '',
					formatter: this._formatEditButton,
					events: {
						'click .edit-constraint': this._openEditDialog
					}
				}
			]
		});

		$table.on('check.bs.table uncheck.bs.table ' +
			'check-all.bs.table uncheck-all.bs.table', this._countCheckbox);

		ConstraintStore.addChangeListener(this._onDataChange);
	},
	render: function() {
		return (
			<div id="ConstraintsView">
				<h3>Constraints</h3>
				<div id="constraint-button-toolbar" className="button-toolbar">
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
				<div id="ConstraintsTable" className="container">
					<table ref="table" />
				</div>
				<ConstraintEditDialog
					show={this.state.showEditDialog}
					constraintData={this.state.editData}
					onClose={this._closeEditDialog} />
			</div>
		);
	},
	_openNewDialog: function() {
		this.setState({
			showEditDialog: true,
			editData: {}
		});
	},
	_openEditDialog: function(e, value, constraint) {
		this.setState({
			showEditDialog: true,
			editData: constraint
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
		return '<button type="button" class="btn btn-primary btn-xs edit-constraint">Edit</button>';
	},
	_onDataChange: function() {
		$(this.refs.table.getDOMNode()).bootstrapTable('load', ConstraintStore.getConstraints());
	},
	_countCheckbox: function() {
		this.setState({
			remove_disabled: ($(this.refs.table.getDOMNode()).bootstrapTable('getSelections').length === 0)
		});
	}
});

module.exports = ConstraintsView;