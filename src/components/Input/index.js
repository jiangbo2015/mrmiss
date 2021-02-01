// import './index.less';
import { Input } from 'antd';
import { Box } from 'rebass/styled-components';

export default Input;

export const InputBlackRaduis = props => (
    <Input style={{ background: '#323232', color: 'white', borderRadius: '16px' }} {...props} />
);
export const InputGrayRaduis = props => (
    <Input style={{ background: '#C8C8C8', color: 'white', borderRadius: '16px' }} {...props} />
);
export const InputGray = props => <Input style={{ background: '#C8C8C8', color: 'white' }} {...props} />;

export const InputBottomBorder = props => <Input style={{ border: 'none', borderBottom: '1px solid #000' }} {...props} />;

export const TextAreaBottomBorder = props => (
    <Input.TextArea style={{ border: 'none', borderBottom: '1px solid #000' }} {...props} />
);
