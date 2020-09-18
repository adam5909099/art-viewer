import { Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Typography, Image, Button } from 'antd';
import moment from 'moment';
import { Painting } from '../../interfaces/paintings';
import { useDrag } from 'react-dnd';

const { Title, Text } = Typography;

interface Props {
  painting: Painting;
  onEditClick: () => void;
}

const PaintingCard: React.FC<Props> = ({ painting, onEditClick }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'PAINTING', painting },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag}>
      <Card
        css={`
          opacity: ${isDragging ? 0.3 : 1};
          .ant-card-body {
            padding: 8px;
            position: relative;
          }
        `}
      >
        <Button
          type="primary"
          shape="circle"
          icon={<EditOutlined />}
          onClick={onEditClick}
          css="position: absolute; z-index: 1; top: 16px; right: 16px;"
        ></Button>
        <Image src={painting.filePath} height={200} width="100%"></Image>
        <div css="display: flex; align-items: flex-end; justify-content: space-between; margin-top: 8px;">
          <div>
            <Title level={5} css="margin-bottom: 0 !important;">
              {painting.name}
            </Title>
            <Text css="color: gray;">
              {painting.author}, {moment(painting.creationDate).format('YYYY')}
            </Text>
          </div>
          <Text css="color: gray;">
            {painting.sizeWidth} x {painting.sizeHeight}
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default PaintingCard;
