var React = require('react');
var Select = require('react-select');

var PortfolioStore = require('../stores/PortfolioStore');
var PortfolioActions = require('../actions/PortfolioActions');

var PortfolioDropdownComponent = React.createClass({
	getInitialState: function() {
		return {
			portfolios: [],
			currentPortfolioId: null
		};
	},
	componentDidMount: function() {
		PortfolioStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		PortfolioStore.removeChangeHandler(this._onChange);
	},
	render: function() {
		var options = [];
		this.state.portfolios.forEach(function(port) {
			options.push({
				value: port.id + '',
				label: port.name
			});
		});
		return(
			<div className="portfolio-select-container">
				<Select
					name="portfolio-option"
					value={this.state.currentPortfolioId ? this.state.currentPortfolioId + '' : null}
					options={options}
					onChange={this._onCurrentPortfolioChange}
					clearable={false}
					searchable={false}
				/>
			</div>
		);
	},
	_onCurrentPortfolioChange: function(val) {
		PortfolioActions.setCurrentPortfolioId(val);
	},
	_onChange: function() {
		this.setState({
			portfolios: PortfolioStore.getPortfolios(),
			currentPortfolioId: PortfolioStore.getCurrentPortfolioId()
		});
	}
});

module.exports = PortfolioDropdownComponent;