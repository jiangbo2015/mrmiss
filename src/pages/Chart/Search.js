import { Button, Cascader, DatePicker } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { Box, Flex } from 'rebass/styled-components';
import { useIntl } from 'umi';

const { RangePicker } = DatePicker;

const options = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];

export default ({ handleSearch,text }) => {
    const [search, setSearch] = useState({
        range: null,
        cascader: null,
    });

    const onSearch = () => {
        console.log('onSearch,', search.range);
        if (!search.range) {
            return;
        }
        console.log('onSearch,', search.range);
        handleSearch({
            startDate: moment(search.range[0]).format('YYYY-MM-DD'),
            endDate: moment(search.range[1]).format('YYYY-MM-DD'),
        });
    };

    const onRangePickerChange = value => {
        console.log('onRangePickerChange');
        setSearch({
            ...search,
            range: value,
        });
    };
    const { formatMessage } = useIntl()
    const onCascadeChange = value => {
        setSearch({
            ...search,
            cascader: value,
        });
    };

    return (
        <Flex mb="10px">
            <Box>
                <RangePicker onChange={onRangePickerChange} />
            </Box>
            {/* <Box mx="10px">
                <Cascader options={options} onChange={onCascadeChange} placeholder="Please select" />
            </Box> */}
            <Button onClick={onSearch}>{formatMessage({
                    id: 'search',
                    defaultMessage:  '搜索',
                })}</Button>
        </Flex>
    );
};
