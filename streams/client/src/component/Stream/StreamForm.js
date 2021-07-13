import React from 'react';
import { Field, reduxForm, } from 'redux-form';

class StreamForm extends React.Component {
    renderError = ({ error, touched }) => {
        if (touched && error) {
            return (<div className='ui error message'>{error}</div>)
        }
    }
    renderInput = (propsForm) => {
        return (<div className='field'>
            <label>{propsForm.label}</label>
            <input {...propsForm.input} />
            {this.renderError(propsForm.meta)}</div>);
    }
    onSubmit = (Formvalue) => {
        this.props.onSubmit(Formvalue);
    };
    render() {
        return (<form
            onSubmit={this.props.handleSubmit(this.onSubmit)}
            className='ui form error'>
            <Field name='title' component={this.renderInput} label='Enter Title' />
            <Field name='description' component={this.renderInput} label='Enter Description' />
            <button className='ui button primary' type='submit'>Submit</button>
        </form>);
    }
}

const validate = (formValues) => {
    const error = {};
    if (!formValues.title) {
        error.title = 'you must enter a title';
    }
    if (!formValues.description) {
        error.description = 'you must enter a description';
    }
    return error;
}

export default reduxForm({
    form: 'StreamForm',
    validate: validate,
})(StreamForm);