import React from 'react';
import Layout from '@/components/Layout';
import DiyHeader from './DiyHeader';
import DiyMain from './DiyMain';
import Favorites from './Favorites/index';
import { connect } from 'dva';

const App = ({ currentAdminChannel = {} }) => {
    // console.log('diy sssss');
    return (
        <Layout headerBgColor="#191919">
            <DiyHeader></DiyHeader>
            <DiyMain />
            {currentAdminChannel.codename === 'A' ? <Favorites /> : null}
        </Layout>
    );
};

export default connect(({ channel = {} }) => ({
    currentAdminChannel: channel.currentAdminChannel,
}))(App);
