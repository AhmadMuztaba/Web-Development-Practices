import React from 'react';
import { createStream } from '../../action';
import { connect } from 'react-redux';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {
    onSubmit = (Formvalue) => {
        this.props.createStream(Formvalue);
    };
    render() {
        return (<div>
            <h1>StreamCreate</h1>
            <StreamForm onSubmit={this.onSubmit}/>
        </div>);
    }
}

export default connect(null, {
    createStream
})(StreamCreate);