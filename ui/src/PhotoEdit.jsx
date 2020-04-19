/* globals React */
import React, { Component } from "react";
import graphQLFetch from './graphQLFetch.js';
import DateInput from "./DateInput.jsx";
import TextInput from "./TextInput.jsx";
import { toast } from 'react-toastify';

class PhotoEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: {},
            invalidFields: {}
        }
        this.onValidityChange = this.onValidityChange.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        const { match: { params: { id: prevId } } } = prevProps;
        const { match: { params: { id } } } = this.props;
        if (id !== prevId) {
            this.loadData();
        }
    }

    onValidityChange(event, valid) {
        // this function gets called by child compontent, if the valid value changed
        // from valid to nonvalid or other way around
        // get the name of the input
        const { name } = event.target;
        // update the state, by overriding the new valid state
        this.setState((prevState) => {
            const invalidFields = { ...prevState.invalidFields, [name]: !valid };
            // if valid is true, delete the inputfield from the state
            if (valid) delete invalidFields[name];
            // update the state with the new invalid fields
            return { invalidFields };
        })
    }

    onChange(e, naturalValue) {
        const { name, value: textValue } = e.target;
        const value = naturalValue === undefined ? textValue : naturalValue;
        this.setState(prevState => ({
            // to only update values that changed, list out all of the previous values
            // with ...prevState.photo and override the changed ones with [name]: value
            photo: { ...prevState.photo, [name]: value }
        }));
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { photo, invalidFields } = this.state;
        if (Object.keys(invalidFields).length !== 0) return;
        const query = `mutation issueUpdate(
            $id: Int!
            $changes: PhotoUpdateInputs!
        ) {
            photoUpdate(
                id: $id
                changes: $changes
            ) {
                id
                title
                date
                created
                description
                ISO
                shutterspeed
                aperture
                images {
                  imageThumb
                  imageOriginal
                  imageWatermark
                }
            }
        }`;

        // get the properties id and created from photo, and store the rest in changes
        const { id, created, ...changes } = photo;
        const data = await graphQLFetch(query, { changes, id });
        if (data) {
            this.setState({ photo: data.photoUpdate });
            toast.success("Succesvol geudate");
        }
    }

    async loadData() {

        // build the graphql query
        const query = `query photo($id: Int!) {
        photo(id: $id) {
          id
          title
          date
          created
          description
          ISO
          shutterspeed
          aperture
          images {
            imageThumb
            imageOriginal
            imageWatermark
          }
        }
      }`;

        // get the search query string form url
        const { match: { params: { id } } } = this.props;

        // provide the query with the variables 
        const data = await graphQLFetch(query, { id });
        if (data) {
            const { photo } = data;
            data.created = data.created ? data.created.toDateString() : '';
            data.date = data.date ? data.date.toDateString() : '';
            this.setState({ photo, invalidFields: {} });
        } else {
            this.setState({ photo: {}, invalidFields: {} });
        }
    }

    render() {
        // get photo ID from state
        const { photo: { id } } = this.state;
        // get photo ID form url
        const { match: { params: { id: propsId } } } = this.props;

        // check if state has a photo
        if (id == null) {

            // if not, but url has an id, the photo is not found
            if (propsId != null) {
                return <h3>{`Foto met ID ${propsId} niet gevonden.`}</h3>;
            }

            // if no id is supplied, return null
            return null;
        }

        const { photo: { images: { imageWatermark } } } = this.state;
        const { photo } = this.state;
        const { invalidFields } = this.state;
        let validationMessage;
        if (Object.keys(invalidFields).length !== 0) {
            validationMessage = (
                <div className="error">
                    🤔Heb je alle velden goed ingevuld?
                </div>
            );
        }

        let btnClass = "block px-3 py- my-2 text-white rounded text-l";
        let disabled = Object.keys(invalidFields).length !== 0;
        btnClass += disabled ? " bg-gray-400" : " bg-blue-600";

        return (
            <form onSubmit={this.handleSubmit}>
                <h3>{`Bewerk foto ${photo.title}`}</h3>
                <img
                    src={photo.images.imageWatermark}
                    className="object-cover w-full h-48 block"
                    alt="Foto"
                    id="replacePhoto"
                />
                <label htmlFor="title">Titel</label>
                <TextInput
                    id="title"
                    name="title"
                    type="text"
                    value={photo.title}
                    onChange={this.onChange}
                />
                <label htmlFor="date">Datum</label>
                <DateInput
                    name="date"
                    value={photo.date}
                    onChange={this.onChange}
                    onValidityChange={this.onValidityChange}
                />
                <label htmlFor="shutterspeed">Sluitertijd</label>
                <TextInput
                    id="shutterspeed"
                    name="shutterspeed"
                    type="text"
                    value={photo.shutterspeed}
                    onChange={this.onChange}
                />
                <label htmlFor="shutterspeed">ISO</label>
                <TextInput
                    id="ISO"
                    name="ISO"
                    type="text"
                    value={photo.ISO}
                    onChange={this.onChange}
                />
                <label htmlFor="aperture">Diafragma</label>
                <TextInput
                    id="aperture"
                    name="aperture"
                    type="text"
                    value={photo.aperture}
                    onChange={this.onChange}
                />
                <label htmlFor="description">Beschrijving</label>
                <TextInput
                    tag="textarea"
                    id="description"
                    name="description"
                    type="text"
                    value={photo.description}
                    onChange={this.onChange}
                />
                <button type="submit" className={btnClass}>Opslaan</button>

                {validationMessage}
            </form>
        )
    }
}

export default PhotoEdit;