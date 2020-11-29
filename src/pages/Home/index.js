import Banner from '@/components/Banner';
import Layout from '@/components/Layout';
import Login from '@/pages/User/Login';
import { connect } from 'dva';
const App = props => {
    return (
        <Layout>
            <Login />
            <Banner />
        </Layout>
    );
};

export default connect()(App);
