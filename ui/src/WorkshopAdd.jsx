/* globals React */
import React, { Component } from "react";
import http from "../src/services/httpService";

export default class WorkshopAdd extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }

    handleInputChange = e => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    async handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.workshopAdd;
        console.log(form);
        const formData = new FormData();
        console.log(formData);
        const uploadedFile = this.fileInput.current.files[0];
        console.log(uploadedFile);
        formData.append("workshopImage", uploadedFile);

        console.log(window.ENV);
        console.log(formData);

        // Display the key/value pairs
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        const { data: resources } = await http.post(
            window.ENV.UI_API_IMAGE_ENDPOINT,
            formData
        );
        console.log(resources);
        //0 = thumb, 1 == watermakrk 2 == original
        const imageThumb =
            "https://dkotwt30gflnm.cloudfront.net/" +
            resources.transforms.find(elem => elem.id === "thumbnail").key;
        const imageOriginal =
            "https://dkotwt30gflnm.cloudfront.net/" +
            resources.transforms.find(elem => elem.id === "original").key;
        const imageWatermark =
            "https://dkotwt30gflnm.cloudfront.net/" +
            resources.transforms.find(elem => elem.id === "watermark").key;

        const workshop = {
            title: form.title.value,
            place: form.place.value,
            date: new Date(form.date.value).toISOString(),
            description: form.desc.value,
            category: form.category.value,
            images: {
                imageThumb,
                imageOriginal,
                imageWatermark
            }
        };
        this.props.createWorkshop(workshop);
        form.title.value = "";
        form.place.value = "";
        form.date.value = "";
        form.desc.value = "";
        form.category.value = "";
    }

    render() {
        return (
            <form
                name="workshopAdd"
                encType="multipart/form-data"
                onSubmit={this.handleSubmit}
                onChange={this.handleChange}
                className="block py-3 px-4 border border-gray-300 rounded"
            >
                <h3 className="my-2">Add workshop</h3>
                <input
                    type="text"
                    name="title"
                    placeholder="Titel"
                    className="border border-gray-400 bg-gray-200 focus:bg-white text-gray-900 appearance-none inline-block w-full border rounded py-3 px-4 focus:outline-none mb-2"
                />
                <input
                    type="text"
                    name="place"
                    placeholder="Plaats"
                    className="border border-gray-400 bg-gray-200 focus:bg-white text-gray-900 appearance-none inline-block w-full border rounded py-3 px-4 focus:outline-none mb-2"
                />
                <input
                    type="date"
                    name="date"
                    placeholder="Datum"
                    className="border border-gray-400 bg-gray-200 focus:bg-white text-gray-900 appearance-none inline-block w-full border rounded py-3 px-4 focus:outline-none mb-2"
                />
                <input
                    type="file"
                    name="workshopImage"
                    ref={this.fileInput}
                    className="border border-gray-400 bg-gray-200 focus:bg-white text-gray-900 appearance-none inline-block w-full border rounded py-3 px-4 focus:outline-none mb-2"
                />
                <input
                    type="text"
                    name="desc"
                    placeholder="Beschrijving"
                    className="border border-gray-400 bg-gray-200 focus:bg-white text-gray-900 appearance-none inline-block w-full border rounded py-3 px-4 focus:outline-none mb-2"
                />
                <select name="category">
                    <option value="nachtfotografie">Nachtfotografie</option>
                    <option value="nabewerking">Lightroom/Photoshop</option>
                    <option value="photowalk">Photowalk</option>
                    <option value="landschapsfotografie">Landschapsfotografie</option>
                </select>
                <button className="block px-3 py- my-2 bg-blue-600 text-white rounded text-l">
                    Add
          </button>
            </form>
        );
    }
}