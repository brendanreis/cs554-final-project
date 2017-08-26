import React from 'react';
import Select from 'react-select';
import ApiClient from '../../ApiClient/ApiClient';

const enums = require("../../../enums");

class NewStructure extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiResponse: "",
            name: "",
            slug: "",
            description: "",
            pageSize: "",
            currentField: "",
            fields: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if (name === addField) {

        } else {
            this.setState({
                [name]: value
            });
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.state.apiResponse = await ApiClient.sendRequest("structures", "POST",
            JSON.stringify({
                structure: {
                    name: this.state.name,
                    _id: this.state.slug,
                    description: this.state.description,
                    pageSize: this.state.pageSize,
                    fields: this.state.fields,
                }
            })
        );
    }

    render() {
        const options = [
            { value: enums.fields.SMALL_TEXT, label: enums.fields.SMALL_TEXT },
            { value: enums.fields.NUMBER, label: enums.fields.NUMBER },
            { value: enums.fields.CHECKBOX, label: enums.fields.CHECKBOX },
            { value: enums.fields.TEXTAREA, label: enums.fields.TEXTAREA },
            { value: enums.fields.PICTURE, label: enums.fields.PICTURE },
            { value: enums.fields.LINK, label: enums.fields.LINK },
            { value: enums.fields.WYSIWYG, label: enums.fields.WYSIWYG },
            { value: enums.fields.DATEPICKER, label: enums.fields.DATEPICKER },
            { value: enums.fields.YOUTUBE, label: enums.fields.YOUTUBE },
            { value: enums.fields.ENTRY, label: enums.fields.ENTRY },
            { value: enums.fields.FILE, label: enums.fields.FILE },
        ];

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
                        <input name="slug" type="text" value={this.state.slug} onChange={this.handleInputChange}/>
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
                        <Select name="currentField" value={this.state.fields} options={options}
                                onChange={this.handleInputChange}/>
                        <input type="submit" value="Submit"/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default NewStructure;