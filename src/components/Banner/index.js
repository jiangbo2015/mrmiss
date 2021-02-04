import Login from '@/pages/User/Login';
import { filterImageUrl } from '@/utils/helper';
import './index.less';

const Banner = ({ isLogin, imgsInfo = {} }) => {
    return (
        <div className="wrapper">
            <img className="banner" src={filterImageUrl(imgsInfo.img3)} />
            <img className="banner" src={filterImageUrl(imgsInfo.img2)} />
            <img className="banner" src={filterImageUrl(imgsInfo.img1)} />
            <img className="banner-vir" src={filterImageUrl(imgsInfo.img1)} />
            {isLogin ? null : <Login />}
        </div>
    );
};

export default Banner;
