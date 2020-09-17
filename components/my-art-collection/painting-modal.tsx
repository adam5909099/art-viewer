import {
  Modal,
  Form,
  Input,
  Button,
  Row,
  Col,
  DatePicker,
  Upload,
  message,
} from 'antd';
import { useState, useEffect } from 'react';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Painting } from '../../interfaces/paintings';
import { baseURL } from '../../utils/request';

interface Props {
  visible: boolean;
  onOk: (values: Painting) => void;
  onCancel: () => void;
}

const PaintingModal: React.FC<Props> = ({ visible, onOk, onCancel }) => {
  const [form] = Form.useForm<Painting>();
  const [filePath, setFilePath] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const beforeUpload = (file) => {
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      message.error('You can only upload JPG/PNG file!');
      return false;
    }

    return true;
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
    } else if (info.file.status === 'done') {
      setLoading(false);
      setFilePath(info.file.response.filePath);

      const img = new Image();
      img.onload = function () {
        form.setFieldsValue({
          ...form.getFieldsValue(),
          sizeWidth: img.width,
          sizeHeight: img.height,
        });
      };
      img.src = info.file.response.filePath;
    }
  };

  useEffect(() => {
    if (!visible) return;
    setLoading(false);
    setFilePath('');
    form.resetFields();
  }, [visible]);

  return (
    <Modal
      title="Add New Painting"
      visible={visible}
      onCancel={onCancel}
      width={800}
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
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          if (!filePath) {
            message.error('Please select image file!');
            return;
          }

          onOk({ ...values, filePath });
        }}
      >
        <Row gutter={32}>
          <Col>
            <Upload
              name="upload"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={`${baseURL}/upload`}
              beforeUpload={beforeUpload}
              onChange={handleChange}
              css={`
                .ant-upload {
                  width: 240px;
                  height: 240px;
                }
              `}
            >
              {filePath ? (
                <img
                  src={filePath}
                  alt="avatar"
                  css="width: 100%; height: 100%;"
                />
              ) : (
                <div>
                  {loading ? (
                    <LoadingOutlined css="font-size: 24px;" />
                  ) : (
                    <PlusOutlined css="font-size: 24px;" />
                  )}
                  <div css="margin-top: 8px;">Upload</div>
                </div>
              )}
            </Upload>
          </Col>
          <Col css="flex: 1;">
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
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="author"
                  label="Author"
                  rules={[
                    {
                      required: true,
                      message: 'Required',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="creationDate"
                  label="Creation Date"
                  rules={[
                    {
                      required: true,
                      message: 'Required',
                    },
                  ]}
                >
                  <DatePicker css="width: 100%;" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="sizeHeight"
                  label="Width"
                  rules={[
                    {
                      required: true,
                      message: 'Required',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="sizeWidth"
                  label="Height"
                  rules={[
                    {
                      required: true,
                      message: 'Required',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="notes" label="Notes">
              <Input.TextArea autoSize={{ minRows: 5, maxRows: 5 }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default PaintingModal;
