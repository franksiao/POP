var React = require('react');

var SidebarComponent = React.createClass({
	render: function() {
		return (
			<div className="navbar-default sidebar" role="navigation">
				<div className="sidebar-nav navbar-collapse">
					<ul className="nav in" id="side-menu">
						<li className="active">
							<a>{"Contracts"}</a>
						</li>
						<li>
							<a>{"Constraints"}</a>
						</li>
						<li>
							<a>{"Const Name A"}</a>
						</li>
					</ul>
				</div>
			</div>
		);
	}
});

module.exports = SidebarComponent;