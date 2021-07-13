import JsonPlaceholder from '../api/JsonPlacehoder';
import axios from 'axios';
import _ from 'lodash';


export const fetchPostAndUser=()=>async(dispatch,getState)=>{
   await dispatch(fetchPost());
   const Userids=_.uniq(_.map(getState().posts,'userId'));
   console.log(Userids);
   Userids.forEach(id=>dispatch(fetchUser(id)));
}


export const fetchPost = () => {
    return async function (dispatch, getState) {
        const response = await JsonPlaceholder.get('/posts');
        dispatch({
            type: 'FETCH_POST',
            payload: response.data,
        })
    }
}

export const fetchUser = (id) =>async(dispatch) => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users/" + id);
    dispatch({
        type: 'FETCH_USER',
        payload: response.data,
    })
}



// export const fetchUser = id =>(dispatch) => {
//     _fetchUser(id, dispatch);
// }
// const _fetchUser = _.memoize(async(id, dispatch) => {
//     const response = await axios.get("https://jsonplaceholder.typicode.com/users/" + id);
//     dispatch({
//         type: 'FETCH_USER',
//         payload: response.data,
//     })
// })


