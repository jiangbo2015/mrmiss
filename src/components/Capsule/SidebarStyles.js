import { Box, Text } from 'rebass/styled-components';

const data = ['Beach Shorts', 'SWIMUITE ALL', 'SWIABC', 'DEFG'];

export default ({ data = [], selectedItem = {}, onSelect }) => {
    // const active = 1;
    return (
        // <Box css={{ position: 'absolute', left: 20, top: 0 }}>
        <ul>
            {data.map((item, i) => (
                <li key={`${i}-${item._id}`}>
                    <Text
                        css={{
                            fontSize: '18px',
                            color: selectedItem._id === item._id ? '#000' : '#5c5c5c99',
                            padding: '4px 0',
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            onSelect(item, item);
                        }}
                    >
                        {item.namecn}
                    </Text>
                    {selectedItem._id === item._id || (selectedItem.branch === item._id && Array.isArray(item.children))
                        ? item.children.map(c => (
                              <Text
                                  key={c._id}
                                  css={{
                                      fontSize: '14px',
                                      color: selectedItem._id === c._id ? '#000' : '#5c5c5c99',
                                      padding:  '4px 0',
                                      paddingLeft: '10px',
                                      cursor: 'pointer',
                                  }}
                                  onClick={() => {
                                      onSelect(item, c);
                                  }}
                              >
                                  -{c.namecn}
                              </Text>
                          ))
                        : null}
                </li>
            ))}
        </ul>
    );
};
