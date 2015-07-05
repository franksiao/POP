var React = require('react');
var Bootstrap = require('react-bootstrap');
var Navbar = Bootstrap.Navbar;
var PortfolioDropdownComponent = require('../components/PortfolioDropdown');
var NewPortfolioDialog = require('../components/NewPortfolioDialog');

var NavBarComponent = React.createClass({
	getInitialState: function() {
		return {
			showNewPortfolioDialog: false
		};
	},
	_openDialog: function() {
		this.setState({
			showNewPortfolioDialog: true
		});
	},
	_closeDialog: function() {
		this.setState({
			showNewPortfolioDialog: false
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
						<button
							type="button"
							className="btn btn-primary"
							id="create-portfolio"
							onClick={this._openDialog}>
							<span className="glyphicon glyphicon-plus" aria-hidden="true" />
						</button>
					</form>
					<form className="navbar-form navbar-right">
						<div className="logout-button" onClick={this.onLogoutClicked}>
							<i className="glyphicon glyphicon-log-out"></i>
							Logout
						</div>
					</form>
				</div>
				<NewPortfolioDialog
					show={this.state.showNewPortfolioDialog}
					onClose={this._closeDialog} />
			</div>
		);
	}
});
module.exports = NavBarComponent;