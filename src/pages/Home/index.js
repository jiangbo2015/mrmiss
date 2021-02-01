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

const App = ({ dispatch, currentUser }) => {
    // const { currentUser } = props;
    useEffect(() => {
        dispatch({
            type: 'user/getCurrentUser',
        });
    }, []);
    return (
        <Layout>
            {/* <Login /> */}
            <Banner isLogin={currentUser.id ? true : false} />
            <Box bg="#fbf8fa" px="40px" py="40px">
                <Box mb="40px">
                    <Title
                        title="我们的胶囊"
                        subtitle="本季胶囊由mrmiss 2021限量胶囊系列-亲子家庭系列推出。 希望您可以在这里找到自己喜欢的产品。"
                    ></Title>
                </Box>
                <FeatureImage></FeatureImage>
                <Carousel></Carousel>
            </Box>
            <Box bg="#fff" px="40px" py="40px">
                {/* <div id="aboutas">aboutas</div> */}
                <Title
                    title="关于我们"
                    subtitle=" 我们有效地整合了流程，产品和客户的工作和需求，以设计创意，市场美学和差异化需求设计产品，我们专注于并制造产品。
                            "
                ></Title>
                <Box
                    mt="40px"
                    height="500px"
                    css={{
                        background: `url(${map}) no-repeat`,
                        backgroundSize: 'cover',
                    }}
                ></Box>
            </Box>
        </Layout>
    );
};

export default connect(({ user }) => ({ currentUser: user.info }))(App);
