import {combineReducers} from 'redux';
const count=(count=0,action)=>{
    if(action.type==='increment'){
        return (count+1);
    }
    else if(action.type==='decrement'){
        return (count-1);
    }
    return count;
}

export default combineReducers({
    count:count,
});

