import { Box } from 'rebass/styled-components';

// 背景色或者图片
export default ({ bg, src, ...props }) => {
    const bgProps = bg
        ? {
              background: bg,
          }
        : {
              background: `url(${src}) no-repeat`,
          };
    return (
        <Box
            width={['18px', '23px']}
            height={['18px', '23px']}
            mx="5px"
            css={{ borderRadius: '50%', ...bgProps }}
            {...props}
        ></Box>
    );
};
