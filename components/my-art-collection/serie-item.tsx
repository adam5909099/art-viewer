import { Button } from 'antd';
import { Serie } from '../../interfaces/serie';
import { DeleteOutlined } from '@ant-design/icons';
import { useDrop } from 'react-dnd';
import request from '../../utils/request';

interface Props {
  serie: Serie;
  onDelete: () => void;
  paintingDropped: () => void;
}

const SerieItem: React.FC<Props> = ({ serie, onDelete, paintingDropped }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'PAINTING',
    async drop(data) {
      await request.put(`/paintings/${data.painting._id}`, {
        serieId: serie._id,
      });
      paintingDropped();
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
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
