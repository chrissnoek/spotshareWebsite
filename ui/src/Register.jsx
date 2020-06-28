import React from 'react';
import Joi from '@hapi/joi';
import Form from './Form.jsx';
import { NavLink } from 'react-router-dom';
import graphQLFetch from './graphQLFetch.js';

class RegisterForm extends Form {

    state = {
        data: {
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            username: ''
        },
        errors: {}
    }

    schema = {
        email: Joi.string().email({ tlds: { allow: false } })
            .required().messages({
                "string.empty": `Vul je je email nog even in? 😉`,
                "any.required": `Vul je je email nog even in? 😉`,
                "string.email": `Vul je een geldig adres in? 😉`
            }),
        password: Joi.string()
            .required().messages({
                "string.empty": `Vul je je wachtwoord nog even in? 😉`,
                "any.required": `Vul je je wachtwoord nog even in? 😉`
            }),
        firstname: Joi.string().required().messages({
            "string.empty": `Vul je je voornaam nog even in? 😉`,
            "any.required": `Vul je je voornaam nog even in? 😉`
        }),
        lastname: Joi.string().required().messages({
            "string.empty": `Vul je je achternaam nog even in? 😉`,
            "any.required": `Vul je je achternaam nog even in? 😉`
        }),
        username: Joi.string().regex(/^\S*$/).required().messages({
            "string.empty": `Vul je je gebruikersnaam nog even in? 😉`,
            "any.required": `Vul je je gebruikersnaam nog even in? 😉`,
            "string.pattern.base": "Gebruikersnaam kan geen spaties bevatten"
        }),
    }

    createUser = async () => {
        const query = `mutation register($input: UserInput!) {
            register(input: $input) {
                jwt
                user {
                  id
                  email
                  username
                }
            }
          } `;

        const { data } = this.state;

        let input = { ...data };
        input['role'] = '5eef1a60e3b96d29e2d1d1ac';

        console.log(input);

        const result = await graphQLFetch(query, { input }, true, true);
        if (result) {
            // user registered and getting JWT token!
            const { register } = result;
            const { jwt, user: { email, id, username } } = register;
            console.log(jwt, id, email, username);
            localStorage.setItem('token', jwt);
            this.props.history.push('/');
        }

    }

    doSubmit = () => {
        // call server

        // redirect user to homepage
        this.createUser();
    }

    render() {
        return (
            <div>
                <div className="m-6">
                    <form onSubmit={this.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col border">
                        <h1 className="font-bold text-xl text-green-500">Aanmelden bij Spotshare</h1>

                        <div className="flex">
                            {this.renderInput('firstname', 'Voornaam', 'Voornaam', 'text', 'w-1/2 mr-2')}
                            {this.renderInput('lastname', 'Achternaam', 'Achternaam', 'text', 'w-1/2')}
                        </div>

                        {this.renderInput('username', 'Gebruikersnaam', 'Gebruikersnaam')}
                        {this.renderInput('email', 'Email', 'Emailadres')}
                        {this.renderInput('password', 'Wachtwoord', 'Vul je wachtwoord in', 'password')}

                        <div className="flex items-center justify-between">
                            {this.renderButton('Kom bij de club!')}
                            <NavLink className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-600" to="/inloggen">Inloggen</NavLink>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default RegisterForm;