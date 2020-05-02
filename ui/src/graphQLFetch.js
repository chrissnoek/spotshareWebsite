
import { toast, ToastType } from 'react-toastify';
import fetch from 'isomorphic-fetch';

const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
    if (dateRegex.test(value)) return new Date(value);
    return value;
}

export default async function graphQLFetch(query, variables = {}, showError = null) {
    //console.log('query from graphQlFetch ' + query)
    const apiEndpoint = (__isBrowser__) // eslint-disable-line no-undef
        ? window.ENV.UI_API_ENDPOINT
        : process.env.UI_SERVER_API_ENDPOINT;
    try {
        const response = await fetch(apiEndpoint, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ query, variables })
        });
        const body = await response.text();
        const result = JSON.parse(body, jsonDateReviver);

        // alert the error message whenthe result is containing erros
        if (result.errors) {
            const error = result.errors[0];
            if (error.extensions.code == "BAD_USER_INPUT") {
                console.log(error);
                const details = error.extensions.exception.errors.join("\n ");
                toast.error(`${error.message}\n ${details}`);
            } else {
                toast.error(`${error.extensions.code}\n ${error.message}`);
            }
        }
        return result.data;
    } catch (e) {
        toast.error(`Error in sending data to server: ${e.message}`);
    }
}