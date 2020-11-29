import { connect } from 'dva';

const App = props => {
    console.log(props);
    return <div>假如登录成功要跳转</div>;
};

export default connect(state => state)(App);
