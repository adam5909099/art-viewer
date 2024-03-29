import PaintingCard from './painting-card';
import AddPaintingCard from './add-painting-card';
import { useState } from 'react';
import { Typography, Row, Col, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import useSWR, { mutate } from 'swr';
import PaintingModal from './painting-modal';
import request from '../../utils/request';
import { Painting } from '../../interfaces/paintings';
import { Serie } from '../../interfaces/serie';
import SerieModal from './serie-modal';

const { Title } = Typography;

interface Props {
  serieId: string;
}

const Paintings: React.FC<Props> = ({ serieId }) => {
  const { data: serie, mutate: mutateSerie } = useSWR<Serie>(
    `/series/${serieId}`
  );
  const { data: paintings, mutate: mutatePainings } = useSWR<Painting[]>(
    `/series/${serieId}/paintings`
  );
  const [paintingModalVisible, setPaintingModalVisible] = useState(false);
  const [serieModalVisible, setSerieModalVisible] = useState(false);
  const [editingPainting, setEditingPainting] = useState<Painting>(null);

  const handlePaintingModalOk = async (painting) => {
    if (editingPainting) {
      await request.put(`/paintings/${editingPainting._id}`, painting);
    } else {
      await request.post('/paintings', { ...painting, serieId });
    }
    mutatePainings();
    setPaintingModalVisible(false);
  };

  const handleSerieModalOk = async (serie) => {
    await request.put(`/series/${serieId}`, serie);
    mutateSerie();
    mutate('/series');
    setSerieModalVisible(false);
  };

  const handlePaintingDelete = async (painting) => {
    await request.delete(`/paintings/${painting._id}`, painting);
    mutatePainings();
    setSerieModalVisible(false);
    setPaintingModalVisible(false);
  };

  return (
    <>
      <Title css="display: flex; align-items: center">
        {serie?.name}
        <Button
          type="primary"
          shape="circle"
          icon={<EditOutlined />}
          css="margin-left: 16px;"
          onClick={() => setSerieModalVisible(true)}
        ></Button>
      </Title>
      <Row gutter={32}>
        {paintings?.map((painting, index) => (
          <Col span={8} key={index} css="margin-bottom: 32px;">
            <PaintingCard
              painting={painting}
              onEditClick={() => {
                setEditingPainting(painting);
                setPaintingModalVisible(true);
              }}
            />
          </Col>
        ))}
        <Col span={8} css="margin-bottom: 32px;">
          <AddPaintingCard
            onClick={() => {
              setEditingPainting(null);
              setPaintingModalVisible(true);
            }}
          />
        </Col>
      </Row>
      <PaintingModal
        values={editingPainting}
        visible={paintingModalVisible}
        onOk={handlePaintingModalOk}
        onDelete={(painting) => {
          handlePaintingDelete(painting);
        }}
        onCancel={() => setPaintingModalVisible(false)}
      />
      <SerieModal
        values={serie}
        visible={serieModalVisible}
        onOk={handleSerieModalOk}
        onCancel={() => setSerieModalVisible(false)}
      ></SerieModal>
    </>
  );
};

export default Paintings;
