import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';
import Home from '../Home/Home';
import Users from '../Users/Users';
import Admin from '../Admin/Admin';
import StructureEntries from "../StructureEntries/StructureEntries";
import "./App.css";

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css"/>
                    <div className="App-header">
                        <h2>CS 554 - Web Programming II - Final Project</h2>
                        <nav>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/users">Users</Link></li>
                                <li><Link to="/admin">Admin Panel</Link></li>
                            </ul>
                        </nav>

                    </div>
                    <div className="App-body">
                        <Switch>>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/users" render={()=> <Users adminMode={false}/>}/>
                            <Route path="/admin" component={Admin} />
                            <Route path="/:structure" component={StructureEntries} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
