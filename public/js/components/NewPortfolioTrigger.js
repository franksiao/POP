var React = require('react');
var Bootstrap = require('react-bootstrap');
var Button = Bootstrap.Button;
var Modal = Bootstrap.Modal;
var OverlayMixin = Bootstrap.OverlayMixin;

var NewPortfolioTrigger = React.createClass({
	mixins: [OverlayMixin],
	getInitialState: function() {
		return {
			isModalOpen: false
		};
	},
	launchDialog: function() {
		this.setState({
			isModalOpen: true
		});
	},
	closeDialog: function() {
		this.setState({
			isModalOpen: false
		});
	},
	render: function() {
		return (
			<Button 
				bsStyle="primary"
				onClick={this.launchDialog} >
				<span
					className="glyphicon glyphicon-plus"
					aria-hidden="true"
				/>
			</Button>
		);
	},
	renderOverlay: function() {
		if (!this.state.isModalOpen) {
			return <span/>;
		}
		return(
			<Modal title='Portfolio Name' backdrop={true} onRequestHide={this.closeDialog}>
				<div className='modal-body'>
					<div className="form-group">
						<label for="new-portfolio-name">Portfolio Name</label>
						<input type="text" class="form-control" name="portfolio-name" id="new-portfolio-name" />
					</div>
				</div>
				<div className='modal-footer'>
					<Button onClick={this.closeDialog}>Close</Button>
					<Button bsStyle='primary'>Save</Button>
				</div>
			</Modal>
		);
	}
});
module.exports = NewPortfolioTrigger;