import { combineReducers } from 'redux';
const songsReducer=()=>{
    return[
        {title:'somebody',duration:'3:02'},
        {title:'tik-tok',duration:'2:48'},
        {title:'me ho na',duration:'4:56'},
        {title:'boom boom',duration:'3:29'},
    ]
}
const selectedSongReducer=(selectedSong=null,action)=>{
    if(action.type==='SONG_SELECTED'){
        return action.payload;
    }
    return selectedSong;
}
export default combineReducers({
    songs:songsReducer,
    selectedSong:selectedSongReducer,
});

