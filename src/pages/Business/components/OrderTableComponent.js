import React from 'react';
import { Table } from 'antd';
import { Box } from 'rebass/styled-components';
const OrderTable = props => {
    return (
        <Box
            sx={{
                '.even': {
                    background: '#F3F3F3',
                },
                '.ant-table-row': {
                    textAlign: 'center',
                },
                '.ant-table-thead>tr>th': {
                    background: '#0E0E0E',
                    color: '#ffffff',
                    padding: '8px',
                    textAlign: 'center',
                },
            }}
        >
            <Table
                {...props}
                pagination={false}
                sticky
                rowClassName={(_, index) => (index % 2 === 1 ? 'odd' : 'even')}
            />
        </Box>
    );
};

export default OrderTable;
