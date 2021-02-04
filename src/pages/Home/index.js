import Banner from '@/components/Banner';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import Footer from '@/components/Footer';
import map from '@/public/map.png';
import { connect } from 'dva';
import { useEffect } from 'react';
import { Box } from 'rebass/styled-components';
import Carousel from './Carousel';
import FeatureImage from './FeatureImage';

const App = ({ dispatch, currentUser, location, systemDetail }) => {
    // const { currentUser } = props;
    console.log('location', location);
    useEffect(() => {
        dispatch({
            type: 'user/getCurrentUser',
        });
        dispatch({
            type: 'home/init',
        });
    }, []);
    useEffect(() => {
        if (location.hash === '#aboutas') {
            window.scrollTo(0, 1900);
        }
    }, [location.hash]);
    return (
        <Layout>
            {/* <Login /> */}
            <Banner isLogin={currentUser.id ? true : false} imgsInfo={systemDetail} />
            <Box bg="#fbf8fa" px="40px" py="40px">
                <Box mb="40px">
                    <Title
                        title="我们的胶囊"
                        subtitle="本季胶囊由mrmiss 2021限量胶囊系列-亲子家庭系列推出。 希望您可以在这里找到自己喜欢的产品。"
                    />
                </Box>
                <FeatureImage imgsInfo={systemDetail}></FeatureImage>
                <Carousel carousels={systemDetail.carousels}></Carousel>
            </Box>
            <Box bg="#fff" px="40px" py="40px">
                {/* <div id="aboutas">aboutas</div> */}
                <Title
                    title="关于我们"
                    subtitle=" 我们有效地整合了流程，产品和客户的工作和需求，以设计创意，市场美学和差异化需求设计产品，我们专注于并制造产品。"
                />
                <Box
                    mt="40px"
                    height="500px"
                    css={{
                        background: `url(${map}) no-repeat`,
                        backgroundSize: 'cover',
                    }}
                />
            </Box>
        </Layout>
    );
};

export default connect(({ user, home }) => ({ currentUser: user.info, systemDetail: home.systemDetail }))(App);
