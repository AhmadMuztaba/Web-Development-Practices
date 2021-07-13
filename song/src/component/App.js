import React from 'react';
import Songlist from './songlist';
import SongDetails from './SongDetails';
class App extends React.Component{
  render(){
      return(<div className='ui container grid'>
        <div className='ui row'>
          <div className='column eight wide'><Songlist /></div>
          <div className='column eight wide'><SongDetails/></div>
          </div>
      </div>);
  }
}
export default App;