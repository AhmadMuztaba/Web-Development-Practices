import React from 'react';

class SingleImage extends React.Component{
    constructor(props){
        super(props);
        this.state={span:0}
        this.ImageRef=React.createRef();
    }
    componentDidMount(){
        this.ImageRef.current.addEventListener('load',()=>{
           let height=this.ImageRef.current.clientHeight;
           height=Math.ceil(height/10);
           this.setState({span:height});
        })
    }
        render(){
            return(<div style={{gridRowEnd:`span ${this.state.span}`}}>
            <img ref={this.ImageRef} key={this.props.image.id} alt={this.props.image.description} src={this.props.image.urls.regular}
            />
            </div>
            );
        }
    }

export default SingleImage;