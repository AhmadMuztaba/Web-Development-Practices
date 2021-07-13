import React from 'react';
import {connect} from 'react-redux';


class Increment extends React.Component {
  render() {
    return (
      <div>
        {/* {this.props.count} */}
      </div>
    );
  }
}
const mapStateToProps=(state)=>{
    console.log(state);
   return{
     count:state,
   }
}

export default connect(mapStateToProps)(Increment);
