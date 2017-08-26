import React from 'react';
import ApiClient from '../ApiClient/ApiClient';

class StructureList extends React.Component {
    constructor(props) {
        console.log("In constructor");
        super(props);

        this.state = {
            adminMode: props.adminMode,
            structureList: []
        }
    }

    async componentWillMount() {
        console.log("In componentWillMount");
        this.state.structureList = await ApiClient.sendRequest("structures", "GET", null);
    }

    render() {
        return (
            <div>
                {this.state.structureList}
            </div>
        );
    }
}

export default StructureList;