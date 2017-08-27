import React from 'react';
import ApiClient from '../ApiClient/ApiClient';

const enums = require("../../enums");

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            userListItems: ""
        }
    }

    async componentWillMount() {
        const response = await ApiClient.sendRequest("users", enums.restMethods.GET, null);
        this.setState({
            users: response.response
        });

        const userListItems = await Promise.all(this.state.users.map(this.mapUserListItem));
        console.log("Got user list items");
        this.setState({
            userListItems: userListItems
        })
    }

    async mapUserListItem(user, index) {
        const pendingFavoriteEntries = [];
        const pendingFavoriteEntryStructures = [];
        for (let i = 0; i < user.favorites.length; i++) {
            pendingFavoriteEntries.push(
                ApiClient.sendRequest(
                    `structures/${user.favorites[i].structureId}/entries/${user.favorites[i].entryId}`,
                    enums.restMethods.GET,
                    null
                )
            );
            pendingFavoriteEntryStructures.push(
                ApiClient.sendRequest(
                    `structures/${user.favorites[i].structureId}`,
                    enums.restMethods.GET,
                    null
                )
            );
        }

        const favoriteEntries = await Promise.all(pendingFavoriteEntries);
        const favoriteEntryStructures = await Promise.all(pendingFavoriteEntryStructures);

        const favorites = {};

        for (let i = 0; i < favoriteEntryStructures.length; i++) {
            if (favorites[favoriteEntryStructures[i]._id]) {
                favorites[favoriteEntryStructures[i]._id].entries.push(favoriteEntries[i]);
            } else {
                favorites[favoriteEntryStructures[i]._id] = {
                    structureName: favoriteEntryStructures[i].name,
                    entries: [favoriteEntries[i]]
                };
            }
        }


        return (
            <li key={index}>
                <div>{user.name}</div>
                <div>{user.signupDate.}</div>
                <div>{user.bio}</div>
                <div>{Object.keys(favorites).map((key, index) =>
                    <div key={index}>
                        <div>{favorites[key].name}</div>
                        <ul>
                            {favorites[key].entries.map((entry, index) =>
                                <li key={index}>{entry.name}</li>
                            )}
                        </ul>
                    </div>
                )}
                </div>
            </li>
        );
    }

    render() {
        return (
            <ul>{this.state.userListItems}</ul>
        );
    }
}

export default Users;