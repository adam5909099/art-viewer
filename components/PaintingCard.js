/** @jsx jsx */
import { jsx } from '@emotion/core'
import css from '@styled-system/css'
import { Card } from 'antd';
import { EditOutlined, DeleteFilled } from '@ant-design/icons';
import { Typography } from 'antd';

const { Title, Text } = Typography;

export default function PaintingCard({ painting }) {
  return (
    <Card
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <EditOutlined key="edit" />,
        <DeleteFilled key="setting" />,
      ]}
      css={css({ '.ant-card-body': { p: 2 } })}
    >
      <div css={css({ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' })}>
        <div>
          <Title level={5} css={css({ mb: '0 !important' })}>{painting.name}</Title>
          <Text css={css({ color: 'gray' })}>{painting.author}, {painting.creationDate}</Text>
        </div>
        <Text css={css({ color: 'gray' })}>{painting.size}</Text>
      </div>
    </Card>
  )
}