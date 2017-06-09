import React from 'react';

const UserTable = props => {
	if (!props.user) {
		return (
			<tr>
				<td>Keine Daten vorhanden</td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
		);
	}

	return (
		<tr>
			<td>{props.user.name}</td>
			<td>{props.user.email}</td>
			<td>{props.user.phone}</td>
			<td>
				<p>{props.user.address.street}</p>
				<p>{props.user.address.suite}</p>
				<p>{props.user.address.city}</p>
				<p>{props.user.address.zipcode}</p>
			</td>
			<td>{props.user.company.name}</td>
		</tr>
	);
};

export default UserTable;
