import React, { useRef } from 'react';
import styles from './index.less';
import { Modal, Input, Button, Upload } from 'antd';

export default ({ placeholder, style = {}, ...props }) => {
    const inputRef = useRef();
    return (
        // <div style={{ background: '#fff' }}>
        <Modal closable={false} mask={false} footer={false} className="mrmissPropmt" {...props}>
            <Input placeholder={placeholder} ref={inputRef} />
            <Upload></Upload>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={props.onCancel} className="madal-button">
                    取消
                </Button>
                <Button
                    className="madal-button"
                    onClick={() => {
                        props.onOk(inputRef.current.state.value);
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
