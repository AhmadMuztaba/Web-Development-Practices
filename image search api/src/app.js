import React from 'react';
import Input from './components/Form';
import Images from './components/Images';
import unsplash from './Api/usplash';
class App extends React.Component {
    state={images:[]};
   onSearchSubmit=async(term)=>{
        const response=await unsplash.get('/search/photos',{
            params:{
                query:term
            },
           
        });
        this.setState({images:response.data.results})
    }
    render() {
        return (<div className='ui container'>
            <Input type='text' name='text' 
            placeholder="type name" 
            id='name' 
            onSubmit={this.onSearchSubmit}  />
            <h2>Found:{this.state.images.length} images</h2>
            <Images images={this.state.images}/>
        </div>
        );

    }
}
export default App;