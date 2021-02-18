import cat1 from '@/public/3.png';
import { Box, Flex } from 'rebass/styled-components';
import { Carousel } from 'antd';
import { filterImageUrl } from '@/utils/helper';

const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 4000,
    cssEase: 'linear',
};
export default ({ carousels = [], onSelect = () => {} }) => {
    let carouselUrls = [];
    if (carousels.length > 0 && carousels.length < 6) {
        while (carouselUrls.length < 6) {
            carouselUrls = [...carouselUrls, ...carousels];
        }
    }
    return (
        <Box py="60px">
            <Carousel {...settings}>
                {carouselUrls.map((x, i) => (
                    <Box width={0.18} p="5px">
                        <Box
                            onClick={() => {
                                onSelect(i % carousels.length);
                            }}
                            width={1}
                            height="300px"
                            key={i}
                            css={{
                                background: `url(${filterImageUrl(x)}) no-repeat`,
                                backgroundSize: 'cover',
                            }}
                        />
                    </Box>
                ))}
            </Carousel>
        </Box>
    );
};
