import React from 'react';
import './SingleVideo.css';

const SingleVideo = (props) => {
    return (<div onClick={() => {
        props.onVideoSelect(props.video);
    }} className='singleVideo-item item'>
        <img className='ui image' alt={props.video.snippet.description} src={props.video.snippet.thumbnails.medium.url} />
        <div className='content'>
            <div className='header'>{props.video.snippet.title}
            </div>
        </div>
    </div>);
}
export default SingleVideo;