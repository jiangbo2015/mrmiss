import Banner from '@/components/Banner';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
// import Footer from '@/components/Footer';
// import map from '@/public/map.png';
// import mp4 from '@/public/imgs/08.mp4';
import { connect } from 'dva';
import { useIntl } from 'umi';
import { useEffect, useState } from 'react';
import { Box } from 'rebass/styled-components';
import Carousel from './Carousel';
import FeatureImage from './FeatureImage';

const App = ({ dispatch, currentUser, location, systemDetail }) => {
    // const { currentUser } = props;
    // // console.log('location', location);
    const intl = useIntl();
    const [openLogin, setOpenLogin] = useState(false);
    useEffect(() => {
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
        <Layout bg="#fbf8fa" setOpenLogin={setOpenLogin} isLogin={openLogin}>
            {/* <Login /> */}
            <Banner imgsInfo={systemDetail} />
            {/* <Box p="40px" maxWidth="1480px" m="auto">
                <Box mb="40px">
                    <Title
                        title={intl.formatMessage({
                            id: 'our_capsule',
                            defaultMessage: '我们的胶囊',
                        })}
                        subtitle={intl.formatMessage({
                            id: 'our_capsule_desc',
                            defaultMessage:
                                '本季胶囊由mrmiss 2021限量胶囊系列-亲子家庭系列推出。 希望您可以在这里找到自己喜欢的产品。',
                        })}
                    />
                </Box>
                <FeatureImage imgsInfo={systemDetail}></FeatureImage>
                <Carousel carousels={systemDetail.carousels}></Carousel>
            </Box> */}
            {/* <Box bg="#fff" px="40px" py="40px">
                <Box bg="#fff" maxWidth="1480px" m="auto">
                    <div id="aboutas">aboutas</div>
                    <Title
                        title={intl.formatMessage({
                            id: 'about_us',
                            defaultMessage: '关于我们',
                        })}
                        subtitle={intl.formatMessage({
                            id: 'about_us_desc',
                            defaultMessage:
                                '我们有效地整合了流程，产品和客户的工作和需求，以设计创意，市场美学和差异化需求设计产品，我们专注于并制造产品。',
                        })}
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
            </Box> */}
        </Layout>
    );
};

export default connect(({ user, home }) => ({ currentUser: user.info, systemDetail: home.systemDetail }))(App);
