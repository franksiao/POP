/*
var React = require('react');
var NavbarComponent = require('../components/Navbar');
var SidebarComponent = require('../components/Sidebar');
var MainContentComponent = require('../components/MainContent');
//actions
var PortfolioActions = require('../actions/PortfolioActions');
PortfolioActions.getPortfolios();

var HomepageComponent = React.createClass({
	render: function() {
		return (
			<div id="HomepageComponent">
				<NavbarComponent />
				<section className="page">
					<SidebarComponent />
					<MainContentComponent />
				</section>
			</div>
		);
	}
});
React.render(
	<HomepageComponent />,
	document.body
);
*/

var React = require('react');
var $ = require('jquery');
window.jQuery = $;
var bootstrap = require('bootstrap');
var _ = require('underscore');
var NavbarComponent = require('../components/Navbar');

//actions
var PortfolioActions = require('../actions/PortfolioActions');
PortfolioActions.getPortfolios();


React.render(
	<NavbarComponent />,
	document.getElementById('PortfolioOptimization')
);