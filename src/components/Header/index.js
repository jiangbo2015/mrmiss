import React from 'react';

import styles from './index.less';

const Header = () => {
    return (
        <header className={styles.header}>
            <div style={{ display: 'flex' }}>
                <div className={styles.menuItem}>CN/EN</div>
                <div className={styles.menuItem}>关于我们</div>
                <div className={styles.menuItem}>联系我们</div>
            </div>
            <div>chart</div>
            <div style={{ display: 'flex' }}>
                <div className={styles.menuItem}>定制</div>
                <div className={styles.menuItem}>胶囊系列</div>
                <div className={styles.menuItem}>网店</div>
                <div className={styles.menuItem}>登录</div>
            </div>
        </header>
    );
};

export default Header;
