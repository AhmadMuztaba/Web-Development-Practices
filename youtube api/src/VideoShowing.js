import React from 'react';
const VideoShowing=({video})=>{
    if(!video){
        return(<div>Loading</div>)
    }
    if(video){
    return(
    <div className='ui segment'>
        <div className='ui embed'>
            <iframe title='video player'src={`https://www.youtube.com/embed/${video.id.videoId}`}/>
        </div>
        <h4>{video.snippet.title}</h4>
        <p>{video.snippet.description}</p>
    </div>
    );}
}

export default VideoShowing;