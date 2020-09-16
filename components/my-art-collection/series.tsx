/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@styled-system/css';
import { Menu, Card, Button } from 'antd';
import { PlusOutlined, DeleteFilled } from '@ant-design/icons';
import AddSerieModal from './add-serie-modal';
import { useState, useEffect } from 'react';
import request from '../../utils/request';
import useSWR from 'swr';
import { Serie } from '../../interfaces/serie';

interface Props {
  activeSerieId: string;
  onSerieClick: (serieId: string) => void;
}

const series: React.FC<Props> = ({ activeSerieId, onSerieClick }) => {
  const { data: series, mutate } = useSWR<Serie[]>('/series');
  const [addSerieVisible, setAddSerieVisible] = useState(false);

  const handleDeleteClick = async (serie) => {
    await request.delete(`/series/${serie._id}`);
    if (serie._id === activeSerieId) {
      onSerieClick(series.find((serie) => serie._id !== activeSerieId)?._id);
    }
    mutate();
  };

  const handleAddSerieOk = async (values) => {
    await request.post('/series', values);
    mutate();
    setAddSerieVisible(false);
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
      css={css({ '.ant-card-body': { px: 0 } })}
    >
      <Menu
        mode="inline"
        selectedKeys={[activeSerieId]}
        onClick={(e) => onSerieClick(e.key as string)}
      >
        {(series ?? []).map((serie) => (
          <Menu.Item
            key={serie._id}
            css={css({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            })}
          >
            {serie.name}
            <DeleteFilled
              css={css({ color: 'rgba(0, 0, 0, 0.45)' })}
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteClick(serie);
              }}
            />
          </Menu.Item>
        ))}
      </Menu>
      <div css={css({ m: 16 })}>
        <Button
          type="primary"
          shape="round"
          block
          icon={<PlusOutlined />}
          onClick={() => setAddSerieVisible(true)}
        >
          Add New Serie
        </Button>
      </div>
      <AddSerieModal
        visible={addSerieVisible}
        onOk={handleAddSerieOk}
        onCancel={() => setAddSerieVisible(false)}
      />
    </Card>
  );
};

export default series;
