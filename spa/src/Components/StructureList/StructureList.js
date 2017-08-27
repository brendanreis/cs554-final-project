import React from 'react';
import ApiClient from '../ApiClient/ApiClient';

class StructureList extends React.Component {
    constructor(props) {
        console.log("In constructor");
        super(props);

        this.state = {
            adminMode: props.adminMode,
            structureList: []
        };

        this.editStructure = this.editStructure.bind(this);
        // this.deleteStructure = this.deleteStructure.bind(this);
    }

    async componentWillMount() {
        const response = await ApiClient.sendRequest("structures", "GET", null);
        this.setState({
            structureList: response.response
        });
    }

    editStructure(event) {
        event.preventDefault();

        console.log(event.target.value);
    }

    render() {
        let structureListItems = "";
        if (true) {
            structureListItems = this.state.structureList.map((structure, index) =>
                <li key={structure._id}>
                    <div>{structure.name}</div>
                    <div>Entries: {structure.entries ? structure.entries.length : 0}</div>
                    <div>{structure.description}</div>
                    <input type="button" value="Edit" onClick={this.editStructure}/>
                    <input type="button" value="Delete"/>
                </li>
            );
        } else {
            structureListItems = this.state.structureList.map((structure, index) =>
                <li key={structure._id}>
                    <div>{structure.name}</div>
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