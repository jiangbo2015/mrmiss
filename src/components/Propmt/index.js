import React, { useRef } from 'react';
import './index.less';
import { Modal, Input, Button } from 'antd';

export default ({ placeholder, style = {}, ...props }) => {
    const inputRef = useRef();
    return (
        // <div style={{ background: '#fff' }}>
        <Modal
            style={{
                ...style,
            }}
            mask={false}
            footer={false}
            {...props}
        >
            <Input placeholder={placeholder} ref={inputRef} />
            <div style={{ display: 'flex' }}>
                <Button onClick={props.onCancel}>取消</Button>
                <Button
                    onClick={() => {
                        props.onOk(inputRef.current.state.value);
                    }}
                >
                    确认
                </Button>
            </div>
        </Modal>
        // </div>
    );
};
