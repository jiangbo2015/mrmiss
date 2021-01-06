import './index.less';
import searchIcon from '@/public/icons/icon-search.svg';
import { Input } from 'antd';
import { ReactSVG } from 'react-svg';
export default ({ onSearch }) => {
    return (
        // <div style={{ background: '#fff' }}>
        <Input
            style={{ padding: '2px' }}
            className="searchInput"
            placeholder="Search color"
            prefix={
                <ReactSVG
                    style={{ width: '28px', height: '28px' }}
                    src={searchIcon}
                />
            }
        />
        // </div>
    );
};
