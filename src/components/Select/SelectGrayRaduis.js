import './index.less';
import { Select } from 'antd';
import { Box } from 'rebass/styled-components';

export default ({ onSearch, options, mode = 'default', style = {}, ...props }) => {
    return (
        <Box
            sx={{
                '.ant-select-selector': {
                    backgroundColor: '#DAD9D7 !important',
                    overflow: 'hidden',
                    borderRadius: '16px !important',
                },

                ...style,
            }}
        >
            <Select options={options} {...props} />
        </Box>
    );
};
