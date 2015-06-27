/*var React = require('react');
var Bootstrap = require('react-bootstrap');
var Navbar = Bootstrap.Navbar;
var PortfolioDropdownComponent = require('../components/PortfolioDropdown');
var NewPortfolioTrigger = require('../components/NewPortfolioTrigger');


var NavBarComponent = React.createClass({
	onNewPortfolioDialog: function() {

	},
	render: function() {
		return (
			<Navbar brand='TEST'>
				<form className="navbar-form navbar-left">
					<PortfolioDropdownComponent/>
					<NewPortfolioTrigger />
				</form>
			</Navbar>
		);
	}
});
module.exports = NavBarComponent;*/

var React = require('react');
var Bootstrap = require('react-bootstrap');
var Navbar = Bootstrap.Navbar;
var PortfolioDropdownComponent = require('../components/PortfolioDropdown');
var NewPortfolioTrigger = require('../components/NewPortfolioTrigger');

var DialogActions = require('../actions/DialogActions');

var NavBarComponent = React.createClass({
	onNewPortfolioButtonClicked: function() {
		DialogActions.open('new_portfolio');
	},
	onLogoutClicked: function() {
		window.location.pathname = '/signout';
	},
	render: function() {
		return (
			<nav className="navbar navbar-inverse navbar-fixed-top">
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
								onClick={this.onNewPortfolioButtonClicked}>
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
			  	</div>
			  </nav>
		);
	}
});
module.exports = NavBarComponent;