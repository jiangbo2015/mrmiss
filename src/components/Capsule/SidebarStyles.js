import { Box, Text } from 'rebass/styled-components';

const data = ['Beach Shorts', 'SWIMUITE ALL', 'SWIABC', 'DEFG'];

export default ({ data = [], selectedItem = {}, onSelect }) => {
    // const active = 1;
    return (
        <Box css={{ position: 'absolute', left: 20, top: 0 }}>
            {data.map((item, i) => (
                <Text
                    key={i}
                    css={{
                        fontSize: selectedItem._id === item._id ? '26px' : '22px',
                        color: selectedItem._id === item._id ? '#000' : '#5C5C5C',
                        padding: selectedItem._id === item._id ? '10px 0' : '4px 0',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        onSelect(item);
                    }}
                >
                    {item.namecn}
                </Text>
            ))}
        </Box>
    );
};
