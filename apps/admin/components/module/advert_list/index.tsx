'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, Badge, Table, Modal, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  getAdvertService,
  deleteAdvertService,
  editAdvertService,
} from 'utils/services/advertService';

import styles from './advert_list.module.scss';

interface DataType {
  key: React.Key;
  name: string;
  alt: string;
  image: string;
  status: boolean;
  _id: string;
}

export function AdvertList(): JSX.Element {
  const [advertData, setAdvertData] = useState<DataType[]>();

  useEffect(() => {
    const setData = async () => {
      try {
        const response = await getAdvertService(0, 5);
        const data = response.data.data.data.map((item: any) => {
          return {
            key: item._id,
            ...item,
          };
        });
        setAdvertData(data);
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
      render: (value) => (
        <span className={styles.actions}>
          <Popconfirm
            title="Delete the advert"
            description="Are you sure to delete this advert?"
            onConfirm={() => deleteAdvert(value._id)}
            // onCancel={null}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
          <Popconfirm
            title="Change status"
            description="Are you sure to change the status of this advert?"
            onConfirm={() => editAdvert(value._id)}
            // onCancel={null}
            okText="Yes"
            cancelText="No"
          >
            <Button>Change Status</Button>
          </Popconfirm>
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
  const editAdvert = async (value: string) => {
    try {
      const response = await editAdvertService(value);
      setAdvertData((prevData) => {
        if (prevData) {
          return prevData.map((row: DataType) => {
            return row._id == value
              ? { ...row, status: response.data.data.status }
              : row;
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAdvert = async (value: string) => {
    try {
      const response = await deleteAdvertService(value);
      setAdvertData((prevData) => prevData?.filter((row) => row._id != value));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
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
    </>
  );
}
