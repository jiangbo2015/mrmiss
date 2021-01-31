import { Box, Text } from 'rebass/styled-components';

const data = ['Beach Shorts', 'SWIMUITE ALL', 'SWIABC', 'DEFG'];

export default () => {
    const active = 1;
    return (
        <Box css={{ position: 'absolute', left: 20, top: 0 }}>
            {data.map((item, i) => (
                <Text
                    key={i}
                    css={{
                        fontSize: active === i ? '26px' : '24px',
                        color: active === i ? '#000' : '#5C5C5C',
                        cursor: 'pointer',
                    }}
                >
                    {item}
                </Text>
            ))}
        </Box>
    );
};
