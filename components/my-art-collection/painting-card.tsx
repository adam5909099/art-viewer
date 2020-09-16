/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@styled-system/css';
import { Card } from 'antd';
import { EditOutlined, DeleteFilled } from '@ant-design/icons';
import { Typography } from 'antd';
import moment from 'moment';
import { Painting } from '../../interfaces/paintings';

const { Title, Text } = Typography;

interface Props {
  painting: Painting;
  onDeleteClick: () => void;
}

const PaintingCard: React.FC<Props> = ({ painting, onDeleteClick }) => {
  return (
    <Card
      cover={
        <img alt="example" src={painting.filePath} css={css({ height: 200 })} />
      }
      actions={[
        <EditOutlined key="edit" />,
        <DeleteFilled key="delete" onClick={onDeleteClick} />,
      ]}
      css={css({ '.ant-card-body': { p: 2 } })}
    >
      <div
        css={css({
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        })}
      >
        <div>
          <Title level={5} css={css({ mb: '0 !important' })}>
            {painting.name}
          </Title>
          <Text css={css({ color: 'gray' })}>
            {painting.author}, {moment(painting.creationDate).format('YYYY')}
          </Text>
        </div>
        <Text css={css({ color: 'gray' })}>
          {painting.sizeWidth} x {painting.sizeHeight}
        </Text>
      </div>
    </Card>
  );
};

export default PaintingCard;
