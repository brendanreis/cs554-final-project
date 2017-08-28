import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import getSlug from 'speakingurl';
import ApiClient from '../../ApiClient/ApiClient';

const enums = require("../../../enums");

const newStructureInitialState = {
    apiResponse: "",
    name: "",
    _id: "",
    description: "",
    pageSize: "",
    currentField: enums.fields.SMALL_TEXT,
    fields: [],
    slugPreview: ""
};

class NewStructure extends React.Component {
    constructor(props) {
        super(props);

        this.state = newStructureInitialState;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addField = this.addField.bind(this);
        this.clearFields = this.clearFields.bind(this);
        this.handleChangeCurrentField = this.handleChangeCurrentField.bind(this);

        if (props.match.params.slug === "new") {
            this.state = newStructureInitialState;
        }
    }

    async componentWillMount() {
        if (this.props.match.params.slug !== "new") {
            const response = await ApiClient.sendRequest(`structures/${this.props.match.params.slug}`, "GET", null);
            const structure = response.response;
            structure.entries = undefined;
            this.setState(structure);
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        let value = target.value;

        if (name === "_id") {
            const slugPreview = getSlug(value);
            console.log(slugPreview);
            this.setState({
                slugPreview: slugPreview
            });
        }

        this.setState({
            [name]: value
        });

    }

    async handleSubmit(event) {
        event.preventDefault();
        const body = JSON.stringify({
            structure: {
                name: this.state.name,
                _id: this.state.slugPreview,
                description: this.state.description,
                pageSize: this.state.pageSize,
                fields: this.state.fields,
            }
        });
        if (this.props.match.params.slug === "new") {
            this.state.apiResponse = await ApiClient.sendRequest("structures", enums.restMethods.POST, body);
            this.setState(newStructureInitialState);
        } else {
            this.state.apiResponse = await ApiClient.sendRequest(`structures/${body.structure._id}`, enums.restMethods.PUT, body);
        }
    }

    handleChangeCurrentField(newField) {
        console.log(`New current field: ${JSON.stringify(newField)}`);

        this.setState({
            currentField: newField.value
        });
    }

    addField(event) {
        event.preventDefault();

        this.setState({
            fields: this.state.fields.concat([this.state.currentField])
        });
    }

    clearFields(event) {
        event.preventDefault();

        this.setState({
            fields: []
        });
    }

    render() {
        const options = [
            {value: enums.fields.SMALL_TEXT, label: enums.fields.SMALL_TEXT},
            {value: enums.fields.NUMBER, label: enums.fields.NUMBER},
            {value: enums.fields.CHECKBOX, label: enums.fields.CHECKBOX},
            {value: enums.fields.TEXTAREA, label: enums.fields.TEXTAREA},
            {value: enums.fields.PICTURE, label: enums.fields.PICTURE},
            {value: enums.fields.LINK, label: enums.fields.LINK},
            {value: enums.fields.WYSIWYG, label: enums.fields.WYSIWYG},
            {value: enums.fields.DATEPICKER, label: enums.fields.DATEPICKER},
            {value: enums.fields.YOUTUBE, label: enums.fields.YOUTUBE},
            {value: enums.fields.ENTRY, label: enums.fields.ENTRY},
            {value: enums.fields.FILE, label: enums.fields.FILE},
        ];

        const fieldListItems = this.state.fields.map((field, index) =>
            <li key={index}>{field}</li>
        );

        return (
            <div>
                <h3>Create Structure</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input name="name" type="text" value={this.state.name} onChange={this.handleInputChange}/>
                    </label>
                    <label>
                        Slug:
                        <input name="_id" type="text" value={this.state._id} onChange={this.handleInputChange}/>
                        <div>{this.state.slugPreview}</div>
                    </label>
                    <label>
                        Description:
                        <input name="description" type="text" value={this.state.description}
                               onChange={this.handleInputChange}/>
                    </label>
                    <label>
                        Page Size:
                        <input name="pageSize" type="text" value={this.state.pageSize}
                               onChange={this.handleInputChange}/>
                    </label>
                    <label>
                        Fields:
                        <ul>{fieldListItems}</ul>
                        <Select name="currentField" options={options} value={this.state.currentField}
                                onChange={this.handleChangeCurrentField}/>
                        <input type="button" value="Add Field" onClick={this.addField}/>
                        <input type="button" value="Clear Fields" onClick={this.clearFields}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default NewStructure;