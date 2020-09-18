import { Row, Col, Typography } from 'antd';
import PageLayout from '../components/page-layout';

const { Title } = Typography;

const Gallery: React.FC = () => {
  return (
    <PageLayout>
      <Title css="margin-bottom: 32px;">Gallery</Title>
      <Row gutter={64}>
        <Col span={6}></Col>
        <Col span={18}></Col>
      </Row>
    </PageLayout>
  );
};

export default Gallery;
