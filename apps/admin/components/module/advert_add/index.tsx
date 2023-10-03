'use client';
import { useState } from 'react';
import { Button, Form, Input, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Title } from '@merch/shared';
import { addAdvertService } from 'utils/services/advertService';

import styles from './advert_add.module.scss';

export default function Advert() {
  const [form] = Form.useForm();
  const [base64String, setBase64String] = useState<any>(null);

  const checkImage = (file: File) => {
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
      setBase64String(base64);
    };
    reader.readAsDataURL(file);
    return;
  };

  const addAdvert = (value: any) => {
    try {
      checkImage(value.image.file);
      if (base64String) addAdvertService(value.name, value.alt, base64String);
      else console.log('error');
    } catch (err) {
      console.log('err');
      console.log(err);
    }
  };

  return (
    <div className={styles.body}>
      <Title level={4}>Add Advertisement</Title>
      <Form
        name="addAdvert"
        form={form}
        autoComplete="false"
        layout={'vertical'}
        onFinish={addAdvert}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Enter a name' }]}
        >
          <Input size="large" type="text" />
        </Form.Item>
        <Form.Item
          name="alt"
          label="Alt"
          rules={[{ required: true, message: 'Enter alt' }]}
        >
          <Input size="large" type="text" />
        </Form.Item>
        <Form.Item
          name="image"
          label="Image"
          rules={[{ required: true, message: 'Image needed' }]}
        >
          <Upload listType="picture" maxCount={1} beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" size="large" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
