/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@styled-system/css';
import PaintingCard from './painting-card';
import AddPaintingCard from './add-painting-card';
import { useState } from 'react';
import { Typography, Row, Col, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import useSWR from 'swr';
import AddPaintingModal from './add-painting-modal';
import request from '../../utils/request';
import { Painting } from '../../interfaces/paintings';
import { Serie } from '../../interfaces/serie';

const { Title } = Typography;

interface Props {
  serieId: string;
}

const Paintings: React.FC<Props> = ({ serieId }) => {
  const { data: serie } = useSWR<Serie>(`/series/${serieId}`);
  const { data: paintings, mutate } = useSWR<Painting[]>(
    `/series/${serieId}/paintings`
  );
  const [addPaintingVisible, setAddPaintingVisible] = useState(false);

  const handleAddPaintingOk = async (painting) => {
    await request.post('/paintings', { ...painting, serieId });
    mutate();
    setAddPaintingVisible(false);
  };

  const handlePaintingDelete = async (painting) => {
    await request.delete(`/paintings/${painting._id}`, painting);
    mutate();
  };

  if (!serie || !paintings) {
    return null;
  }

  return (
    <>
      <Title css={css({ display: 'flex', alignItems: 'center' })}>
        {serie.name}
        <Button
          type="dashed"
          shape="circle-outline"
          icon={<EditOutlined />}
          css={css({ ml: 3 })}
        ></Button>
      </Title>
      <Row gutter={32}>
        {paintings.map((painting, index) => (
          <Col span={8} key={index} css={css({ mb: 32 })}>
            <PaintingCard
              painting={painting}
              onDeleteClick={() => {
                handlePaintingDelete(painting);
              }}
            />
          </Col>
        ))}
        <Col span={8} css={css({ mb: 32 })}>
          <AddPaintingCard onClick={() => setAddPaintingVisible(true)} />
        </Col>
      </Row>
      <AddPaintingModal
        visible={addPaintingVisible}
        onOk={handleAddPaintingOk}
        onCancel={() => setAddPaintingVisible(false)}
      />
    </>
  );
};

export default Paintings;
