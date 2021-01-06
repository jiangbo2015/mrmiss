import React, { useEffect } from 'react';

const ClassifyItem = ({ children, isSelected, ...props }) => (
    <div
        {...props}
        style={{
            padding: '8px 11px',
            cursor: 'pointer',
            color: isSelected ? '#fff' : 'inherit',
            fontSize: isSelected ? '19px' : 'inherit',
        }}
    >
        {children}
    </div>
);

const DiyHeader = props => {
    useEffect(() => {}, []);
    return (
        <div
            style={{
                marginTop: '74px',
                fontSize: '16px',
                background: '#323232',
                display: 'flex',
                width: '100%',
                height: '110px',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    color: '#7B7B7B',
                    alignItems: 'center',
                }}
            >
                <ClassifyItem>Italy</ClassifyItem>
                <ClassifyItem isSelected>Spain</ClassifyItem>
                <ClassifyItem>California</ClassifyItem>
            </div>
        </div>
    );
};

export default DiyHeader;
