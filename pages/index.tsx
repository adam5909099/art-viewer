import { useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Row, Col, Typography } from 'antd';
import Series from '../components/my-art-collection/series';
import Paintings from '../components/my-art-collection/paintings';
import PageLayout from '../components/page-layout';

const { Title } = Typography;

const Home: React.FC = () => {
  const [activeSerieId, setActiveSerieId] = useState<string>(null);

  return (
    <PageLayout>
      <Title css="margin-bottom: 32px;">My Art Collection</Title>
      <DndProvider backend={HTML5Backend}>
        <Row gutter={64}>
          <Col span={6}>
            <Series
              activeSerieId={activeSerieId}
              onSerieClick={setActiveSerieId}
            />
          </Col>
          <Col span={18}>
            <Paintings serieId={activeSerieId}></Paintings>
          </Col>
        </Row>
      </DndProvider>
    </PageLayout>
  );
};

export default Home;
