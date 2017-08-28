import React from 'react';
import {
    Link
} from 'react-router-dom';
import ApiClient from '../ApiClient/ApiClient';

const enums = require("../../enums");

class StructureEntries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adminMode: props.adminMode,
            structureId: props.match.params.structure,
            structureName: "",
            entries: []
        }
    }

    async componentWillMount() {
        const structureResponse = await ApiClient.sendRequest(`structures/${this.state.structureId}`, enums.restMethods.GET, null);
        const entriesResponse = await ApiClient.sendRequest(`structures/${this.state.structureId}/entries`, enums.restMethods.GET, null);
        this.setState({
            structureName: structureResponse.response.name,
            entries: entriesResponse.response
        });
    }

    render() {
        return (
            <div>
                <h3>{`${this.state.structureName} Entries`}</h3>
                <ul>
                    {this.state.entries.map((entry, index) =>
                        <li key={entry.id}>
                            <div><Link to={`${this.state.structureId}/${entry.id}`}>{entry.title}</Link></div>
                            <div>Created on: {entry.createdDate}</div>
                            <div>Comments: {entry.comments.length}</div>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default StructureEntries;