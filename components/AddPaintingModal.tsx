/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@styled-system/css';
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
import { PlusOutlined } from '@ant-design/icons';

export interface Painting {
  name: string;
  author?: string;
  creationDate: Date;
  width: number;
  height: number;
  notes?: string;
  file?: File | string;
}

interface Props {
  visible: boolean;
  onOk: (values: Painting) => void;
  onCancel: () => void;
}

const AddPaitingModal: React.FC<Props> = ({ visible, onOk, onCancel }) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<File>(null);
  const [previewSrc, setPreviewSrc] = useState<string>(null);

  const beforeUpload = (file) => {
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      message.error('You can only upload JPG/PNG file!');
      return false;
    }

    const reader = new FileReader();
    reader.onload = () => setPreviewSrc(reader.result as string);
    reader.readAsDataURL(file);

    setFile(file);

    return false;
  };

  useEffect(() => {
    if (!visible) return;

    setFile(null);
    setPreviewSrc(null);
    form.resetFields();
  }, [visible]);

  return (
    <Modal
      title="Add New Paiting"
      visible={visible}
      onCancel={onCancel}
      width={800}
      footer={[
        <Button
          form="addPaintingForm"
          type="primary"
          key="submit"
          htmlType="submit"
        >
          Done
        </Button>,
      ]}
    >
      <Form
        id="addPaintingForm"
        form={form}
        layout="vertical"
        onFinish={(values) => {
          if (!file) {
            message.error('Please select image file!');
            return;
          }
          onOk({ file: previewSrc, ...values });
        }}
      >
        <Row gutter={32}>
          <Col>
            <Upload
              name="file"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              css={css({ '.ant-upload': { width: 240, height: 240 } })}
            >
              {previewSrc ? (
                <img
                  src={previewSrc}
                  alt="avatar"
                  css={css({ width: '100%', p: 1 })}
                />
              ) : (
                <div>
                  <PlusOutlined />
                  <div css={css({ mt: '8px' })}>Upload</div>
                </div>
              )}
            </Upload>
          </Col>
          <Col css={css({ flex: 1 })}>
            <Form.Item
              name="name"
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
                  <DatePicker css={css({ width: '100%' })} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="width"
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
                  name="height"
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

export default AddPaitingModal;
