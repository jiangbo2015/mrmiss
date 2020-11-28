import { connect } from 'dva';

const App = props => {
    console.log(props);
    return <div>User</div>;
};

export default connect(state => state)(App);
