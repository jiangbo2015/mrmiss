import UserInfoFrom from '@/components/UserInfoFrom';
import { connect } from 'dva';

const UserInfo = ({ currentUser, dispatch }) => {
    const handleSubmit = async data => {
        await dispatch({
            type: 'user/update',
            payload: data,
        });
    };
    return <UserInfoFrom data={currentUser} onSumbit={handleSubmit} />;
};

export default connect(({ user }) => {
    // console.log('props', props);
    return {
        currentUser: user.info,
    };
})(UserInfo);
