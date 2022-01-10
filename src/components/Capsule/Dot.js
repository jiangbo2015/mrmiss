import { Box } from 'rebass/styled-components';

// 背景色或者图片
export default ({ bg, size, src, isSelect, circle, onClick = () => {}, ...props }) => {
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
            onClick={onClick}
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
                    border: circle ? '1px solid #888' : 'none',
                    ...bgProps,
                }}
                {...props}
            ></Box>
            <Box
                height="1px"
                width="20px"
                bg="#000"
                mx="auto"
                mt="5px"
                css={{ visibility: isSelect ? 'visible' : 'hidden' }}
                className="line"
            ></Box>
        </Box>
    );
};
