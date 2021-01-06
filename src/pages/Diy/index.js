import React from 'react';
import Layout from '@/components/Layout';
import DiyHeader from './DiyHeader';
import DiyMain from './DiyMain';

const App = props => {
    console.log('diy sssss');
    return (
        <Layout>
            <DiyHeader></DiyHeader>
            <DiyMain />
        </Layout>
    );
};

export default App;
