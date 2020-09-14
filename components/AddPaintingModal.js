/** @jsx jsx */
import { jsx } from '@emotion/core'
import css from '@styled-system/css'
import { Modal, Form, Input, Button, Row, Col, DatePicker } from 'antd';

export default function AddPaitingModal({ visible, onOk, onCancel }) {
  const [form] = Form.useForm();

  return (
    <Modal title="Add New Paiting" visible={visible} onOk={onOk} onCancel={onCancel} width={800} footer={[
      <Button form="addPaintingForm" type="primary" key="submit" htmlType="submit">Done</Button>
    ]}>
      <Form id="addPaintingForm" form={form} layout="vertical" onFinish={values => onOk(values)}>

        <Row gutter={32}>
          <Col span={8}></Col>
          <Col span={16}>
            <Form.Item name="name" label="Serie" rules={[
              {
                required: true,
                message: 'Required',
              },
            ]}>
              <Input />
            </Form.Item>
            <Form.Item name="author" label="Author">
              <Input />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="creationDate" label="Creation Date" rules={[
                  {
                    required: true,
                    message: 'Required',
                  },
                ]}>
                  <DatePicker css={css({ width: '100%' })} />
                </Form.Item>

              </Col>
              <Col span={12}>
                <Form.Item name="size" label="Size" rules={[
                  {
                    required: true,
                    message: 'Required',
                  },
                ]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="notes" label="Notes">
              <Input.TextArea autoSize={{ minRows: 5, maxRows: 5 }}/>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}