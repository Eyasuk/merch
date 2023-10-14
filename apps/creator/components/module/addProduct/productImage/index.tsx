import { useState } from 'react';
import { Button, Form, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Text } from '@merch/shared';

import styles from './productImage.module.scss';

type Props = {
  onNext: Function;
  onPrevious: Function;
};

export default function ProductImage({
  onNext,
  onPrevious,
}: Props): JSX.Element {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const checkImage = async (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      throw new Error('You can only upload JPG/PNG image files!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      throw new Error('Image must be smaller than 2MB!');
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
    };
    reader.readAsDataURL(file);
    return;
  };

  const handleFileChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  const submit = () => {
    onNext();
  };

  return (
    <div className={styles.modalContent}>
      <Form
        className={styles.form}
        name="addProductImage"
        layout="vertical"
        autoComplete="false"
        form={form}
        onFinish={submit}
      >
        <Form.Item name="images" label="Images">
          <div className={styles.image}>
            <Text type="secondary">Upload at least 3 image,</Text>

            <Text type="secondary">
              The first image will be the product cover
            </Text>
            <Text type="secondary">You can change an image later</Text>
            <Upload
              className={styles.upload}
              listType="picture-card"
              fileList={fileList}
              maxCount={6}
              onChange={handleFileChange}
              beforeUpload={() => false}
            >
              <UploadOutlined />
            </Upload>
          </div>
        </Form.Item>
        <Form.Item>
          <Button
            className={styles.buttons}
            onClick={() => onPrevious()}
            size="large"
          >
            Previous
          </Button>
          <Button
            className={styles.buttons}
            type="primary"
            size="large"
            htmlType="submit"
          >
            Next
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
