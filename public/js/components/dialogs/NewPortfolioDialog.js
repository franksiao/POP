var React = require('react');
var $ = window.jQuery;
var Bootstrap = require('react-bootstrap');
var Button = Bootstrap.Button;
var Modal = Bootstrap.Modal;

var PortfolioActions = require('actions/PortfolioActions');

var NewPortfolioDialog = React.createClass({
	getInitialState: function() {
		return {
			name_error: ''
		};
	},
	save: function() {
		var name = this.refs.portfolio_name.getDOMNode().value;
		if (name) {
			PortfolioActions.create(name);
			this.props.onClose();
		} else {
			this.setState({
				name_error: 'Invalid name'
			});
		}
	},
	render: function() {
		return(
			<Modal show={this.props.show} onHide={this.props.onClose}>
				<Modal.Header closeButton>
					<Modal.Title>Portfolio</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="form-group">
						<label for="new-portfolio-name">Portfolio Name</label>
						<input type="text" className="form-control" id="new-portfolio-name" ref="portfolio_name"/>
						<div className="help-block dialog-error"
							style={this.state.name_error ? {} : { display:'none' }}>
							{this.state.name_error}
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.onClose}>Cancel</Button>
					<Button onClick={this.save}>Save</Button>
				</Modal.Footer>
			</Modal>
		);
	}
});

module.exports = NewPortfolioDialog;
