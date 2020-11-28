import 'normalize.css';
import './index.less';

const Header = () => {
    return (
        <header className="header">
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
