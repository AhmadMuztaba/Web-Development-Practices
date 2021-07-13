import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut} from '../action';

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('auth2', async () => {
            this.auth2 = await window.gapi.auth2.init({
                client_id: '1068143565002-ho7qj2tk2b8vhojit5lrh4djisna0767.apps.googleusercontent.com',
            });
            this.onAuthchange(this.auth2.isSignedIn.get());
            this.auth2.isSignedIn.listen(this.onAuthchange)
        })
    }
    onAuthchange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth2.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }
    onSignIn = () => {
        this.auth2.signIn();
    }
    onSignOut = () => {
        this.auth2.signOut();
    }
    render() {
        if (this.props.isSignedIn === null) {
            return null;
        }
        else if (this.props.isSignedIn) {
            return (<button className='ui red google button' onClick={this.onSignOut}>
                <i className='google button' />
                Sign out</button>);
        }
        else {
            return (<button className='ui red google button' onClick={this.onSignIn}>
                <i className='google button' />
            Sign in with google</button>);
        };
    }
}
const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn
    }
}
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);