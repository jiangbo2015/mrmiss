import { InputBottomBorder, TextAreaBottomBorder } from '@/components/Input';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import Footer from '@/components/Footer';
import map from '@/public/map.png';
import { Form, Button, Col, Row, message } from 'antd';
import { connect } from 'dva';
import { useEffect } from 'react';
import { Box } from 'rebass/styled-components';

const App = ({ dispatch, currentUser }) => {
    // const { currentUser } = props;
    const [form] = Form.useForm();

    const onFinish = () => {
        form.validateFields().then(async (values, error) => {
            console.log(values);
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
                                <InputBottomBorder placeholder="Your name *" />
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
                                <InputBottomBorder placeholder="Your email *" />
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
                        <InputBottomBorder placeholder="Subject *" />
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
                        <TextAreaBottomBorder rows={8} placeholder="Mensaje *" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '200px' }}>
                            Send
                        </Button>
                    </Form.Item>
                    <p>
                        CAN I HELP YOU? <br />
                        From here we will solve all the doubts you have about us and our services.
                    </p>
                </Form>
            </Box>
        </Layout>
    );
};

export default connect(({ user }) => ({ currentUser: user.info }))(App);
