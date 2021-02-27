import searchIcon from '@/public/icons/icon-search.svg';
import { Input } from 'antd';
import { ReactSVG } from 'react-svg';
import './index.less';

export default ({ onSearch, placeholder = 'Search color', style = {}, mode = 'black', ...props }) => {
    return (
        // <div style={{ background: '#fff' }}>
        <Input
            onPressEnter={onSearch}
            enterButton={false}
            style={{ padding: '2px', fontSize: '12px !important', ...style }}
            className={mode === 'white' ? 'searchInputWhite' : 'searchInput'}
            placeholder={placeholder}
            prefix={<ReactSVG style={{ width: '28px', height: '28px' }} src={searchIcon} />}
            {...props}
        />

        // </div>
    );
};
