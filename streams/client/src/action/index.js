import{SIGN_IN,SIGN_OUT,CREATE_STREAM,FETCH_STREAMS,FETCH_STREAM,DELETE_STREAM,EDIT_STREAM} from './type';
import history from '../history';
import Streams from '../api/Streams';
export const signIn=(id)=>{
    return{
        type:SIGN_IN,
        payload:id
    }
}
export const signOut=()=>{
    return{
        type:SIGN_OUT
    }
}
export const createStream=(FormsValue)=>{
    return(
      async(dispatch,getState)=>{
          const {userId}=getState().auth;
      const response=await Streams.post('/streams',{...FormsValue,userId});
      dispatch({
          type:CREATE_STREAM,
          payload:response.data,
      });
      history.push('/');
        }
       
    )
}


export const fetchStreams=()=>{
    return(
        async(dispatch)=>{
            const response=await Streams.get('/streams');
            dispatch({
                type:FETCH_STREAMS,
                payload:response.data,
            })
        }       
    )
}


export const fetchStream=(id)=>{
    return(
        async(dispatch)=>{
            const response=await Streams.get(`/streams/${id}`);
            dispatch({
                type:FETCH_STREAM,
                payload:response.data,
            });  
        }       
    )
}

export const editStream=(id,FormsValue)=>async (dispatch)=>{
            const response=await Streams.patch(`/streams/${id}`,FormsValue);
            dispatch({
                type:EDIT_STREAM,
                payload:response.data,
            });
            history.push('/');
}

export const deleteStream=(id)=>{
    return(
        async(dispatch)=>{
            await Streams.delete(`/streams/${id}`);
            dispatch({
                type:DELETE_STREAM,
                payload:id,
            });
            history.push('/');
        }       
    )
}
