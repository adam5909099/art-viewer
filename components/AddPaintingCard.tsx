/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@styled-system/css';
import { Card, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface Props {
  onClick: () => void;
}

const AddPaintingCard: React.FC<Props> = ({ onClick }) => {
  return (
    <Card
      css={css({
        height: '100%',
        '.ant-card-body': { height: '100%' },
      })}
    >
      <Button
        icon={<PlusOutlined css={css({ fontSize: 128 })} />}
        css={css({
          width: '100%',
          height: '100%',
          py: 15,
          span: { display: 'block' },
        })}
        onClick={onClick}
      >
        Add Painting
      </Button>
    </Card>
  );
};

export default AddPaintingCard;
