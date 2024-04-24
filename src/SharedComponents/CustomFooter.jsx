import { Layout, Row, Col } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, GoogleOutlined, AppleOutlined, PaypalOutlined } from '@ant-design/icons';

const { Footer } = Layout;

const BlackFooter = () => {
  return (
    <Footer style={{ backgroundColor: '#000', color: '#fff' }}>
      <Row justify="space-between" align="middle">
        <Col span={12} style={{ textAlign: 'center' }}>
          <h3>Payment Methods</h3>
          <Row justify="space-around">
          </Row>
        </Col>
        <Col span={6} style={{ textAlign: 'center' }}>
          <h3>Follow Us</h3>
          <Row justify="space-around">
            <Col><FacebookOutlined style={{ fontSize: '24px' }} /></Col>
            <Col><TwitterOutlined style={{ fontSize: '24px' }} /></Col>
            <Col><InstagramOutlined style={{ fontSize: '24px' }} /></Col>
          </Row>
        </Col>
      </Row>
    </Footer>
  );
};

export default BlackFooter;
