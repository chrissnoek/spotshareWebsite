let aboutMessage = "This is the about message";

const setMessage = (_, { message }) => {
    aboutMessage = message;
    return aboutMessage;
};

const getMessage = () => aboutMessage;

module.exports = { getMessage, setMessage }
