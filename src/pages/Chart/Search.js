import { Button, Cascader, DatePicker } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { Box, Flex } from 'rebass/styled-components';

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

export default ({ handleSearch }) => {
    const [search, setSearch] = useState({
        range: null,
        cascader: null,
    });

    const onSearch = () => {
        if (!search.range) {
            return;
        }

        handleSearch({
            startDate: moment(search.range[0]).format('YYYY-MM-DD'),
            endDate: moment(search.range[1]).format('YYYY-MM-DD'),
        });
    };

    const onRangePickerChange = value => {
        setSearch({
            ...search,
            range: value,
        });
    };

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
            <Box mx="10px">
                <Cascader options={options} onChange={onCascadeChange} placeholder="Please select" />
            </Box>
            <Button onClick={onSearch}>搜索</Button>
        </Flex>
    );
};
