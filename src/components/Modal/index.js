import './index.less';
// import searchIcon from '@/components/InputNumber/node_modules/@/components/Propmt/node_modules/@/public/icons/icon-search.svg';
import { Modal } from 'antd';
// import { ReactSVG } from 'react-svg';

export default ({ style = {}, ...props }) => {
    return (
        <Modal
            style={{
                background: '#fff',
                padding: '2px',
                width: '100%',
                ...style,
            }}
            {...props}
            destroyOnClose
        />
    );
};
