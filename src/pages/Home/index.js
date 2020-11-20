import React from 'react';
import {connect} from 'dva'
import styles from './index.less';


const App = () => {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}

export default connect()(App)
