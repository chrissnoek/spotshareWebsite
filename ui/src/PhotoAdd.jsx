/* globals React */
import React, { Component } from "react";
import graphQLFetch from './graphQLFetch.js';
import http from "./services/httpService";
import EXIF from 'exif-js'

export default class PhotoAdd extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
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

    createPhoto = async photo => {
        // create a mutation query with a variable, which is passed in the body in the fetch
        // first addAPhoto is just a mutation name, afther is the variable and the type which is photoinputs
        // next is the actual mutation which is getting the $photo variable
        // the query should return only the id
        const query = `mutation addPhoto($photo: PhotoInputs!) {
            photoAdd(photo: $photo) {
                id
            }
        }`;

        const data = await graphQLFetch(query, { photo });
        if (data) {
            //console.log(data.photoAdd.id);
            // if the query returns an id in data, the photo is created
            // redirect to created photo
            const { id } = data.photoAdd;
            const { history } = this.props;
            history.push({
                pathname: `/photos/${id}`
            })
        }
    };

    onFileChange(e) {

        var file = e.target.files[0];
        var reader = new FileReader();

        reader.onload = function () {
            var output = document.getElementById('output_image');
            output.src = reader.result;
        }

        reader.readAsDataURL(file);

        if (file && file.name) {
            EXIF.getData(file, () => {
                var exifData = EXIF.pretty(file);
                const form = document.forms.photoAdd;
                if (exifData && EXIF.getTag(file, "ExposureTime") && EXIF.getTag(file, "ISOSpeedRatings") && EXIF.getTag(file, "FNumber")) {
                    console.log(EXIF);
                    console.log(exifData);

                    console.log(EXIF.getTag(file, "DateTime").substr(0, 10).split(":"));

                    let date = EXIF.getTag(file, "DateTime");
                    if (date) {
                        let splittedDate = EXIF.getTag(file, "DateTime").substr(0, 10).split(":");
                        const year = splittedDate[0];
                        const month = splittedDate[1];
                        const day = splittedDate[2];
                        let dateVal = `${year}-${month}-${day}`;

                        this.setState((prevState) => ({
                            ...prevState, date: dateVal
                        }));
                    }

                    let shutterspeedVal = EXIF.getTag(file, "ExposureTime") > 1 ? EXIF.getTag(file, "ExposureTime") + 's' : '1/' + (1 / EXIF.getTag(file, "ExposureTime")) + 's';
                    let ISOVal = EXIF.getTag(file, "ISOSpeedRatings");
                    let apertureVal = 'f/' + EXIF.getTag(file, "FNumber");
                    let focalLengthVal = EXIF.getTag(file, "FocalLength") + 'mm';
                    let cameraVal = EXIF.getTag(file, "Model");

                    console.log(this);
                    this.setState((prevState) => ({
                        ...prevState, shutterspeed: shutterspeedVal, ISO: ISOVal, aperture: apertureVal, focalLength: focalLengthVal, camera: cameraVal
                    }));

                } else {
                    console.log("No EXIF data found in image '" + file.name + "'.");
                    this.setState((prevState) => ({
                        ...prevState, shutterspeed: '', ISO: '', aperture: '', focalLength: '', camera: ''
                    }));
                }
            });
        } else {
            this.setState((prevState) => ({
                ...prevState, shutterspeed: '', ISO: '', aperture: '', focalLength: '', camera: ''
            }));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.photoAdd;
        const formData = new FormData();
        const uploadedFile = this.fileInput.current.files[0];
        formData.append("photoImage", uploadedFile);

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

        const photo = {
            title: form.title.value,
            //place: form.place.value,
            date: new Date(form.date.value).toISOString(),
            description: form.desc.value,
            shutterspeed: form.shutterspeed.value,
            ISO: form.ISO.value,
            aperture: form.aperture.value,
            images: {
                imageThumb,
                imageOriginal,
                imageWatermark
            }
        };
        this.createPhoto(photo);

        // reset the form fields to empty values
        // this.setState({});


    }

    render() {
        const { date, shutterspeed, ISO, aperture, camera, focalLength } = this.state;
        return (
            <form
                name="photoAdd"
                encType="multipart/form-data"
                onSubmit={this.handleSubmit}
                onChange={this.handleInputChange}
                className="block py-3 px-4 border border-gray-300 rounded"
            >
                <h3 className="my-2">Foto toevoegen</h3>
                {/* <input
                    type="text"
                    name="place"
                    placeholder="Plaats"
                    className="border border-gray-400 bg-gray-200 focus:bg-white text-gray-900 appearance-none inline-block w-full border rounded py-3 px-4 focus:outline-none mb-2"
                /> */}
                <input
                    type="file"
                    name="photoImage"
                    ref={this.fileInput}
                    onChange={this.onFileChange}
                    className="border border-gray-400 bg-gray-200 focus:bg-white text-gray-900 appearance-none inline-block w-full border rounded py-3 px-4 focus:outline-none mb-2"
                />
                <img id="output_image" style={{ maxWidth: '300px' }} />
                <input
                    type="text"
                    name="title"
                    placeholder="Titel"
                    className="border border-gray-400 bg-gray-200 focus:bg-white text-gray-900 appearance-none inline-block w-full border rounded py-3 px-4 focus:outline-none mb-2"
                />
                <input
                    type="date"
                    name="date"
                    placeholder="Datum"
                    defaultValue={date || ""}
                    className="border border-gray-400 bg-gray-200 focus:bg-white text-gray-900 appearance-none inline-block w-full border rounded py-3 px-4 focus:outline-none mb-2"
                />
                <input
                    type="text"
                    name="shutterspeed"
                    placeholder="shutterspeed"
                    defaultValue={shutterspeed || ""}
                    className="border border-gray-400 bg-gray-200 focus:bg-white text-gray-900 appearance-none inline-block w-full border rounded py-3 px-4 focus:outline-none mb-2"
                />
                <input
                    type="text"
                    name="ISO"
                    placeholder="ISO"
                    defaultValue={ISO || ""}
                    className="border border-gray-400 bg-gray-200 focus:bg-white text-gray-900 appearance-none inline-block w-full border rounded py-3 px-4 focus:outline-none mb-2"
                />
                <input
                    type="text"
                    name="aperture"
                    placeholder="aperture"
                    defaultValue={aperture || ""}
                    className="border border-gray-400 bg-gray-200 focus:bg-white text-gray-900 appearance-none inline-block w-full border rounded py-3 px-4 focus:outline-none mb-2"
                />
                <input
                    type="text"
                    name="camera"
                    placeholder="camera"
                    defaultValue={camera || ""}
                    className="border border-gray-400 bg-gray-200 focus:bg-white text-gray-900 appearance-none inline-block w-full border rounded py-3 px-4 focus:outline-none mb-2"
                />
                <input
                    type="text"
                    name="focalLength"
                    defaultValue={focalLength || ""}
                    placeholder="focalLength"
                    className="border border-gray-400 bg-gray-200 focus:bg-white text-gray-900 appearance-none inline-block w-full border rounded py-3 px-4 focus:outline-none mb-2"
                />
                <textarea
                    type="text"
                    name="desc"
                    placeholder="Beschrijving"
                    className="border border-gray-400 bg-gray-200 focus:bg-white text-gray-900 appearance-none inline-block w-full border rounded py-3 px-4 focus:outline-none mb-2"
                />
                <button className="block px-3 py- my-2 bg-blue-600 text-white rounded text-l">
                    Add
          </button>
            </form>
        );
    }
}