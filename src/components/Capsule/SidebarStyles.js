import { Box, Text } from 'rebass/styled-components';

const data = ['Beach Shorts', 'SWIMUITE ALL', 'SWIABC', 'DEFG'];

export default ({ data = [], selectedItem = {}, onSelect }) => {
    // const active = 1;
    return (
        <Box css={{ position: 'absolute', left: 20, top: 0 }}>
            {data.map((item, i) => (
                <Box>
                    <Text
                        key={i}
                        css={{
                            fontSize: selectedItem._id === item._id ? '20px' : '18px',
                            color: selectedItem._id === item._id ? '#000' : '#5c5c5c99',
                            padding: selectedItem._id === item._id ? '10px 0' : '4px 0',
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            onSelect(item, item);
                        }}
                    >
                        {item.namecn}
                    </Text>
                    {Array.isArray(item.children)
                        ? item.children.map(c => (
                              <Text
                                  key={i}
                                  css={{
                                      fontSize: selectedItem._id === c._id ? '18px' : '16px',
                                      color: selectedItem._id === c._id ? '#000' : '#5c5c5c99',
                                      padding: selectedItem._id === c._id ? '10px 0' : '4px 0',
                                      cursor: 'pointer',
                                  }}
                                  onClick={() => {
                                      onSelect(item, c);
                                  }}
                              >
                                  {item.namecn}-{c.namecn}
                              </Text>
                          ))
                        : null}
                </Box>
            ))}
        </Box>
    );
};
