import { ReactSVG } from 'react-svg';
import { Box } from 'rebass/styled-components';
import AllIcon from '@/public/icons/icon-all.svg';

export default ({ selectAll, onSelectAll }) => {
    return (
        <Box
            bg="#000000"
            sx={{
                border: selectAll ? '1px solid #AFAFAF' : '1px solid #000',
                paddingBottom: '4px',
                borderRadius: '3px',
            }}
            onClick={() => {
                onSelectAll(!selectAll);
            }}
        >
            <ReactSVG
                src={AllIcon}
                style={{
                    width: '20px',
                    height: '16px',
                    padding: '0 4px',
                    opacity: selectAll ? 1 : 0.3,
                }}
            />
        </Box>
    );
};
