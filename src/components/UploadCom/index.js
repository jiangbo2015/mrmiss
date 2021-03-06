import React from 'react';
import { filterImageUrl } from '@/utils/helper';
import { Upload, Icon } from 'antd';

export const Avatar = ({ src, onLoad }) => (
    <img src={`${filterImageUrl(src)}`} alt="avatar" style={{ width: '100%' }} onLoad={onLoad} />
);

export const uploadProps = {
    name: 'file',
    listType: 'picture-card',
    showUploadList: false,
    action: `/api/common/uploadkit`,
};

export const UploadBtn = ({ type }) => (
    <div>
        <Icon type={type} />
        <div className="ant-upload-text">Upload</div>
    </div>
);

const UploadCom = ({ type, isPlain, handleChange, selectedPlainColor, selectedFlowerColor }) => {
    // console.log(type, typeProps[type]);
    const selected = isPlain ? selectedPlainColor : selectedFlowerColor;
    return (
        <Upload
            {...uploadProps}
            onChange={info => {
                handleChange(info, type, isPlain);
            }}
        >
            {selected[type] ? (
                <Avatar src={`${selected[type]}`}></Avatar>
            ) : (
                <UploadBtn type={selected.utype === type && selected.loading ? 'loading' : 'plus'}></UploadBtn>
            )}
        </Upload>
    );
};

export default UploadCom;
