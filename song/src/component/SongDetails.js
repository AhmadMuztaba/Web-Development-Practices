import React from 'react';
import {connect} from 'react-redux';

const SongDetails=(props)=>{
    if(!props.song){
        return(<div><h3>Select a song</h3></div>);
    }
return(<div>
    <h1>{props.song.title}</h1>
<p>{props.song.duration}</p>
    </div>);
}

const mapStateToProps=(state)=>{

return {song:state.selectedSong};
}

export default connect(mapStateToProps)(SongDetails);