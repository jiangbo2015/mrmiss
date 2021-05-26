// import './index.less';
import { Input, Select } from 'antd';
import { Box } from 'rebass/styled-components';

export default Input;

export const InputBlackRaduis = props => (
    <Input style={{ background: '#323232', color: 'white', borderRadius: '16px' }} {...props} />
);
export const InputGrayRaduis = props => (
    <Input style={{ background: '#C8C8C8', color: 'white', borderRadius: '16px' }} {...props} />
);
export const InputGray = props => <Input {...props} style={{ background: '#C8C8C8', color: 'white', ...props.style }} />;

export const InputBottomBorder = props => <Input style={{ border: 'none', borderBottom: '1px solid #000' }} {...props} />;

export const InputBottomWhiteBorder = props => (
    <Input
        style={{
            border: 'none',
            borderBottom: '1px solid #fff',
            color: 'white',
            background: '#000',
            height: '18px',
            width: '50px',
            padding: '0',
            textAlign: 'center',
        }}
        {...props}
    />
);

export const TextAreaBottomBorder = props => (
    <Input.TextArea style={{ border: 'none', borderBottom: '1px solid #000' }} {...props} />
);

export const SelectGrayRaduis = props => (
    <Select style={{ background: '#C8C8C8', color: 'white', borderRadius: '16px' }} {...props} />
);
