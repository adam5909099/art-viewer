import { Card, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface Props {
  onClick: () => void;
}

const AddPaintingCard: React.FC<Props> = ({ onClick }) => {
  return (
    <Card
      css={`
        height: 100%;
        .ant-card-body {
          height: 100%;
        }
      `}
    >
      <Button
        icon={<PlusOutlined css="font-size: 128px" />}
        css={`
          width: 100%;
          height: 100%;
          padding-top: 15px;
          padding-bottom: 15px;
          span {
            display: block;
            margin-bottom: 5px;
          }
        `}
        onClick={onClick}
      >
        Add Painting
      </Button>
    </Card>
  );
};

export default AddPaintingCard;
