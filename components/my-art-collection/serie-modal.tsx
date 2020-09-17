import { Modal, Form, Input, Button } from 'antd';
import { useEffect } from 'react';
import { Serie } from '../../interfaces/serie';

interface Props {
  visible: boolean;
  values?: Serie;
  onOk: (serie: Serie) => void;
  onCancel: () => void;
}

const SerieModal: React.FC<Props> = ({ visible, values, onOk, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!visible) return;

    if (values) {
      form.setFieldsValue(values);
    } else {
      form.resetFields();
    }
  }, [visible]);

  return (
    <Modal
      title={values ? 'Edit Serie' : 'Add New Serie'}
      visible={visible}
      onCancel={onCancel}
      footer={
        <Button
          type="primary"
          onClick={() => {
            form.submit();
          }}
        >
          Done
        </Button>
      }
    >
      <Form form={form} layout="vertical" onFinish={(values) => onOk(values)}>
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

export default SerieModal;
