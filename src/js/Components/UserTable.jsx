import React from 'react';
import UserTableLine from './UserTableLine';
import { orderBy, at } from 'lodash';

export default class UserTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			sortType: 'name',
			sortReverse: false
		};

		this.sortColumn = this.sortColumn.bind(this);
	}

	sortColumn(e) {
		let { sortReverse } = this.state;
		this.setState({
			sortType: e.target.id,
			sortReverse: !sortReverse
		});
	}

	render() {
		let { sortReverse, sortType } = this.state;
		let { users } = this.props;

		users = orderBy(users, user => at(user, sortType), sortReverse ? 'desc' : 'asc');

		return (
			<table className="table table-striped">
				<thead>
					<tr>
						<td>
							<a href="#" id="name" onClick={this.sortColumn}>
								Name{' '}
								{sortType === 'name' && sortReverse && <span className="fa fa-caret-down" />}
								{sortType === 'name' && !sortReverse && <span className="fa fa-caret-up" />}
							</a>
						</td>
						<td>
							<a href="#" id="email" onClick={this.sortColumn}>
								Email{' '}
								{sortType === 'email' && sortReverse && <span className="fa fa-caret-down" />}
								{sortType === 'email' && !sortReverse && <span className="fa fa-caret-up" />}
							</a>
						</td>
						<td>
							<a href="#" id="phone" onClick={this.sortColumn}>
								Phone{' '}
								{sortType === 'phone' && sortReverse && <span className="fa fa-caret-down" />}
								{sortType === 'phone' && !sortReverse && <span className="fa fa-caret-up" />}
							</a>
						</td>
						<td>
							<a href="#" id="address.city" onClick={this.sortColumn}>
								Adress{' '}
								{sortType === 'address.city' && sortReverse && <span className="fa fa-caret-down" />}
								{sortType === 'address.city' && !sortReverse && <span className="fa fa-caret-up" />}
							</a>
						</td>
						<td>
							<a href="#" id="company.name" onClick={this.sortColumn}>
								Company{' '}
								{sortType === 'company.name' && sortReverse && <span className="fa fa-caret-down" />}
								{sortType === 'company.name' && !sortReverse && <span className="fa fa-caret-up" />}
							</a>
						</td>

					</tr>
				</thead>
				<tbody>
					{users && users.map(user => <UserTableLine key={user.id} user={user} />)}
				</tbody>
			</table>
		);
	}
}
