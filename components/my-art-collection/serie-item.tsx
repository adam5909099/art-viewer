import { Button, message } from 'antd';
import { Serie } from '../../interfaces/serie';
import { DeleteOutlined } from '@ant-design/icons';
import { useDrop } from 'react-dnd';
import request from '../../utils/request';
import { Painting } from '../../interfaces/paintings';

interface Props {
  serie: Serie;
  onDelete: () => void;
  onPaintingDrop: () => void;
}

const SerieItem: React.FC<Props> = ({ serie, onDelete, onPaintingDrop }) => {
  const [, drop] = useDrop<
    {
      type: string;
      painting: Painting;
    },
    void,
    void
  >({
    accept: 'PAINTING',
    async drop({ painting }) {
      await request.put(`/paintings/${painting._id}`, {
        serie: serie._id,
      });
      onPaintingDrop();
      message.success(`${painting.name} moved into ${serie.name}`);
    },
  });

  return (
    <div
      ref={drop}
      css="display: flex; align-items: center; justify-content: space-between;"
    >
      {serie.name}
      <Button
        type="primary"
        danger
        shape="circle"
        icon={
          <DeleteOutlined css="font-size: 16px !important; margin-right: 0 !important;" />
        }
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      ></Button>
    </div>
  );
};

export default SerieItem;
