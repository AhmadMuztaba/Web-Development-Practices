import React from 'react';
import './imageList.css';
import SingleImage from './SingleImage';

const Images=(props)=>{
    return(<div className="imag">
        {props.images.map((image)=>{
            return (<SingleImage key={image.id} image={image}/>);
        })}
       </div>
    );
}
export default Images;