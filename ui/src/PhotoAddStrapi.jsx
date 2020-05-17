/* globals React */
import React, { Component } from "react";
import graphQLFetch from './graphQLFetch.js';
import http from "./services/httpService";
import EXIF from 'exif-js'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';
import DateInput from "./DateInput.jsx";
import exifr from 'exifr';
var slugify = require('slugify');


export default class PhotoAddStrapi extends React.Component {
    constructor() {
        super();
        this.state = {
            photo: {},
            photoLoading: false,
            tempFile: null,
            onDrop: false,
            onDragOver: false,
            uploadPercentage: 0,
            invalidFields: {}
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.fileInput = React.createRef();
    }

    handleInputChange = e => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState((prevState) => {
            const stateFields = { ...prevState, photo: { ...prevState.photo, [name]: value } };
            const invalidFields = { ...prevState.invalidFields };
            if (this.state.photo.title && this.state.invalidFields.title) delete invalidFields['title'];
            stateFields['invalidFields'] = invalidFields;
            return stateFields;
        });

    };


    removeImage = () => {
        console.log('remove');
        this.setState({ tempFile: null, photo: {} })
    }


    async onFileChange(e) {

        const file = e.target.files[0];
        this.setState({ blob: file });

        if (file.size > 27000000) {
            this.setState((prevState) => ({
                ...prevState, invalidFields: { ...prevState.invalidFields, photoImage: 'Selecteer een afbeelding kleiner dan 27MB.' }
            }));
            return;
        } else {
            this.setState((prevState) => {
                const invalidFields = { ...prevState.invalidFields }
                if (invalidFields.hasOwnProperty("photoImage")) delete invalidFields['photoImage'];
                return { invalidFields };
            });
        }

        this.setState({
            photoLoading: true
        })

        var reader = new FileReader();
        reader.onload = () => {
            this.setState({ photoLoading: false, tempFile: URL.createObjectURL(file) });
        };
        reader.readAsDataURL(file);


        // TODO: extract lensmodel, and write location suggestion
        // let exifrGps = await exifr.gps(file);
        // let output = await exifr.parse(file, ['LensModel']);

        // if (exifrGps) {
        //     let { longitude, latitude } = exifrGps;
        //     // this.setsate and get nearby locations to suggest
        // }
        // if (output) {
        //     //this.setstate lensmodel (24-70mm) 
        // }



        if (file && file.name) {
            EXIF.getData(file, () => {
                let exifData = EXIF.pretty(file);
                if (exifData && EXIF.getTag(file, "ExposureTime") && EXIF.getTag(file, "ISOSpeedRatings") && EXIF.getTag(file, "FNumber")) {


                    let date = EXIF.getTag(file, "DateTime");
                    if (date) {
                        let splittedDate = EXIF.getTag(file, "DateTime").substr(0, 10).split(":");
                        const year = splittedDate[0];
                        const month = splittedDate[1];
                        const day = splittedDate[2];
                        let dateVal = `${year}-${month}-${day}`;

                        this.setState((prevState) => ({
                            ...prevState, photo: { ...prevState.photo, date: dateVal }
                        }));
                    }

                    console.log(exifData);

                    let shutterspeedVal = EXIF.getTag(file, "ExposureTime") > 1 ? EXIF.getTag(file, "ExposureTime") : '1/' + (1 / EXIF.getTag(file, "ExposureTime"));
                    let ISOVal = EXIF.getTag(file, "ISOSpeedRatings");
                    let apertureVal = EXIF.getTag(file, "FNumber").numerator / EXIF.getTag(file, "FNumber").denominator;
                    let focalLengthVal = EXIF.getTag(file, "FocalLength") + 'mm';
                    let cameraVal = EXIF.getTag(file, "Model");

                    this.setState((prevState) => ({
                        ...prevState, photo: { ...prevState.photo, shutterspeed: shutterspeedVal, iso: ISOVal, aperture: apertureVal, focalLength: focalLengthVal, camera: cameraVal }
                    }));

                } else {
                    this.setState((prevState) => ({
                        ...prevState, photo: { ...prevState.photo, date: '', shutterspeed: '', iso: '', aperture: '', focalLength: '', camera: '' }
                    }));
                }
            });
        } else {
            this.setState((prevState) => ({
                ...prevState, photo: { ...prevState.photo, date: '', shutterspeed: '', iso: '', aperture: '', focalLength: '', camera: '' }
            }));
        }
    }

    handleOnDrop = (e) => {
        console.log('handleOnDrop fired', e);
    }
    handleOnDragOver = (e) => {
        this.setState({ onDragOver: true });
    }
    handleOnDragLeave = (e) => {
        this.setState({ onDragOver: false });
    }

    checkForAvailableSlug = async (slug) => {
        let query = `query photoBySlug($slug: String!){
            photoBySlug(slug: $slug) {
                title
            }
        }`;

        const result = await graphQLFetch(query, { slug }, true);
        return result;
    }

    createSlug = async (slug, suffix) => {

        var result = await this.checkForAvailableSlug(slug);

        if (!result.photoBySlug) {
            // slug is available, proceed
            return slug;
        } else {
            // slug is not available, try again

            if (!suffix) {
                suffix = 1;
            } else {
                suffix++;
            }

            let adjustedSlug = slug + '-' + suffix;
            return this.createSlug(adjustedSlug, suffix);
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        e.persist();

        const { photoImage, title } = this.state.photo;

        // check if an image is given, and title, if not show error and return null;
        if (!photoImage || !title) {
            if (!photoImage) {

                this.setState((prevState) => ({
                    ...prevState, invalidFields: { ...prevState.invalidFields, photoImage: 'Voeg je nog een foto toe? 📸' }
                }));
            }
            if (!title) {
                this.setState((prevState) => ({
                    ...prevState, invalidFields: { ...prevState.invalidFields, title: 'Wat is de titel van je foto? 📸' }
                }));
            }
            return;
        }

        // Progress
        const options = {
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                // Do something with the progress details
                const progress = Math.floor(loaded / total * 100);
                if (progress < 100) {
                    this.setState({ uploadPercentage: progress });
                }
            },
        };


        // check if slug is available, if not, add number
        let slug = slugify(title, {
            replacement: '-',  // replace spaces with replacement character, defaults to `-`
            remove: undefined, // remove characters that match regex, defaults to `undefined`
            lower: true,      // convert to lower case, defaults to `false`
            strict: true,     // strip special characters except replacement, defaults to `false`
        })

        const createdSlug = await this.createSlug(slug);

        this.setState((prevState) => ({
            ...prevState, photo: { ...prevState.photo, slug: createdSlug, date: prevState.photo.date ? new Date(prevState.photo.date) : null }
        }));

        // if slug is available, add to the query and create photo page with info

        const query = `mutation CreatePhoto($input: createPhotoInput) {
            createPhoto(input: $input){
                photo{
                    title
                    desc
                    slug
                    date
                    brand
                    shutterspeed
                    iso
                    aperture
                    camera
                    focalLength
                    id
                }
            }
        }`;

        let input = {};
        input['data'] = this.state.photo;
        console.log(input);
        delete input.data.photoImage;

        const data = await graphQLFetch(query, { input }, true);


        if (data) {
            //after pages is created, use refId to upload files with xhr request
            console.log('photo created', data);

            const formData = new FormData();

            const uploadedFile = document.querySelector('#fileInput input').files[0];

            formData.append(`files`, uploadedFile, uploadedFile.name);
            formData.append('ref', 'photo');
            formData.append('field', 'photo');
            formData.append('refId', data.createPhoto.photo.id);

            const request = new XMLHttpRequest();
            request.open('POST', `http://localhost:1337/upload`);
            request.send(formData);

            // add photo to form data
            // refId = data.createPhoto.photo.id
            // field = photo
            // ref = Photo

            // const formElement = document.querySelector('form');

            // formElement.addEventListener('submit', e => {
            //     e.preventDefault();

            //     const request = new XMLHttpRequest();

            //     request.open('POST', '/upload');

            //     request.send(new FormData(formElement));

        } else {
            console.log('failed');
        }

        // UPLOADTING THE IMAGE
        // const { data: resources } = await http.post(
        //     window.ENV.UI_API_IMAGE_ENDPOINT,
        //     formData,
        //     options
        // );

        //0 = thumb, 1 == watermakrk 2 == original
        // const imageThumb =
        //     "https://dkotwt30gflnm.cloudfront.net/" +
        //     resources.transforms.find(elem => elem.id === "thumbnail").key;
        // const imageOriginal =
        //     "https://dkotwt30gflnm.cloudfront.net/" +
        //     resources.transforms.find(elem => elem.id === "original").key;
        // const imageWatermark =
        //     "https://dkotwt30gflnm.cloudfront.net/" +
        //     resources.transforms.find(elem => elem.id === "watermark").key;

        // const photo = {
        //     title: form.title.value,
        //     //place: form.place.value,
        //     date: form.date.value ? new Date(form.date.value).toISOString() : null,
        //     description: form.desc.value,
        //     shutterspeed: form.shutterspeed.value,
        //     iso: form.iso.value,
        //     aperture: form.aperture.value,
        //     images: {
        //         imageThumb,
        //         imageOriginal,
        //         imageWatermark
        //     }
        // };

        // // {
        // //     "input" :{
        // //       "data": {
        // //           "title": "Test"
        // //         }
        // //     }
        // //   }

        // const data = await graphQLFetch(query, { input }, true);
        // if (data) {


        //     // set the state to 100, once the photo is loaded
        //     this.setState({ uploadPercentage: 100 });

        //     //console.log(data.photoAdd.id);
        //     // if the query returns an id in data, the photo is created
        //     // redirect to created photo
        //     const { id } = data.photoAdd;
        //     const { history } = this.props;
        //     history.push({
        //         pathname: `/photos/${id}`
        //     })
        // }

    }

    render() {
        const { date, shutterspeed, iso, aperture, camera, focalLength } = this.state.photo;
        const { photoLoading, tempFile } = this.state;

        let showInputClass = "relative border-2 border-dashed rounded mb-2 p-4 text-center cursor-pointer hover:border-green-500";
        showInputClass += (!tempFile && !photoLoading) ? ' block' : ' hidden';
        showInputClass += (this.state.onDragOver && !this.state.invalidFields.photoImage) ? " border-green-400" : " border-gray-400";
        if (this.state.invalidFields.photoImage) showInputClass += " border-red-400";

        let btnClass = "block px-3 py- my-2 text-white rounded text-l";
        let disabled = this.state.uploadPercentage || Object.keys(this.state.invalidFields).length > 0;
        btnClass += disabled ? " bg-gray-400" : " bg-blue-600";

        return (
            <form
                name="photoAdd"
                encType="multipart/form-data"
                onSubmit={this.handleSubmit}
                onChange={this.handleInputChange}
                className="block py-3 px-4 border border-gray-300 rounded"
            >
                <h1 className="my-2 font-bold">Starpi Foto toevoegen</h1>
                {/* <input
                    type="text"
                    name="place"
                    placeholder="Plaats"
                    
                /> */}
                <div id="fileInput" className={showInputClass}>
                    <input
                        type="file"
                        name="photoImage"
                        ref={this.fileInput}
                        onChange={this.onFileChange}
                        onDrop={this.handleOnDrop}
                        onDragOver={this.handleOnDragOver}
                        onDragLeave={this.handleOnDragLeave}
                        className="absolute m-0 p-0 w-full h-full outline-none pointer opacity-0 top-0 left-0"
                    />
                    <p className="text-xl text-black font-semibold">Drag en drop een afbeelding</p>
                    <p className="text-base"> of <a href="#">selecteer</a> een bestand <span className="text-sm block text-gray-300"> (Hoge resolutie aangeraden, maximaal 27MB)</span></p>
                </div>
                <div className="text-red-500">{this.state.invalidFields.photoImage}</div>
                {photoLoading && <AiOutlineLoading3Quarters className="fill-current text-green-500" />}
                {tempFile &&
                    <div id="imagePreview" className="relative relative bg-gray-300 p-4 mb-2">

                        <div onClick={this.removeImage} className="border border-gray-600 rounded p-4 m-4 absolute top-0 right-0 cursor-pointer bg-black opacity-50 hover:opacity-100">
                            <FiTrash2 className="stroke-current text-gray-100" />
                        </div>
                        <img src={tempFile} id="output_image" className="max-w-full rounded mb-2" />
                    </div>
                }
                <input
                    type="text"
                    name="title"
                    placeholder="Titel"

                />
                <div className="text-red-500">{this.state.invalidFields.title}</div>
                <input
                    type="date"
                    name="date"
                    placeholder="Datum"
                    defaultValue={date || ""}

                />

                <div className="flex">

                    <div className="flex flex-wrap items-stretch w-full relative mb-2 mr-2">

                        <input
                            type="text"
                            name="shutterspeed"
                            placeholder="Sluitertijd"
                            defaultValue={shutterspeed || ""}
                            className="mb-0 flex-shrink flex-grow flex-auto  w-px flex-1 border h-10 border-gray-400 rounded rounded-r-none py-2 px-3 relative text-sm"
                        />
                        <div className="flex -mr-px">
                            <span className="flex items-center  bg-grey-lighter rounded rounded-l-none border border-l-0 border-gray-400 py-2 px-3 whitespace-no-wrap text-grey-dark text-sm">s</span>
                        </div>
                    </div>


                    <div className="flex flex-wrap items-stretch w-full relative mb-2 mr-2">

                        <div className="flex -mr-px">
                            <span className="flex items-center  bg-grey-lighter rounded rounded-r-none border border-r-0 border-gray-400 py-2 px-3 whitespace-no-wrap text-grey-dark text-sm">iso</span>
                        </div>
                        <input
                            type="text"
                            name="iso"
                            placeholder="iso"
                            defaultValue={iso || ""}
                            className="mb-0 flex-shrink flex-grow flex-auto  w-px flex-1 border h-10 border-gray-400 rounded rounded-l-none py-2 px-3 relative text-sm"
                        />
                    </div>

                    <div className="flex flex-wrap items-stretch w-full relative mb-2">

                        <div className="flex -mr-px">
                            <span className="flex items-center  bg-grey-lighter rounded rounded-r-none border border-r-0 border-gray-400 py-2 px-3 whitespace-no-wrap text-grey-dark text-sm">f/</span>
                        </div>
                        <input
                            type="text"
                            name="aperture"
                            placeholder="Diafragma"
                            defaultValue={aperture || ""}
                            className="mb-0 flex-shrink flex-grow flex-auto  w-px flex-1 border h-10 border-gray-400 rounded rounded-l-none py-2 px-3 relative text-sm"
                        />
                    </div>

                </div>
                <input
                    type="text"
                    name="camera"
                    placeholder="camera"
                    defaultValue={camera || ""}

                />
                <input
                    type="text"
                    name="focalLength"
                    defaultValue={focalLength || ""}
                    placeholder="focalLength"

                />
                <textarea
                    type="text"
                    name="desc"
                    placeholder="Beschrijving"

                />
                <button className={btnClass} disabled={disabled}>
                    Uploaden
                </button>

                <div className="shadow w-full bg-grey-light">
                    <div className="bg-blue-500 text-xs leading-none py-1 text-center text-white" style={{ width: this.state.uploadPercentage + '%' }}>{this.state.uploadPercentage + '%'}</div>
                </div>
            </form>
        );
    }
}