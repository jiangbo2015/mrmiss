import './index.less';
import { Select } from 'antd';
import { Box } from 'rebass/styled-components';

export default ({
    onSearch,
    options,
    width = '62px',
    mode = 'default',
    style = {},
    ...props
}) => {
    return (
        <Box
            sx={{
                '.ant-select-selector': {
                    backgroundColor: '#DAD9D7 !important',
                    overflow: 'hidden',
                },
                '.ant-select-arrow': {
                    marginTop: 0,
                    top: 0,
                    right: 0,
                    width: '18px',
                    height: '100%',
                    background: '#212322',
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    '.ant-select-suffix': {
                        display: 'flex',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        svg: {
                            width: '8px',
                            height: '8px',
                        },
                    },
                },
                ...style,
            }}
        >
            <Select style={{ width }} options={options} {...props} />
            {/* <Flex
                flexDirection="column"
                justifyContent="space-between"
                p="1px"
                ml="4px"
                height="24px"
                sx={
                    mode === 'white'
                        ? {
                              '.st2-arrow': {
                                  fill: '#ffffff !important;',
                              },
                          }
                        : {}
                }
            >
                <ReactSVG
                    src={arrowIcon}
                    style={{
                        width: '6px',
                        height: '6px',
                        lineHeight: '6px',
                    }}
                />
                <ReactSVG
                    src={arrowIcon}
                    style={{
                        width: '6px',
                        height: '6px',
                        lineHeight: '6px',
                        transform: 'rotateZ(180deg)',
                    }}
                />
            </Flex> */}
        </Box>
    );
};
