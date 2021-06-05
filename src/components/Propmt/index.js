import React, { useRef, useState } from 'react';
// import styles from './index.less';
import { Modal, Input, Button, Upload } from 'antd';
import { uploadProps, Avatar, UploadBtn } from '@/components/UploadCom';

export default ({ placeholder, style = {}, ...props }) => {
    const inputRef = useRef();
    const [imgUrl, setImgUrl] = useState('');
    const [onLoad, setOnLoad] = useState(false);
    const beforeUpload = file => {
        const limit = file.size / 1024 < 300;
        if (!limit) {
            message.error('Image must smaller than 200K!');
        }
        return limit;
    };

    const handleAdd = info => {
        // console.log(info, 'info info info');
        setOnLoad(false);
        setImgUrl('');
        if (info.file.status === 'uploading') {
            setOnLoad(true);
            return;
        }
        if (info.file.status === 'done') {
            setOnLoad(false);
            setImgUrl(info.file.response.data.url);
        }
    };

    return (
        // <div style={{ background: '#fff' }}>
        <Modal closable={false} mask={false} footer={false} className="mrmissPropmt" {...props}>
            <Input placeholder={placeholder} ref={inputRef} />
            {/* <Upload {...uploadProps} beforeUpload={beforeUpload} onChange={handleAdd}>
                {imgUrl ? <Avatar src={imgUrl}></Avatar> : <UploadBtn type={onLoad ? 'loading' : 'plus'}></UploadBtn>}
            </Upload> */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={props.onCancel} className="madal-button">
                    取消
                </Button>
                <Button
                    className="madal-button"
                    onClick={() => {
                        props.onOk(inputRef.current.state.value, imgUrl);
                    }}
                    style={{
                        backgroundColor: '#323232',
                        marginLeft: '12px',
                    }}
                >
                    确认
                </Button>
            </div>
        </Modal>
        // </div>
    );
};
