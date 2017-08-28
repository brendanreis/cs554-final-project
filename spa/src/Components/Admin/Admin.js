import React from 'react';
import {
    Switch,
    Route,
    Link
} from 'react-router-dom';
import StructureList from '../StructureList/StructureList';
import NewStructure from './NewStructure/NewStructure';
import NewEntry from './NewEntry/NewEntry';

class Admin extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <h3>Admin Panel</h3>
                    <nav>
                        <ul>
                            <li><Link to="/admin/structures">Structure List</Link></li>
                            <li><Link to="/admin/structures/new">Create Structure</Link></li>
                        </ul>
                    </nav>
                </div>
                <div>
                    <Switch>
                        <Route exact path="/admin/structures" render={() => <StructureList adminMode={true}/>}/>
                        <Route exact path="/admin/structures/:slug" component={NewStructure}/>
                        <Route path="/admin/structures/:slug/:entryslug" component={NewEntry}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Admin;