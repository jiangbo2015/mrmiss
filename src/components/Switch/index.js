// import './index.less';
import { Switch } from 'antd';
import { Box } from 'rebass/styled-components';

export default ({
    onSearch,
    options,
    width = '72px',
    mode = 'default',
    ...props
}) => {
    return (
        <Box
            sx={{
                '.ant-switch-checked': {
                    backgroundColor: '#FDDB3B',
                    overflow: 'hidden',
                },
            }}
        >
            <Switch {...props} />
        </Box>
    );
};
