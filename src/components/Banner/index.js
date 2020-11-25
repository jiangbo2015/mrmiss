import React from 'react';

import styles from './index.less';

import gif1 from '../../public/imgs/1.gif';
import gif2 from '../../public/imgs/2.gif';
import gif3 from '../../public/imgs/3.gif';
const Banner = () => {
    return (
        <div className={styles.wrapper}>
            <img className={styles.banner} src={gif3} />
            <img className={styles.banner} src={gif2} />
            <img className={styles.banner} src={gif1} />
        </div>
    );
};

export default Banner;
