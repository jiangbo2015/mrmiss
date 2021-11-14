import Input, { InputBlackRaduis, InputGray, InputGrayRaduis } from '@/components/Input';
import SelectGrayRaduis from '@/components/Select/SelectGrayRaduis';
import { Badge, Button, Col, Form, Radio, Row, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { Box } from 'rebass/styled-components';
import { useIntl } from 'umi';

const { TabPane } = Tabs;

const UserInfoForm = ({ data, onSumbit, isAdd, role }) => {
    const [form] = Form.useForm();
    const intl = useIntl();
    const [showChange, setShowChange] = useState(false);
    useEffect(() => {
        // console.log('data', data);
        if (data) {
            form.setFieldsValue({
                ...data,
            });
        }
    }, [data]);
    const onFinish = () => {
        form.validateFields().then(async (values, error) => {
            // console.log(values);

            if (onSumbit) {
                if (data?._id) {
                    await onSumbit({ ...values, _id: data._id });
                } else {
                    await onSumbit({ ...values });
                }
            }

            // message.info('提及成功');
            // form.resetFields();
        });
    };
    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onChange={() => {
                setShowChange(true);
            }}
        >
            <Row gutter={24}>
                <Col span={7}>
                    <Form.Item
                        label={intl.formatMessage({
                            id: 'account',
                            defaultMessage: '账号',
                        })}
                        name="account"
                    >
                        <InputBlackRaduis disabled={!isAdd} />
                    </Form.Item>
                    <Form.Item
                        label={intl.formatMessage({
                            id: 'name',
                            defaultMessage: '名称',
                        })}
                        name="name"
                    >
                        <InputBlackRaduis />
                    </Form.Item>
                    <Form.Item
                        label={intl.formatMessage({
                            id: 'tax_number',
                            defaultMessage: '增值税号码',
                        })}
                        name="VATNo"
                    >
                        <InputBlackRaduis />
                    </Form.Item>
                    {isAdd || role === 1 ? null : (
                        <Form.Item label={role === 4 ? '所属商业代理' : '所属产品经理'} name="businessAgent">
                            <InputBlackRaduis />
                        </Form.Item>
                    )}
                </Col>
                <Col span={8}>
                    {role === 1 ? null : (
                        <Form.Item
                            label={intl.formatMessage({
                                id: 'account',
                                defaultMessage: '公司全名',
                            })}
                            name="companyFullName"
                        >
                            <InputGray />
                        </Form.Item>
                    )}
                    <Form.Item
                        label={intl.formatMessage({
                            id: 'contact_person',
                            defaultMessage: '联系人',
                        })}
                        name="contact"
                    >
                        <InputGray />
                    </Form.Item>
                    <Form.Item
                        label={intl.formatMessage({
                            id: 'tel_number',
                            defaultMessage: '联系电话',
                        })}
                        name="phone"
                    >
                        <InputGray />
                    </Form.Item>
                    <Form.Item
                        label={intl.formatMessage({
                            id: 'cel_number',
                            defaultMessage: '手机号码',
                        })}
                        name="telephone"
                    >
                        <InputGray />
                    </Form.Item>
                    <Form.Item
                        label={intl.formatMessage({
                            id: 'email',
                            defaultMessage: '电子邮件地址',
                        })}
                        name="email"
                    >
                        <InputGray />
                    </Form.Item>
                    <Form.Item
                        label={intl.formatMessage({
                            id: 'website',
                            defaultMessage: '网站',
                        })}
                        name="webside"
                    >
                        <InputGray />
                    </Form.Item>
                    {role === 4 ? (
                        <Form.Item name="type">
                            <Radio.Group>
                                <Radio value={1}>零售店</Radio>
                                <Radio value={2}>百货</Radio>
                                <Radio value={3}>连锁店</Radio>
                                <Radio value={4}>网店</Radio>
                                <Radio value={5}>其它</Radio>
                            </Radio.Group>
                        </Form.Item>
                    ) : null}
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
                            <TabPane
                                tab={intl.formatMessage({
                                    id: 'company_address',
                                    defaultMessage: '公司地址',
                                })}
                                key="1"
                                forceRender={true}
                            >
                                <Form.Item
                                    label={intl.formatMessage({
                                        id: 'address1',
                                        defaultMessage: '地址1',
                                    })}
                                    name="companyAddress1"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label={intl.formatMessage({
                                        id: 'address2',
                                        defaultMessage: '地址2',
                                    })}
                                    name="companyAddress2"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label={intl.formatMessage({
                                        id: 'city',
                                        defaultMessage: '市',
                                    })}
                                    name="companyCity"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label={intl.formatMessage({
                                        id: 'post_code',
                                        defaultMessage: '邮编',
                                    })}
                                    name="companyPostcode"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label={intl.formatMessage({
                                        id: 'conutry',
                                        defaultMessage: '国家',
                                    })}
                                    name="companyCountry"
                                >
                                    <Input />
                                </Form.Item>
                            </TabPane>
                            <TabPane
                                tab={intl.formatMessage({
                                    id: 'delivery_address',
                                    defaultMessage: '托运地址',
                                })}
                                key="2"
                                forceRender={true}
                            >
                                <Form.Item
                                    label={intl.formatMessage({
                                        id: 'address1',
                                        defaultMessage: '地址1',
                                    })}
                                    name="shippingAddress1"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label={intl.formatMessage({
                                        id: 'address2',
                                        defaultMessage: '地址2',
                                    })}
                                    name="shippingAddress2"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label={intl.formatMessage({
                                        id: 'city',
                                        defaultMessage: '市',
                                    })}
                                    name="shippingCity"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label={intl.formatMessage({
                                        id: 'post_code',
                                        defaultMessage: '邮编',
                                    })}
                                    name="shippingPostcode"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label={intl.formatMessage({
                                        id: 'conutry',
                                        defaultMessage: '国家',
                                    })}
                                    name="shippingCountry"
                                >
                                    <Input />
                                </Form.Item>
                            </TabPane>
                        </Tabs>
                    </Box>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={6}>
                    <Form.Item
                        label={intl.formatMessage({
                            id: 'currency',
                            defaultMessage: '货币类型',
                        })}
                        name="currency"
                    >
                        <SelectGrayRaduis
                            options={[
                                { label: '人民币', value: 0 },
                                { label: '美元', value: 1 },
                                { label: '欧元', value: 2 },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label={intl.formatMessage({
                            id: 'account',
                            defaultMessage: '支付方式',
                        })}
                        name="payType"
                    >
                        <InputGrayRaduis />
                    </Form.Item>
                </Col>
                <Col span={1}></Col>

                <Col span={17}>
                    <Form.Item
                        label={intl.formatMessage({
                            id: 'account',
                            defaultMessage: '银行账号',
                        })}
                        name="bankAccount"
                    >
                        <InputGrayRaduis />
                    </Form.Item>
                    <Form.Item
                        label={intl.formatMessage({
                            id: 'account',
                            defaultMessage: '备注',
                        })}
                        name="remark"
                    >
                        <InputGrayRaduis />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify="center">
                <Form.Item>
                    <Badge dot={showChange}>
                        <Button type="primary" htmlType="submit">
                            {intl.formatMessage({
                                id: 'save_setting',
                                defaultMessage: '保存设置',
                            })}
                        </Button>
                    </Badge>
                </Form.Item>
            </Row>
        </Form>
    );
};
export default UserInfoForm;
