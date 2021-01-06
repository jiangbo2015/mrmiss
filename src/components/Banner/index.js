import Login from '@/pages/User/Login';
import gif1 from '@/public/imgs/1.gif';
import gif2 from '@/public/imgs/2.gif';
import gif3 from '@/public/imgs/3.gif';
import './index.less';

const Banner = ({ isLogin }) => {
    return (
        <div className="wrapper">
            <img className="banner" src={gif3} />
            <img className="banner" src={gif2} />
            <img className="banner" src={gif1} />
            <img className="banner-vir" src={gif1} />
            {isLogin ? null : <Login />}
        </div>
    );
};

export default Banner;
