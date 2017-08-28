import React from 'react';
import 'react-select/dist/react-select.css';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import getSlug from 'speakingurl';
import ApiClient from '../../ApiClient/ApiClient';

const enums = require("../../../enums");

const newEntryInitialState = {
    apiResponse: "",
    id: "",
    title: "",
    blurb: "",
    author: "",
    createdDate: "",
    fields: [],
    values: [],
    slugPreview: ""
};

class NewEntry extends React.Component {
    constructor(props) {
        super(props);

        this.state = newEntryInitialState;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createFieldInput = this.createFieldInput.bind(this);
    }

    async componentWillMount() {
        if (this.props.match.params.entryslug !== "new") {
            const response = await ApiClient.sendRequest(`structures/${this.props.match.params.slug}/entries`, enums.restMethods.GET, null);
            const entry = response.response;
            this.setState(entry);
        } else {
            const response = await ApiClient.sendRequest(`structures/${this.props.match.params.slug}`, enums.restMethods.GET, null);
            const structure = response.response;
            const fields = structure.fields;
            const values = new Array(fields.length).fill("");
            for (let i = 0; i < fields.length; i++) {
                if(fields[i] === enums.fields.LINK) {
                    values[i] = {
                        linkTitle: "",
                        linkUrl: ""
                    };
                } else if (fields[i] === enums.fields.NUMBER) {
                    values[i] = 0;
                }
            }
            this.setState({
                fields: fields,
                values: values
            });
        }
    }

    handleInputChange(event, index) {
        event.preventDefault();

        const target = event.target;
        const name = target.name;
        const value = target.value;

        if (name === "id") {
            const slugPreview = getSlug(value);
            this.setState({
                slugPreview: slugPreview
            });
        }

        let newState = undefined;
        const newValues = this.state.values;
        console.log(JSON.stringify(Object.values(enums.fields)));
        if (Object.values(enums.fields).includes(name)) {
            switch (name) {
                case enums.fields.WYSIWYG:
                    newValues[index] = target.contentState;
                    newState = {values: newValues};
                    break;
                default:
                    newValues[index] = value;
                    newState = {values: newValues};
            }
        } else {
            switch (name) {
                case "linkTitle":
                    newValues[index].linkTitle = value;
                    newState = {values: newValues};
                    break;
                case "linkUrl":
                    newValues[index].linkUrl = value;
                    newState = {values: newValues};
                    break;
                case "youtubeUrl":
                case "entryUrl":
                    newValues[index] = value;
                    newState = {values: newValues};
                    break;
                default:
                    newState = {[name]: value};
            }
        }

        this.setState(newState);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const body = JSON.stringify({
            entry: {
                id: this.state.slugPreview,
                title: this.state.title,
                blurb: this.state.blurb,
                author: this.state.author,
                createdDate: this.state.createdDate ? this.state.createdDate : new Date(),
                fields: this.state.fields,
                values: this.state.values,
                comments: []
            }
        });
        if (this.props.match.params.entryslug === "new") {
            this.state.apiResponse = await ApiClient.sendRequest(`structures/${this.props.match.params.slug}`, enums.restMethods.POST, body);
            this.setState(newEntryInitialState);
        } else {
            this.state.apiResponse = await ApiClient.sendRequest(`structures/${this.props.match.params.slug}/${this.props.match.params.entryslug}`, enums.restMethods.PUT, body);
        }
    }

    createFieldInput(field, index) {
        switch (field) {
            case enums.fields.SMALL_TEXT:
                return (
                    <input name={enums.fields.SMALL_TEXT} value={this.state.values[index]} key={index} type="text" onChange={(e) => this.handleInputChange(e, index)}/>);
            case enums.fields.NUMBER:
                return (
                    <input name={enums.fields.NUMBER} value={this.state.values[index]} key={index} type="number" onChange={(e) => this.handleInputChange(e, index)}/>);
            case enums.fields.CHECKBOX:
                return (<input name={enums.fields.CHECKBOX} value={this.state.values[index]} key={index} type="checkbox"
                               onChange={(e) => this.handleInputChange(e, index)}/>);
            case enums.fields.TEXTAREA:
                return (<textarea name={enums.fields.TEXTAREA} value={this.state.values[index]} key={index}
                                  onChange={(e) => this.handleInputChange(e, index)}>...</textarea>);
            case enums.fields.PICTURE:
                return (<input name={enums.fields.PICTURE} value={this.state.values[index]} key={index} type="file" accept="image/*"
                               onChange={(e) => this.handleInputChange(e, index)}/>);
            case enums.fields.LINK:
                return (
                    <div name={enums.fields.LINK} key={index}>
                        <label>
                            Title:
                            <input key={index} name="linkTitle" value={this.state.values[index].linkTitle} type="text" onChange={(e) => this.handleInputChange(e, index)}/>
                        </label>
                        <label>
                            URL:
                            <input key={index} name="linkUrl" value={this.state.values[index].linkUrl} type="url" onChange={(e) => this.handleInputChange(e, index)}/>
                        </label>
                    </div>
                );
            case enums.fields.WYSIWYG:
                return (
                    <Editor
                        name={enums.fields.WYSIWYG}
                        key={index}
                        toolbarClassName="toolbarClass"
                        wrapperClassName="wrapperClass"
                        editorClassName="editorClass"
                        contentState={this.state.values[index]}
                        onEditorStateChange={(e) => this.handleInputChange(e, index)}
                    />
                );
            case enums.fields.DATEPICKER:
                return (
                    <input name={enums.fields.DATEPICKER} value={this.state.values[index]} key={index} type="date" onChange={(e) => this.handleInputChange(e, index)}/>);
            case enums.fields.YOUTUBE:
                return (
                    <label name={enums.fields.YOUTUBE} key={index}>
                        YouTube Video URL:
                        <input name="youtubeUrl" value={this.state.values[index]} key={index} type="url" onChange={(e) => this.handleInputChange(e, index)}/>
                    </label>
                );
            case enums.fields.ENTRY:
                return (
                    <label name={enums.fields.ENTRY} key={index}>
                        Structure Entry URL:
                        <input name="entryUrl" value={this.state.values[index]} key={index} type="url" onChange={(e) => this.handleInputChange(e, index)}/>
                    </label>
                );
            case enums.fields.FILE:
                return (<input name={enums.fields.FILE} value={this.state.values[index]} key={index} type="file" onChange={(e) => this.handleInputChange(e, index)}/>);
            default:
                console.log("Error: Invalid field");
        }
    }

    render() {
        const fieldInputs = this.state.fields.map(this.createFieldInput);

        return (
            <div>
                <h3>New Entry</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Title:
                        <input name="title" type="text" value={this.state.title} onChange={this.handleInputChange}/>
                    </label>
                    <label>
                        Slug:
                        <input name="id" type="text" value={this.state.id} onChange={this.handleInputChange}/>

                    </label>
                    <label>
                        Blurb:
                        <input name="blurb" type="text" value={this.state.blurb}
                               onChange={this.handleInputChange}/>
                        <div>{this.state.slugPreview}</div>
                    </label>
                    <label>
                        Author: (Current user)
                    </label>
                    <div>
                        {fieldInputs}
                    </div>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default NewEntry;