import React, { Component } from 'react';
import Joi from '@hapi/joi';
import Input from './Input.jsx';

class Form extends Component {
    state = {
        data: {},
        errors: {}
    }

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors }
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data, errors });
    }

    validate = () => {

        const options = { abortEarly: false };
        const schema = Joi.object({ ...this.schema });
        const { error } = schema.validate(this.state.data, options);
        if (!error) return null

        const errors = {};
        for (let item of error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors;
    }

    validateProperty = ({ name, value }) => {
        const object = { [name]: value }
        const schema = Joi.object({ [name]: this.schema[name] });
        const result = schema.validate(object);
        console.log(result)
        const error = result.error
        console.log('returning', error)
        return error ? error.details[0].message : null;
    }

    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.doSubmit();
    }

    renderButton(label) {
        return (
            <button
                className={"text-white font-bold py-2 px-4 rounded" + (this.validate() ? " bg-gray-500 hover:bg-gray-600" : " bg-blue-500 hover:bg-blue-600")}
                type="submit"
                disabled={this.validate()}>
                {label}
            </button>
        )

    }

    renderInput(name, label, placeholder, type = 'text', classes = 'w-full') {
        const { data, errors } = this.state;
        return (
            <Input
                classes={classes}
                name={name}
                label={label}
                value={data[name]}
                onChange={this.handleChange}
                placeholder={placeholder}
                error={errors[name]}
                type={type}
            />
        )
    }
}

export default Form;