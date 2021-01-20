import './index.less';
import searchIcon from '@/public/icons/icon-search.svg';
import { Modal } from 'antd';
import { ReactSVG } from 'react-svg';

export default ({ style = {}, ...props }) => {
    return (
        // <div style={{ background: '#fff' }}>
        <Modal
            style={{
                background: '#fff',
                padding: '2px',
                width: '100%',
                ...style,
            }}
            {...props}
        />
        // </div>
    );
};
