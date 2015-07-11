var React = require('react');
var Navbar = require('react-bootstrap').Navbar;
var Button = require('react-bootstrap').Button;

var PortfolioDropdownComponent = require('components/PortfolioDropdown');
var NewPortfolioDialog = require('components/dialogs/NewPortfolioDialog');
var PortfolioDeleteConfirmation = require('components/dialogs/PortfolioDeleteConfirmation');

var NavBarComponent = React.createClass({
	getInitialState: function() {
		return {
			showNewDialog: false,
			showDeleteConfirmation: false
		};
	},
	_openNewDialog: function() {
		this.setState({
			showNewDialog: true
		});
	},
	_closeNewDialog: function() {
		this.setState({
			showNewDialog: false
		});
	},
	_openDeleteConfirmation: function() {
		this.setState({
			showDeleteConfirmation: true
		});
	},
	_closeDeleteConfirmation: function() {
		this.setState({
			showDeleteConfirmation: false
		});
	},
	onLogoutClicked: function() {
		window.location.pathname = '/signout';
	},
	render: function() {
		return (
			<div className="container-fluid">
				<div className="navbar-header">
					<button
						type="button"
						className="navbar-toggle collapsed"
						data-toggle="collapse"
						data-target="#bam-bam-collapsable">
						<span className="sr-only">Toggle navigation</span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					</button>
					<a className="navbar-brand" href="#">Portfolio Optimization</a>
				</div>
				<div className="collapse navbar-collapse" id="bam-bam-collapsable">
	  				<form className="navbar-form navbar-left" role="search">
	  					<div className="form-group" id="portfolio-select-container">
	  						<PortfolioDropdownComponent/>
	  					</div>
						<Button
							bsStyle='primary'
							id='create-portfolio'
							onClick={this._openNewDialog}>
							<i className="glyphicon glyphicon-plus"></i>
						</Button>
						<Button
							bsStyle='danger'
							id='delete-portfolio'
							onClick={this._openDeleteConfirmation}>
							<i className="glyphicon glyphicon-remove"></i>
						</Button>
					</form>
					<form className="navbar-form navbar-right">
						<div className="logout-button" onClick={this.onLogoutClicked}>
							<i className="glyphicon glyphicon-log-out"></i>
							Logout
						</div>
					</form>
				</div>
				<NewPortfolioDialog
					show={this.state.showNewDialog}
					onClose={this._closeNewDialog} />
				<PortfolioDeleteConfirmation
					show={this.state.showDeleteConfirmation}
					onClose={this._closeDeleteConfirmation} />
			</div>
		);
	}
});
module.exports = NavBarComponent;