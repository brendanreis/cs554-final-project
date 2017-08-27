import React from 'react';
import {
    Route,
    Link
} from 'react-router-dom';
import NewStructure from './NewStructure/NewStructure';

class Admin extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <h3>Admin Panel</h3>
                    <nav>
                        <ul>
                            <li><Link to="/admin/structures/new">Create Structure</Link></li>
                        </ul>
                    </nav>
                </div>
                <div>
                    <Route path="/admin/structures/:slug" component={NewStructure} />
                </div>
            </div>
        );
    }
}

export default Admin;