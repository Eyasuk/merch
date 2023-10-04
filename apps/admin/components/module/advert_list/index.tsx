'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, Badge, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getAdvertService } from 'utils/services/advertService';

import styles from './advert_list.module.scss';

interface DataType {
  key: React.Key;
  name: string;
  alt: string;
  image: string;
  status: boolean;
}

export function AdvertList(): JSX.Element {
  const [advertData, setAdvertData] = useState();

  useEffect(() => {
    const setData = async () => {
      try {
        const response = await getAdvertService(0, 5);
        console.log(response);
        const data = response.data.data.data.map((item: any) => {
          return {
            key: item._id,
            ...item,
          };
        });
        console.log(data);
        setAdvertData(data);
        console.log(advertData);
      } catch (err) {
        console.log(err);
      }
    };
    setData();
  }, []);

  const columns: ColumnsType<DataType> = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Alt', dataIndex: 'alt', key: 'alt' },

    {
      title: 'Action',
      dataIndex: '',
      key: 'action',
      render: () => (
        <span className={styles.actions}>
          <Button>delete</Button>
          <Button>change status</Button>
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        return status ? <Badge status="success" /> : <Badge status="error" />;
      },
    },
  ];

  return (
    <Table
      className={styles.body}
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (
          <Image
            alt="Base64 Image"
            width={400}
            height={300}
            src={record.image}
          />
        ),
      }}
      dataSource={advertData}
    />
  );
}
