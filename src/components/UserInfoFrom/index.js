import React, { useEffect } from 'react';
import { Flex, Box } from 'rebass/styled-components';

import { Form, Col, Row, Radio, Tabs, Button, message } from 'antd';
import Input, { InputBlackRaduis, InputGray, InputGrayRaduis } from '@/components/Input';
import SelectGrayRaduis from '@/components/Select/SelectGrayRaduis';

const { TabPane } = Tabs;

const UserInfoForm = ({ data, onSumbit }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        console.log('data', data);
        if (data) {
            form.setFieldsValue({
                ...data,
            });
        }
    }, [data]);
    const onFinish = () => {
        form.validateFields().then(async (values, error) => {
            console.log(values);

            if (onSumbit) {
                await onSumbit({ ...values, _id: data._id });
            }

            message.info('发送成功');
            // form.resetFields();
        });
    };
    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row gutter={24}>
                <Col span={7}>
                    <Form.Item label="账号" name="account">
                        <InputBlackRaduis disabled />
                    </Form.Item>
                    <Form.Item label="名称" name="name">
                        <InputBlackRaduis />
                    </Form.Item>
                    <Form.Item label="增值税号码" name="VATNo">
                        <InputBlackRaduis />
                    </Form.Item>
                    <Form.Item label="所属商业代理" name="businessAgent">
                        <InputBlackRaduis />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label="公司全名" name="companyFullName">
                        <InputGray />
                    </Form.Item>
                    <Form.Item label="联系人" name="contact">
                        <InputGray />
                    </Form.Item>
                    <Form.Item label="联系电话" name="phone">
                        <InputGray />
                    </Form.Item>
                    <Form.Item label="手机号码" name="telephone">
                        <InputGray />
                    </Form.Item>
                    <Form.Item label="电子邮件地址" name="email">
                        <InputGray />
                    </Form.Item>
                    <Form.Item label="网站" name="webside">
                        <InputGray />
                    </Form.Item>
                    <Form.Item name="type">
                        <Radio.Group>
                            <Radio value={1}>零售店</Radio>
                            <Radio value={2}>百货</Radio>
                            <Radio value={3}>连锁店</Radio>
                            <Radio value={4}>网店</Radio>
                            <Radio value={5}>其它</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                <Col span={9}>
                    <Box
                        width={1}
                        sx={{
                            '.ant-tabs-nav-list': {
                                width: '100%',
                            },
                            '.ant-tabs-tab': {
                                width: '50%',
                                textAlign: 'center',
                                margin: 0,
                                justifyContent: 'center',
                            },

                            '.ant-tabs-content-holder': {
                                padding: '0 12px',
                            },
                            '.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn': {
                                color: '#ffffff',
                            },
                        }}
                    >
                        <Tabs
                            defaultActiveKey="1"
                            style={{ background: '#C8C8C8' }}
                            tabBarStyle={{ background: '#323232', color: 'white' }}
                        >
                            <TabPane tab="公司地址" key="1" forceRender={true}>
                                <Form.Item label="地址1" name="companyAddress1">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="地址2" name="companyAddress2">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="市" name="companyCity">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="邮编" name="companyPostcode">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="国家" name="companyCountry">
                                    <Input />
                                </Form.Item>
                            </TabPane>
                            <TabPane tab="托运地址" key="2" forceRender={true}>
                                <Form.Item label="地址1" name="shippingAddress1">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="地址2" name="shippingAddress2">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="市" name="shippingCity">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="邮编" name="shippingPostcode">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="国家" name="shippingCountry">
                                    <Input />
                                </Form.Item>
                            </TabPane>
                        </Tabs>
                    </Box>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={6}>
                    <Form.Item label="货币类型" name="currency">
                        <SelectGrayRaduis
                            options={[
                                { label: '人民币', value: 0 },
                                { label: '美元', value: 1 },
                                { label: '欧元', value: 2 },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item label="支付方式" name="payType">
                        <InputGrayRaduis />
                    </Form.Item>
                </Col>
                <Col span={1}></Col>

                <Col span={17}>
                    <Form.Item label="银行账号" name="bankAccount">
                        <InputGrayRaduis />
                    </Form.Item>
                    <Form.Item label="备注" name="remark">
                        <InputGrayRaduis />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        保存设置
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );
};
export default UserInfoForm;
