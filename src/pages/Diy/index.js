import React from 'react';
import Layout from '@/components/Layout';
import DiyHeader from './DiyHeader';
import DiyMain from './DiyMain';
import Favorites from './Favorites/index';

const App = props => {
    console.log('diy sssss');
    return (
        <Layout headerBgColor="#191919">
            <DiyHeader></DiyHeader>
            <DiyMain />
            <Favorites />
        </Layout>
    );
};

export default App;
