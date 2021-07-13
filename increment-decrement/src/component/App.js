import React from 'react';
import {connect} from 'react-redux';
import {action} from '../action'

class App extends React.Component {
  render() {
    return (
      <div>
        <button onClick={()=>{this.props.action('increment')}}
        >
          Increment
          </button>
          <button onClick={()=>{this.props.action('decrement')}}
        >
          Decrement
          </button>
          <div>{this.props.coun.count}</div>
      </div>
    );
  }
}
const mapStateToProps=(state)=>{
   console.log(state);
   return{
    coun:state,
   }
}

export default connect(mapStateToProps,{action})(App);
