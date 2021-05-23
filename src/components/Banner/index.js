import Login from '@/pages/User/Login';
import { filterImageUrl } from '@/utils/helper';
import './index.less';

const Banner = ({ isLogin, imgsInfo = {} }) => {
    return (
        <div className="wrapper">
            <video
                src="https://ik.imagekit.io/mrmiss/1621796269869_EtsurM5nz.mp4"
                muted="muted"
                autoplay="autoplay"
                loop
                style={{ width: '100%' }}
            >
                your browser does not support the video tag
            </video>
            {isLogin ? null : <Login />}
        </div>
    );
};

export default Banner;
