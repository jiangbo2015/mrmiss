import { Flex, Text } from 'rebass/styled-components';

export default ({ onLoadMore = () => {}, hasMore }) => (
    <Flex py="50px" justifyContent="center" alignItems="center">
        {hasMore ? (
            <Text onClick={onLoadMore} css={{ cursor: 'pointer' }}>
                MORE...
            </Text>
        ) : null}
    </Flex>
);
