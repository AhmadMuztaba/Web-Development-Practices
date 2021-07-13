import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import StreamCreate from './Stream/StreamCreate';
import StreamDelete from './Stream/StreamDelete';
import StreamList from './Stream/StreamList';
import StreamEdit from './Stream/StreamEdit';
import StreamShow from './Stream/StreamShow';
import history from '../history'
import Header from './Header';

const App = () => {
    return (<div className='ui container'>
        <Router history={history}>
            <Header />
            <Switch>
                <Route path='/' exact component={StreamList} />
                <Route path='/streams/new' exact component={StreamCreate} />
                <Route path='/streams/edit/:id' exact component={StreamEdit} />
                <Route path='/streams/delete/:id' exact component={StreamDelete} />
                <Route path='/streams/:id' exact component={StreamShow} />
            </Switch>
        </Router>
    </div>);
}
export default App;