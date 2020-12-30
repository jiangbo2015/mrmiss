import { connect } from 'dva';
import { Box } from 'rebass/styled-components';
import Layout from '@/components/Layout';

const App = () => {
    return <Layout></Layout>;
};

export default connect()(App);
