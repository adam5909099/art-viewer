import { Modal, Form, Input, Button } from 'antd';

interface Props {
  visible: boolean;
  onOk: (serie: string) => void;
  onCancel: () => void;
}

const AddSerieModal: React.FC<Props> = ({ visible, onOk, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Add New Serie"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button
          form="addSerieForm"
          type="primary"
          key="submit"
          htmlType="submit"
        >
          Done
        </Button>,
      ]}
    >
      <Form
        id="addSerieForm"
        form={form}
        layout="vertical"
        onFinish={({ serie }) => onOk(serie)}
      >
        <Form.Item
          name="serie"
          label="Serie"
          rules={[
            {
              required: true,
              message: 'Required',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddSerieModal;
