import Login from '@/pages/User/Login';
import gif1 from '@/public/imgs/1.gif';
import gif2 from '@/public/imgs/2.gif';
import gif3 from '@/public/imgs/3.gif';
import './index.less';

const Banner = () => {
    return (
        <div className="wrapper">
            <img className="banner" src={gif3} />
            <img className="banner" src={gif2} />
            <img className="banner" src={gif1} />
            <Login />
        </div>
    );
};

export default Banner;
