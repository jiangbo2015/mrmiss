import { InputBottomBorder, TextAreaBottomBorder } from '@/components/Input';
import Layout from '@/components/Layout';
import { Form, Button, Col, Row, message } from 'antd';
import { connect } from 'dva';
import { useIntl } from 'umi';

import { Box } from 'rebass/styled-components';

const App = ({ dispatch, currentUser }) => {
    const intl = useIntl()
    // const { currentUser } = props;
    const [form] = Form.useForm();

    const onFinish = () => {
        form.validateFields().then(async (values, error) => {
            // console.log(values);
            await dispatch({
                type: 'user/feedback',
                payload: values,
            });
            message.info('发送成功');
            form.resetFields();
        });
    };
    return (
        <Layout>
            <Box p="200px  200px 0 200px">
                <Form onFinish={onFinish} form={form}>
                    <Row>
                        <Col span={11}>
                            <Form.Item
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name',
                                    },
                                ]}
                            >
                                <InputBottomBorder placeholder={intl.formatMessage({
                            id: 'your_name',
                            defaultMessage: '您的姓名',
                        })} />
                            </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email',
                                    },
                                ]}
                            >
                                <InputBottomBorder placeholder={intl.formatMessage({
                            id: 'your_email',
                            defaultMessage: '您的邮箱',
                        })} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name="subject"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your subject',
                            },
                        ]}
                    >
                        <InputBottomBorder placeholder={intl.formatMessage({
                            id: 'subject',
                            defaultMessage: '主题',
                        })} />
                    </Form.Item>
                    <Form.Item
                        name="mensaje"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your mensaje',
                            },
                        ]}
                    >
                        <TextAreaBottomBorder rows={8} placeholder={intl.formatMessage({
                            id: 'mensaje',
                            defaultMessage: '请描述您的问题',
                        })} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '200px' }}>
                            
                            {intl.formatMessage({
                            id: 'send',
                            defaultMessage: '发送',
                        })}
                        </Button>
                    </Form.Item>
                    <p>
                    {intl.formatMessage({
                            id: 'can_help_you',
                            defaultMessage: '需要帮助吗？',
                        })}
                        <br />
                        {intl.formatMessage({
                            id: 'from_here_we',
                            defaultMessage: '请填写以上表格，让我们来解答您的疑问。',
                        })}
                    </p>
                </Form>
            </Box>
        </Layout>
    );
};

export default connect(({ user = {} }) => ({ currentUser: user.info }))(App);
