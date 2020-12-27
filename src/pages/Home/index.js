import Banner from '@/components/Banner';
import Layout from '@/components/Layout';
import { connect } from 'dva';
import Title from '@/components/Title';
const App = props => {
    return (
        <Layout>
            {/* <Login /> */}
            <Banner />
            <div>
                <Title
                    title="Our capsule"
                    subtitle="This season's capsule is launched by mrmiss 2021 limited capsule series-parent-child family series. I hope you can find your favorite products here.."
                ></Title>
            </div>
        </Layout>
    );
};

export default connect()(App);
