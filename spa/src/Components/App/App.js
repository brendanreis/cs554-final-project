import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import './App.css';
import Home from '../Home/Home';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="App-header">
                        <h2>CS 554 - Web Programming II - Final Project</h2>
                        <nav>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                {/*<li><Link to="/users">Users</Link></li>*/}
                                {/*<li><Link to="/admin">Admin Panel</Link></li>*/}
                            </ul>
                        </nav>

                    </div>
                    <div className="App-body">
                        <Route exact path="/" component={Home} />
                        {/*<Route path="/users" component={Users} />*/}
                        {/*<Route path="/admin" component={Admin} />*/}
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
