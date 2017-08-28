import React from 'react';
import {
    Link
} from 'react-router-dom';
import ApiClient from '../ApiClient/ApiClient';

class StructureList extends React.Component {
    constructor(props) {
        console.log("In constructor");
        super(props);

        this.state = {
            adminMode: props.adminMode,
            structureList: []
        };

        // this.deleteStructure = this.deleteStructure.bind(this);
    }

    async componentWillMount() {
        const response = await ApiClient.sendRequest("structures", "GET", null);
        this.setState({
            structureList: response.response
        });
    }

    render() {
        let structureListItems = "";
        if (true) {
            structureListItems = this.state.structureList.map((structure, index) =>
                <li key={structure._id}>
                    <div><Link to={"/:structure".replace(":structure", structure._id)}>{structure.name}</Link></div>
                    <div>Entries: {structure.entries ? structure.entries.length : 0}</div>
                    <div>{structure.description}</div>
                    <Link to={`/admin/structures/${structure._id}`}><button type="button">Edit</button></Link>
                    <button type="button">Delete</button>
                    <Link to={`/admin/structures/${structure._id}/new`}><button type="button">Add Entry</button></Link>
                </li>
            );
        } else {
            structureListItems = this.state.structureList.map((structure, index) =>
                <li key={structure._id}>
                    <div><Link to={"/:structure".replace(":structure", structure._id)}>{structure.name}</Link></div>
                    <div>Entries: {structure.entries ? structure.entries.length : 0}</div>
                    <div>{structure.description}</div>
                </li>
            );
        }


        return (
            <ul>{structureListItems}</ul>
        );
    }
}

export default StructureList;