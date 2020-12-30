import cat1 from '@/public/3.png';
import { Box, Flex } from 'rebass/styled-components';
import { Carousel } from 'antd';
const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
};
export default () => (
    <Box py="60px">
        <Carousel {...settings}>
            {new Array(6).fill(0).map((x, i) => (
                <Box width={0.18} p="5px">
                    <Box
                        width={1}
                        height="300px"
                        key={i}
                        css={{
                            background: `url(${cat1}) no-repeat`,
                            backgroundSize: 'cover',
                        }}
                    ></Box>
                </Box>
            ))}
        </Carousel>
    </Box>
);
