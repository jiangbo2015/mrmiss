import { InputBottomBorder, TextAreaBottomBorder } from '@/components/Input';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import Footer from '@/components/Footer';
import map from '@/public/map.png';
import { Form, Button, Col, Row } from 'antd';
import { connect } from 'dva';
import { useEffect } from 'react';
import { Box } from 'rebass/styled-components';

const App = ({ dispatch, currentUser }) => {
    // const { currentUser } = props;
    useEffect(() => {
        dispatch({
            type: 'user/getCurrentUser',
        });
    }, []);
    return (
        <Layout>
            <Box p="200px  200px 0 200px">
                <Form>
                    <Row>
                        <Col span={11}>
                            <Form.Item name="name" required>
                                <InputBottomBorder placeholder="Your name *" />
                            </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                            <Form.Item name="email" required>
                                <InputBottomBorder placeholder="Your email *" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item name="subject" required>
                        <InputBottomBorder placeholder="Subject *" />
                    </Form.Item>
                    <Form.Item name="mensaje" required>
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
