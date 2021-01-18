import './index.less';
import arrowIcon from '@/public/icons/arrow.svg';
import { Select } from 'antd';
import { ReactSVG } from 'react-svg';

const { Option } = Select;
export default ({ onSearch, options, style = {}, ...props }) => {
    return (
        <div style={{ display: 'flex', ...style }}>
            <Select className="mrmissSelect" options={options} {...props} />
            <div
                style={{
                    display: 'flex',
                    marginLeft: '4px',
                    padding: '1px',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '22px',
                }}
            >
                <ReactSVG
                    src={arrowIcon}
                    style={{
                        width: '6px',
                        height: '6px',
                        lineHeight: '6px',
                    }}
                />
                <ReactSVG
                    src={arrowIcon}
                    style={{
                        width: '6px',
                        height: '6px',
                        lineHeight: '6px',
                        transform: 'rotateZ(180deg)',
                    }}
                />
            </div>
        </div>
    );
};
