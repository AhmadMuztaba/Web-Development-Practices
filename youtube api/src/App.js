import React from 'react';
import youtube from './youtube';
import Input from './Input';
import Video from './Video';
import VideoShowing from './VideoShowing';

import './App.css';

class App extends React.Component {
  state = { videos: [], selectedVideo: null };
  componentDidMount(){
    this.search('cartoon');
  }
  search = async (search) => {
    let response = await youtube.get('/search', {
      params: {
        part: 'snippet',
        maxResults: 5,
        key: 'key',
        q: search,
      }
    });
    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0],
    });
  }
  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  }
  render() {
    return (<div className='ui container'>
      <Input type='text' search={this.search} />
      <div className='app'>
        <VideoShowing video={this.state.selectedVideo} />
        <Video vid={this.state.videos} onVideoSelect={this.onVideoSelect} />
      </div>
    </div>);
  }
}

export default App;
