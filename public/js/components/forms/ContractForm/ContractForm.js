var React = require('react/addons');
var $ = window.jQuery;

var ContractForm = React.createClass({
	mixins: [React.addons.LinkedStateMixin],
	getInitialState: function() {
		return {
			name_error: '',
			return_error: '',
			upload_error: '',
			simulation_file_name: null,
			simulation_resource_id: null,
			name: this.props.name,
			return_value: this.props.returnValue
		};
	},
	componentDidMount: function() {
		$(this.refs.file_upload_input.getDOMNode()).fileinput({
			allowedFileExtensions: ["csv"],
			showPreview: false,
			elErrorContainer: $(this.refs.file_upload_error.getDOMNode())
		});
		$(this.refs.upload_form.getDOMNode()).ajaxForm({
			beforeSubmit: function() {
				$('.loading').show();
				return true;
			},
			success: function(response, statusText) {
				$('.loading').hide();
				this.setState({
					simulation_file_name: response.data.file_name,
					simulation_resource_id: response.data.resource_id,
					upload_error: ''
				});
			}.bind(this)
		});
	},
	getContractData: function() {
		if (this._hasErrors()) {
			return false;
		}
		var contractData = {
			name: this.refs.name_input.getDOMNode().value,
			return_value: this.refs.return_input.getDOMNode().value
		};
		if (this.props.showUpload) {
			contractData.type = 'AIR'; //TODO: hardcode for now
			contractData.resource_id = this.state.simulation_resource_id;
		} else {
			contractData.id = this.props.id;
		}
		return contractData;
	},
	validateForm: function() {
		var name = this.refs.name_input.getDOMNode().value;
		var returnVal = Number(this.refs.return_input.getDOMNode().value);
		var simulationUploaded = (this.state.simulation_resource_id && this.state.simulation_file_name);
		if (!name) {
			this.setState({ name_error: 'Invalid Name' });
		}
		if (!Number.isFinite(returnVal)) {
			this.setState({ return_error: 'Invalid Return' });
		}
		if (this.props.showUpload && !simulationUploaded) {
			this.setState({ upload_error: 'A simulation file must be uploaded.'});
		}
	},
	_resetError: function(field) {
		var state = {};
		state[field] = '';
		this.setState(state);
	},
	_hasErrors: function() {
		if (this.state.name_error.length > 0) {
			return true;
		}
		if (this.state.return_error.length > 0) {
			return true;
		}
		if (this.props.showUpload) {
			if (this.state.upload_error.length > 0) {
				return true;
			}
			if (!this.state.simulation_resource_id) {
				return true;
			}
		}
		return false;
	},
	_showOrHide: function(field, show) {
		if (field) {
			return show ? {} : { display: 'none' };
		}
		return show ? { display: 'none' } : {};
	},
	render: function() {
		var cx = React.addons.classSet;
		var nameClass = cx({
			'form-group': true,
			'has-error': !!this.state.name_error
		});
		var returnClass = cx({
			'form-group': true,
			'has-error': !!this.state.return_error
		});
		var simulationUploaded = (this.state.simulation_resource_id && this.state.simulation_file_name);
		return (
			<div id="ContractEdit">
				<form ref="upload_form"
					enctype="multipart/form-data"
					action="/upload-object"
					method="post">
					<div style={this._showOrHide(this.props.showUpload, true)}>
						<div className="form-group"
							style={this._showOrHide(simulationUploaded, false)}>
							<label for="contract_file">Upload Simulation File(*.csv)</label>
							<input ref="file_upload_input" 
								type="file" 
								data-show-preview="false"
								name="contract_file" />
							<div ref="file_upload_error" className="help-block"></div>
							<div ref="no_file_upload_error" className="help-block dialog-error"
								style={this._showOrHide(!!this.state.upload_error, true)}>
								{this.state.upload_error}</div>
						</div>
						<h5 className="form-group" id="upload-success"
							style={this._showOrHide(simulationUploaded, true)}>
							<span className="file-name">{this.state.simulation_file_name}</span>
							<span className="label label-success">Uploaded Successfully</span>
						</h5>
					</div>
					<div className={nameClass}>
						<label for="new-contract-name">Contract Name</label>
						<input type="text" 
							className="form-control" 
							name="contract_name"
							id="new-contract-name"
							ref="name_input"
							onBlur={this._resetError.bind(this, 'name_error')}
							valueLink={this.linkState('name')} />
						<div className="help-block dialog-error"
							style={this._showOrHide(!!this.state.name_error, true)}>
							{this.state.name_error}
						</div>
					</div>
					<div className={returnClass}>
						<label for="new-contract-return">Return</label>
						<input type="text"
							className="form-control"
							id="new-contract-return"
							ref="return_input"
							onBlur={this._resetError.bind(this, 'return_error')}
							valueLink={this.linkState('return_value')} />
						<div className="help-block dialog-error"
							style={this._showOrHide(!!this.state.return_error, true)}>
							{this.state.return_error}
						</div>
					</div>
				</form>
			</div>
		);
	}
});
module.exports = ContractForm;