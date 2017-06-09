import React from 'react';
import SearchBar from '../Components/SearchBar';
import UserTable from '../Components/UserTable';
import axios from 'axios';
import { filter, isObject } from 'lodash';

export default class MainPage extends React.Component {
	constructor() {
		super();

		this.state = {
			users: [],
			searchUser: ''
		};

		this.searchUserHasChanged = this.searchUserHasChanged.bind(this);
	}

	componentWillMount() {
		axios
			.get('https://jsonplaceholder.typicode.com/users')
			.then(response => response.data)
			.then(data => this.setState({ users: data }));
	}

	searchUserHasChanged(term) {
		this.setState({ searchUser: term });
	}

	findInObject(obj, searchTerm) {
		if (isObject(obj)) {
			for (var property in obj) {
				if (obj.hasOwnProperty(property)) {
					if (
						obj[property].toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
						this.findInObject(obj[property], searchTerm)
					) {
						return true;
					}
				}
			}
		}

		return false;
	}

	render() {
		console.log('state', this.state);

		let { users, searchUser } = this.state;
		if (searchUser !== '') {
			users = filter(users, user => this.findInObject(user, searchUser));
		}

		return (
			<div class="container">
				<h2>Users of jsonplaceholder</h2>
				<SearchBar searchAction={this.searchUserHasChanged} />
				<UserTable users={users} />

				<p class="text-center">
					by <a href="http://optimal-systems.com" target="_blank">Richard Glander [OPTIMAL SYSTEMS]</a>
					{' '}|{' '}reactified by Sebastian (auch OS) :)
				</p>
			</div>
		);
	}
}
