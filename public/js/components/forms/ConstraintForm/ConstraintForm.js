var React = require('react/addons');
var ContractConstraintAdder = require('./ContractConstraintAdder');
var GeographyConstraintAdder = require('./GeographyConstraintAdder');
var ContractConstraintGroups = require('./ContractConstraintGroups');
var GeographyConstraintGroups = require('./GeographyConstraintGroups');
var CheckBoxOption = require('./CheckBoxOption');

function findMatchingGroup(constraint, groups) {
	for (var i = 0; i < groups.length; ++i) {
		if (groups[i].max_investment === constraint.max_investment &&
			groups[i].min_investment === constraint.min_investment) {
			return i;
		}
	}
	return -1;
}

function getStateFromData(data) {
	var contract_mapping = {};
	var geo_mapping = {};
	var contract_groups = [];
	var geography_groups = [];

	data.contracts.forEach(function(contract) {
		contract_mapping[contract.id] = {
			name: contract.name,
			used: false
		};
	});
	data.constraint.contract_constraint.forEach(function(constraint) {
		if (contract_mapping[constraint.contract_id]) {
			contract_mapping[constraint.contract_id].used = true;
		}
	});
	data.geographies.forEach(function(geo) {
		geo_mapping[geo] = {
			used: false
		}
	});
	data.constraint.geography_constraint.forEach(function(geo) {
		if (geo_mapping[geo.geography]) {
			geo_mapping[geo.geography].used = true;
		}
	});


	data.constraint.contract_constraint.forEach(function(constraint) {
		var matchingIndex = findMatchingGroup(constraint, contract_groups);
		if (matchingIndex === -1) {
			contract_groups.push({
				contract_ids: [constraint.contract_id],
				contract_names: [contract_mapping[constraint.contract_id].name],
				max_investment: constraint.max_investment,
				min_investment: constraint.min_investment
			});
		} else {
			contract_groups[matchingIndex].contract_ids.push(constraint.contract_id);
			contract_groups[matchingIndex].contract_names.push(contract_mapping[constraint.contract_id].name);
		}
	});

	data.constraint.geography_constraint.forEach(function(constraint) {
		var matchingIndex = findMatchingGroup(constraint, geography_groups);
		if (matchingIndex === -1) {
			geography_groups.push({
				geos: [constraint.geography],
				max_investment: constraint.max_investment,
				min_investment: constraint.min_investment
			});
		} else {
			geography_groups[matchingIndex].geos.push(constraint.geography);
		}
	});
	return {
		contract_mapping: contract_mapping,
		geo_mapping: geo_mapping,
		contract_groups: contract_groups,
		geography_groups: geography_groups,
		name: data.constraint.name
	};
}

var ConstraintForm = React.createClass({
	mixins: [React.addons.LinkedStateMixin],
	getInitialState: function() {
		return getStateFromData(this.props);
	},
	getData: function() {
		var total_size_state = this.refs.total_size_checkbox.state;
		var target_return_state = this.refs.target_return_checkbox.state;
		var target_tvar_threshold_state = this.refs.target_tvar_threshold_checkbox.state;
		return {
			contract_constraint: this.refs.contract_constraint_groups.getData(),
			geography_constraint: this.refs.geography_constraint_groups.getData(),
			total_size: total_size_state.isChecked ? total_size_state.value : null,
			target_return: target_return_state.isChecked ? target_return_state.value : null,
			target_tvar_threshold: target_tvar_threshold_state.isChecked ? target_tvar_threshold_state.value : null,
			name: this.state.name
		};
	},
	render: function() {
		var data = this.props;
		return (
			<div className="constraint-edit">
				<form className="form-group">
					<span><label>
						{'Constraint Set Name:'}
					</label></span>
					<input type="text"
						className="form-control constraint-name"
						ref="name"
						valueLink={this.linkState('name')} 
					/>
				</form>
				<ContractConstraintAdder
					contracts={this._getUnusedContracts()}
					onChange={this._onNewContractGroupAdded}
				/>
				<GeographyConstraintAdder 
					geographies={this._getUnusedGeographies()}
					onChange={this._onNewGeographyGroupAdded}
				/>
				<ContractConstraintGroups contract_groups={this.state.contract_groups}
					ref={'contract_constraint_groups'}
					onChange={this._handleRemovedContractConstraints}/>
				<GeographyConstraintGroups geography_groups={this.state.geography_groups}
					ref={'geography_constraint_groups'}
					onChange={this._handleRemovedGeoConstraints} />
				<div className="form-group">
					<label className="control-label">Set constraints for Portfolio:
						<span className="group-names"> {data.portfolio.name}</span>
					</label>
					<CheckBoxOption
						ref={'target_return_checkbox'}
						value={data.constraint.target_return}
						label={'Target Return'}
					/>
					<CheckBoxOption
						ref={'target_tvar_threshold_checkbox'}
						value={data.constraint.target_tvar_threshold}
						label={'Target tVar Threshold'}
					/>
					<CheckBoxOption
						ref={'total_size_checkbox'}
						value={data.constraint.total_size}
						label={'Total Size'}
					/>
				</div>
			</div>
		);
	},
	_getUnusedGeographies: function() {
		var geo_mapping = this.state.geo_mapping;
		return this.props.geographies.filter(function(geo) {
			return (geo_mapping.hasOwnProperty(geo) && 
				geo_mapping[geo].used === false);
		});
	},
	_getUnusedContracts: function() {
		var contract_mapping = this.state.contract_mapping;
		return this.props.contracts.filter(function(contract) {
			return (contract_mapping.hasOwnProperty(contract.id) && 
				contract_mapping[contract.id].used === false);
		});
	},
	_onNewContractGroupAdded: function(contractGroupIds) {
		console.log(contractGroupIds);
		var contract_mapping = this.state.contract_mapping;
		var contract_groups = this.state.contract_groups;
		contractGroupIds.forEach(function(id) {
			contract_mapping[id].used = true;
		});
		var contract_names = contractGroupIds.map(function(id) {
			return contract_mapping[id].name;
		});
		contract_groups.push({
			contract_ids: contractGroupIds,
			contract_names: contract_names,
			max_investment: null,
			min_investment: null
		});
		this.setState({
			contract_mapping: contract_mapping,
			contract_groups: contract_groups
		});
	},
	_onNewGeographyGroupAdded: function(geoGroupNames) {
		console.log(geoGroupNames);
		var geo_mapping = this.state.geo_mapping;
		var geography_groups = this.state.geography_groups;
		geoGroupNames.forEach(function(name) {
			geo_mapping[name].used = true;
		});
		geography_groups.push({
			geos: geoGroupNames,
			max_investment: null,
			min_investment: null
		});
		this.setState({
			geo_mapping: geo_mapping,
			geography_groups: geography_groups
		});
	},
	_handleRemovedContractConstraints: function(groupIndex) {
		console.log(removedContracts);
		var contract_mapping = this.state.contract_mapping;
		var contract_groups = this.state.contract_groups;
		var removedContracts = contract_groups[groupIndex].contract_ids;
		
		removedContracts.forEach(function(contract_id) {
			contract_mapping[contract_id].used = false;
		});

		contract_groups.splice(groupIndex, 1);
		this.setState({
			contract_groups: contract_groups,
			contract_mapping: contract_mapping
		});
	},
	_handleRemovedGeoConstraints: function(groupIndex) {
		var geo_mapping = this.state.geo_mapping;
		var geography_groups = this.state.geography_groups;
		var removedContracts = geography_groups[groupIndex].geos;
		
		removedContracts.forEach(function(geo_id) {
			geo_mapping[geo_id].used = false;
		});

		geography_groups.splice(groupIndex, 1);
		this.setState({
			geography_groups: geography_groups,
			geo_mapping: geo_mapping
		});
	},
});

module.exports = ConstraintForm;