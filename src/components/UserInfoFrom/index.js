import { Heading, Text } from 'rebass/styled-components';
import { Form, Col, Row, Radio, Tabs, Input, Button } from 'antd';
const { TabPane } = Tabs;

export default () => (
    <Form maxWidth="1300px" mx="auto" layout="vertical">
        <Row gutter={24}>
            <Col span={7}>
                <Form.Item label="用户名" name="username">
                    <Input />
                </Form.Item>
                <Form.Item label="增值税号码" name="VATNo">
                    <Input />
                </Form.Item>
                <Form.Item label="所属商业代理" name="businessAgent">
                    <Input />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item label="公司全名" name="company_name">
                    <Input />
                </Form.Item>
                <Form.Item label="联系人" name="contacts">
                    <Input />
                </Form.Item>
                <Form.Item label="联系电话" name="phone">
                    <Input />
                </Form.Item>
                <Form.Item label="手机号码" name="telephone">
                    <Input />
                </Form.Item>
                <Form.Item label="电子邮件地址" name="email">
                    <Input />
                </Form.Item>
                <Form.Item label="网站" name="webside">
                    <Input />
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
                <Tabs defaultActiveKey="1">
                    <TabPane tab="公司地址" key="1" forceRender={true}>
                        <Form.Item label="地址1" name="company_address1">
                            <Input />
                        </Form.Item>
                        <Form.Item label="地址2" name="company_address2">
                            <Input />
                        </Form.Item>
                        <Form.Item label="市" name="company_address2">
                            <Input />
                        </Form.Item>
                        <Form.Item label="邮编" name="company_postcode">
                            <Input />
                        </Form.Item>
                        <Form.Item label="国家" name="company_country">
                            <Input />
                        </Form.Item>
                    </TabPane>
                    <TabPane tab="托运地址" key="2" forceRender={true}>
                        <Form.Item label="地址1" name="shipping_address1">
                            <Input />
                        </Form.Item>
                        <Form.Item label="地址2" name="shipping_address2">
                            <Input />
                        </Form.Item>
                        <Form.Item label="市" name="shipping_address2">
                            <Input />
                        </Form.Item>
                        <Form.Item label="邮编" name="shipping_postcode">
                            <Input />
                        </Form.Item>
                        <Form.Item label="国家" name="shipping_country">
                            <Input />
                        </Form.Item>
                    </TabPane>
                </Tabs>
            </Col>
        </Row>
        <Row gutter={24}>
            <Col span={6}>
                <Form.Item label="货币类型" name="username">
                    <Input />
                </Form.Item>
                <Form.Item label="支付方式" name="VATNo">
                    <Input />
                </Form.Item>
            </Col>
            <Col span={1}></Col>

            <Col span={17}>
                <Form.Item label="银行账号" name="bank_account">
                    <Input />
                </Form.Item>
                <Form.Item label="备注" name="remarks">
                    <Input />
                </Form.Item>
            </Col>
        </Row>
        <Row>
            <Col span="24">
                <Form.Item>
                    <Button type="primary">保存设置</Button>
                </Form.Item>
            </Col>
        </Row>
    </Form>
);
