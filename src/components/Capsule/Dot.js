import { Box } from 'rebass/styled-components';

// 背景色或者图片
export default ({ bg, size, src, ...props }) => {
    const bgProps = bg
        ? {
              background: bg,
          }
        : {
              background: `url(${src}) no-repeat`,
              backgroundSize: 'cover',
          };
    return (
        <Box
            css={{
                '&:hover': {
                    '.line': {
                        visibility: 'visible !important',
                    },
                },
            }}
        >
            <Box
                width={size || '24px'}
                height={size || '24px'}
                mx="5px"
                css={{
                    position: 'relative',
                    cursor: 'pointer',
                    borderRadius: '50%',
                    border: '1px solid #888',

                    ...bgProps,
                }}
                {...props}
            ></Box>
            <Box height="1px" width="20px" bg="#000" mx="auto" mt="5px" css={{ visibility: 'hidden' }} className="line"></Box>
        </Box>
    );
};
