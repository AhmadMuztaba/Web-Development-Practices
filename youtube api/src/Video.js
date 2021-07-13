import React from 'react';
import SingleVideo from './SingleVideo';

class Video extends React.Component{
    render(){
    return (<div className='ui middle aligned divided list'>{this.props.vid.map((video)=>{
        return (<SingleVideo key={video.id.videoId} onVideoSelect={this.props.onVideoSelect} video={video}/>);
    })}</div>);
    }
}

export default Video;

