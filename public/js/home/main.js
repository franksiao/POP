var React = require('react');

//require external resources
window.jQuery = require('jquery');
require('bootstrap');
require('lib/bootstrap-table/bootstrap-table');
require('lib/bootstrap-fileinput/fileinput');
require('lib/jquery.form');

//main components
var NavbarComponent = require('components/Navbar');
var ContractsView = require('components/ContractsView');
var ConstraintsView = require('components/ConstraintsView');


//trigger inital actions
require('../actions/PortfolioActions').fetch();

React.render(
	<NavbarComponent />,
	document.getElementById('PortfolioTitleBar')
);

React.render(
	<ContractsView />,
	document.getElementById('ContractsView')
);

React.render(
	<ConstraintsView />,
	document.getElementById('ConstraintsView')
);