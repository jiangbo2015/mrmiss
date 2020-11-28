import Login from '@/pages/User/Login';
import { connect } from 'dva';

const App = props => {
    console.log(process.env.API_URL);
    // console.log(object)
    console.log(props, 'app');
    return (
        <div>
            {/* <Header /> */}
            <Login history={props.history} />
            {/* <Banner /> */}
        </div>
    );
};

export default connect()(App);
