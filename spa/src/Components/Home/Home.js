import React from 'react';
import StructureList from '../StructureList/StructureList';

class Home extends React.Component {
    render() {
        return (
            <StructureList adminMode={false} />
        );
    }
}

export default Home;