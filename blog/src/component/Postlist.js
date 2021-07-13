import React from 'react';
import { connect } from 'react-redux';
import {fetchPostAndUser } from '../actions';
import UserHeader from './UserHeader';

class Postlist extends React.Component {
    componentDidMount() {
        this.props.fetchPostAndUser();
    }
    renderList() {
        return (this.props.posts.map((item)=> {
            return (
                <div className='item' key={item.id}>
                    <i className='large middle aligned icon user' />
                    <div className='content'>
                        <div className='description'>
                            <h2>{item.title}</h2>
                            <p>{item.body}</p>
                        </div>
                        <UserHeader userId={item.userId}/>   
                    </div>
                </div>
            );
        }));
    }

    render() {
    return (<div className='ui relaxed divided list'>{this.renderList()}</div>);
    }
}
const mapStateToProps = (state) => {
    return { posts: state.posts };
}
export default connect(mapStateToProps, { fetchPostAndUser })(Postlist);