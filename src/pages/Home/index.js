import React from 'react';
import { connect } from 'dva';
// import { } from 'antd'
import styles from './index.less';
import Header from '../../components/Header';
import Banner from '../../components/Banner';

const App = () => {
    return (
        <div>
            <Header />
            <Banner />
        </div>
    );
};

export default connect()(App);
