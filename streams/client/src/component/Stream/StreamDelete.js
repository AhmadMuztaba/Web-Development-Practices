import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream,deleteStream} from '../../action/index';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }
    renderActions() {
        return (
            <React.Fragment>
                <button onClick={()=>this.props.deleteStream(this.props.match.params.id)} className='ui button negative'>Delete</button>
                <Link to='/' className='ui button'>Cancel</Link>
            </React.Fragment>);
    }
    renderContent() {
        if (!this.props.stream) {
            return ("You sure want to delete?");
        } else {
            return (`You sure want to delete stream with title ${this.props.stream.title}`);
        }
    }
    render() {
        return (
            <Modal
                title='Stream Delete'
                content={this.renderContent()}
                action={this.renderActions()}
                onDismiss={() => history.push('/')}
            />
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id],
    }
}

export default connect(mapStateToProps, { fetchStream,deleteStream})(StreamDelete);