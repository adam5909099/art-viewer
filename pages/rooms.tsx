import { Row, Col, Typography, Button } from 'antd';
import { Card } from 'antd';
import PageLayout from '../components/page-layout';

const { Title } = Typography;

const Rooms: React.FC = () => {
  return (
    <PageLayout>
      <Title css="margin-bottom: 32px;">Room Decorator</Title>
      <Row gutter={64}>
        <Col span={6}>
          <Card bordered={false}>
            <Title level={3}>Room Options</Title>
            {[
              'Dining room',
              'Bedroom',
              'Living room',
              'Bathroom',
              'Office',
              'Waiting room',
            ].map((room) => (
              <Button
                key={room}
                shape="round"
                css="margin-right: 8px; margin-bottom: 8px;"
              >
                {room}
              </Button>
            ))}
          </Card>
        </Col>
        <Col span={18}></Col>
      </Row>
    </PageLayout>
  );
};

export default Rooms;
