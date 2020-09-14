import { Modal, Form, Input, Button } from 'antd';

export default function AddSerieModal({ visible, onOk, onCancel }) {
  const [form] = Form.useForm();

  return (
    <Modal title="Add New Serie" visible={visible} onOk={onOk} onCancel={onCancel} footer={[
      <Button form="addSerieForm" type="primary" key="submit" htmlType="submit">Done</Button>
    ]}>
      <Form id="addSerieForm" form={form} layout="vertical" onFinish={({ serie }) => onOk(serie)}>
        <Form.Item name="serie" label="Serie" rules={[
          {
            required: true,
            message: 'Required',
          },
        ]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}