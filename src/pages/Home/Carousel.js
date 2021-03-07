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
    let filterUrls = carousels.filter(x => !!x);
    if (filterUrls.length > 0 && filterUrls.length < 6) {
        while (carouselUrls.length < 6) {
            carouselUrls = [...carouselUrls, ...filterUrls];
        }
    }
    return (
        <Box py="30px">
            <Carousel {...settings}>
                {carouselUrls.map((x, i) => (
                    <Box width="264px" p="7px">
                        <Box
                            onClick={() => {
                                onSelect(i % filterUrls.length);
                            }}
                            width={1}
                            height="280px"
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
