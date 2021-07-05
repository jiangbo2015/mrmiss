// Condiciones generales  Aviso legal Politica de cookies FAQ
import { Box, Flex, Text } from 'rebass/styled-components';

export default ({ title, subtitle }) => {
    // console.log(process);
    return (
        <Flex
            width={1}
            mx="auto"
            height="112px"
            bg="#000"
            alignItems="center"
            justifyContent="center"
            sx={{
                position: 'absolute',
                bottom: 0,
            }}
        >
            <Text fontSize="12px" textAlign="center" color="#fff" px="25px">
                ｜wework｜ commercial｜ © 2020 mrmiss desing studio | v{process.env.VERSION}
            </Text>
            <Text fontSize="12px" textAlign="center" color="#fff" px="25px">
                Condiciones generales Aviso legal Politica de cookies FAQ
            </Text>
        </Flex>
    );
};
