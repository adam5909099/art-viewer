import { Menu, Card, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SerieModal from './serie-modal';
import { useState, useEffect } from 'react';
import request from '../../utils/request';
import useSWR, { mutate } from 'swr';
import { Serie } from '../../interfaces/serie';
import SerieItem from './serie-item';

interface Props {
  activeSerieId: string;
  onSerieClick: (serieId: string) => void;
}

const series: React.FC<Props> = ({ activeSerieId, onSerieClick }) => {
  const { data: series, mutate: mutateSeries } = useSWR<Serie[]>('/series');
  const [serieModalVisible, setSerieModalVisible] = useState(false);

  const handleDelete = async (serie) => {
    await request.delete(`/series/${serie._id}`);
    if (serie._id === activeSerieId) {
      onSerieClick(series.find((serie) => serie._id !== activeSerieId)?._id);
    }
    mutateSeries();
  };

  const handleSerieModalOk = async (values) => {
    await request.post('/series', values);
    mutateSeries();
    setSerieModalVisible(false);
  };

  useEffect(() => {
    if (series?.length && !activeSerieId) {
      onSerieClick(series[0]._id);
    }
  }, [series]);

  return (
    <Card
      title="Series"
      bordered={false}
      css={`
        .ant-card-body {
          padding-left: 0;
          padding-right: 0;
        }
      `}
    >
      <Menu
        mode="inline"
        selectedKeys={[activeSerieId]}
        onClick={(e) => onSerieClick(e.key as string)}
      >
        {series?.map((serie) => (
          <Menu.Item key={serie._id}>
            <SerieItem
              serie={serie}
              onDelete={() => handleDelete(serie)}
              paintingDropped={() => {
                mutate(`/series/${activeSerieId}/paintings`);
              }}
            ></SerieItem>
          </Menu.Item>
        ))}
      </Menu>
      <div css="margin: 16px;">
        <Button
          type="primary"
          shape="round"
          block
          icon={<PlusOutlined />}
          onClick={() => setSerieModalVisible(true)}
        >
          Add New Serie
        </Button>
      </div>
      <SerieModal
        visible={serieModalVisible}
        onOk={handleSerieModalOk}
        onCancel={() => setSerieModalVisible(false)}
      />
    </Card>
  );
};

export default series;
