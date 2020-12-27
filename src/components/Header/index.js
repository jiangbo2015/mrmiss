import 'normalize.css';
import './index.less';
import { useEffect, useState } from 'react';
const Header = () => {
    const [headBg, setHeadBg] = useState(false);
    useEffect(() => {
        window.onscroll = () => {
            let scrollTopPx = window.scrollY;
            if (scrollTopPx > 70 && !headBg) {
                setHeadBg(true);
            } else if (scrollTopPx <= 70) {
                setHeadBg(false);
            }
        };
    }, []);
    return (
        <header
            className="header"
            style={{ background: headBg ? '#fff' : 'rgba(0,0,0,0)' }}
        >
            <div style={{ display: 'flex' }}>
                <div className="menuItem">CN/EN</div>
                <div className="menuItem">关于我们</div>
                <div className="menuItem">联系我们</div>
            </div>
            <div>chart</div>
            <div style={{ display: 'flex' }}>
                <div className="menuItem">定制</div>
                <div className="menuItem">胶囊系列</div>
                <div className="menuItem">网店</div>
                <div className="menuItem">登录</div>
            </div>
        </header>
    );
};

export default Header;
