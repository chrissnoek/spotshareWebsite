import React, { Component } from 'react';

function displayFormat(date) {
    return (date != null) ? date.toDateString() : '';
}

function editFormat(date) {
    // to ISOString returns 2011-10-05T14:48:00.000Z, and we only want to have first 10 characters
    return (date != null) ? date.toISOString().substr(0, 10) : '';
}

function unformat(str) {
    // we want to store a correct Date format in db
    const val = new Date(str);
    // check if the number (val) is a valid number and return the value
    return Number.isNaN(val.getTime()) ? null : val;
}

class DateInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: editFormat(props.value),
            focused: false,
            valid: true
        }
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onFocus() {
        this.setState({ focused: true });
    }

    onBlur(e) {
        // get the input value and oldValid from state
        const { value, valid: oldValid } = this.state;

        // get the functions from parent
        const { onValidityChange, onChange } = this.props;

        // get date in javascript-readable Format
        const dateValue = unformat(value);

        // valid is if value is empty string, or dateValue is not null
        const valid = value === "" || dateValue != null;

        // if the valid state changed, the function is called with current event and valid property
        if (valid !== oldValid && onValidityChange) {
            onValidityChange(e, valid);
        }
        // set own state with new info
        this.setState({ focused: false, valid });

        // change the parents state value if the form is valid
        if (valid) onChange(e, dateValue);
    }

    onChange(e) {
        if (e.target.value.match(/^[\d-]*$/)) {
            this.setState({ value: e.target.value });
        }
    }

    render() {
        const { valid, focused, value } = this.state;
        const { value: origValue, name } = this.props;
        const className = (!valid && !focused) ? 'invalid' : null;
        const displayValue = (focused || !valid) ? value : displayFormat(origValue);
        return (
            <input
                type="text"
                size={20}
                name={name}
                className={className}
                value={displayValue}
                placeholder={focused ? 'yyyy-mm-dd' : null}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onChange={this.onChange}
            />
        );
    }
}

export default DateInput;