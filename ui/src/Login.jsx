import React from 'react';
import Joi from '@hapi/joi';
import Form from './Form.jsx';
import { NavLink } from 'react-router-dom';
import graphQLFetch from './graphQLFetch.js';

class LoginForm extends Form {
    state = {
        data: {
            email: '',
            password: ''
        },
        errors: {}
    }

    schema = {
        email: Joi.string().email({ tlds: { allow: false } })
            .required().messages({
                "string.empty": `Vul je je email nog even in? 😉.`,
                "any.required": `Vul je je email nog even in? 😉.`,
                "string.email": `Vul je een geldig adres in? 😉.`
            }),
        password: Joi.string()
            .required().messages({
                "string.empty": `Vul je je wachtwoord nog even in? 😉.`,
                "any.required": `Vul je je wachtwoord nog even in? 😉.`
            })
    };

    loginUser = async () => {
        const query = `mutation login($input: UsersPermissionsLoginInput!) {
            login(input: $input) {
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

        Object.defineProperty(input, "identifier", Object.getOwnPropertyDescriptor(input, "email"));
        delete input["email"];

        console.log(input);

        const result = await graphQLFetch(query, { input }, true, true);
        if (result) {
            if (result.errors) {
                const error = result.errors[0];
                // Error, email or password wrong
                console.log(error);

            } else {
                // user logged in!
                const { login } = result;
                const { jwt, user: { email, id, username } } = login;
                console.log(jwt, id, email, username);
                localStorage.setItem('token', jwt);
                this.props.history.push('/');
            }
        }
    }

    doSubmit = () => {
        // call server
        // redirect user to homepage
        console.log('submitted');
        this.loginUser();
    }

    render() {
        return (
            <div>
                <div className="m-6">
                    <form onSubmit={this.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col border">
                        <h1 className="font-bold text-xl text-green-500">Inloggen bij Spotshare</h1>

                        {this.renderInput('email', 'Email', 'Emailadres')}
                        {this.renderInput('password', 'Wachtwoord', 'Vul je wachtwoord in', 'password')}


                        <div className="flex items-center justify-between">
                            {this.renderButton('Log in')}
                            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-600" href="#">
                                Wachtwoord vergeten?
                            </a> |
                            <NavLink className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-600" to="/aanmelden">Aanmelden</NavLink>
                        </div>
                    </form>
                </div>
            </div >
        );
    }
}

export default LoginForm;