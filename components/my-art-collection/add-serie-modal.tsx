import { Modal, Form, Input, Button } from 'antd';
import { useEffect } from 'react';
import { Serie } from '../../interfaces/serie';

interface Props {
  visible: boolean;
  onOk: (serie: Serie) => void;
  onCancel: () => void;
}

const AddSerieModal: React.FC<Props> = ({ visible, onOk, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!visible) return;

    form.resetFields();
  }, [visible]);

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
        onFinish={(values) => onOk(values)}
      >
        <Form.Item
          name="name"
          label="Name"
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
