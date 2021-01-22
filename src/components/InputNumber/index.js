import './index.less';
// import searchIcon from '@/components/Propmt/node_modules/@/public/icons/icon-search.svg';
import { InputNumber } from 'antd';
import { ReactSVG } from 'react-svg';

export default ({ onSearch, placeholder = 'Search color', style = {} }) => {
    return (
        // <div style={{ background: '#fff' }}>
        <InputNumber
            style={{ padding: '2px', ...style }}
            className="mrmissInputNumber"
        />
        // </div>
    );
};
