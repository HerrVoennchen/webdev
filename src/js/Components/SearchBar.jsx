import React from 'react';

export default class SearchBar extends React.Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.props.searchAction(event.target.value);
	}

	render() {
		return (
			<form>
				<div className="form-group">
					<div className="input-group">
						<div className="input-group-addon">
							<i className="fa fa-search" />
						</div>
						<input type="text" className="form-control" placeholder="Search" onChange={this.handleChange} />
					</div>
				</div>
			</form>
		);
	}
}
