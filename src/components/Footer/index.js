// Condiciones generales  Aviso legal Politica de cookies FAQ
import { Box, Flex, Text } from 'rebass/styled-components';

export default ({ title, subtitle }) => (
    <Flex
        width={1}
        mx="auto"
        height="112px"
        bg="#000"
        alignItems="center"
        justifyContent="center"
    >
        <Text fontSize="12px" textAlign="center" color="#fff" px="25px">
            ｜wework｜ commercial｜ © 2020 mrmiss desing studio{' '}
        </Text>
        <Text fontSize="12px" textAlign="center" color="#fff" px="25px">
            Condiciones generales Aviso legal Politica de cookies FAQ
        </Text>
    </Flex>
);
