import './index.less';
import arrowIcon from '@/public/icons/arrow.svg';
import { Select } from 'antd';
import { ReactSVG } from 'react-svg';
import { Flex } from 'rebass/styled-components';

const { Option } = Select;
export default ({
    onSearch,
    options,
    width,
    mode = 'default',
    style = {},
    ...props
}) => {
    return (
        <div style={{ display: 'flex', ...style }}>
            <Select
                style={{ width }}
                className={
                    mode === 'white' ? 'mrmissSelectWhite' : 'mrmissSelect'
                }
                options={options}
                {...props}
            />
            <Flex
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
            </Flex>
        </div>
    );
};
