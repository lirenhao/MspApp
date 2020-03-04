import { Card, Descriptions, Divider, Table } from 'antd';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { BasicProfileDataType } from './data';
import styles from './style.less';

interface ProfileBasicProps {
  loading: boolean;
  dispatch: Dispatch<any>;
  merInfo: BasicProfileDataType;
}
interface ProfileBasicState {
  visible: boolean;
}

class ProfileBasic extends Component<
  ProfileBasicProps,
  ProfileBasicState
  > {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profileBasic/fetchBasic',
    });
  }

  render() {
    const { merInfo, loading } = this.props;
    const { basicGoods } = merInfo;
    let goodsData: typeof basicGoods = [];
    if (basicGoods.length) {
      let num = 0;
      let amount = 0;
      basicGoods.forEach(item => {
        num += Number(item.num);
        amount += Number(item.amount);
      });
      goodsData = basicGoods.concat({
        id: '总计',
        num,
        amount,
      });
    }
    const renderContent = (value: any, row: any, index: any) => {
      const obj: {
        children: any;
        props: { colSpan?: number };
      } = {
        children: value,
        props: {},
      };
      if (index === basicGoods.length) {
        obj.props.colSpan = 0;
      }
      return obj;
    };
    const goodsColumns = [
      {
        title: '商品编号',
        dataIndex: 'id',
        key: 'id',
        render: (text: React.ReactNode, row: any, index: number) => {
          if (index < basicGoods.length) {
            return <a href="">{text}</a>;
          }
          return {
            children: <span style={{ fontWeight: 600 }}>总计</span>,
            props: {
              colSpan: 4,
            },
          };
        },
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        render: renderContent,
      },
      {
        title: '商品条码',
        dataIndex: 'barcode',
        key: 'barcode',
        render: renderContent,
      },
      {
        title: '单价',
        dataIndex: 'price',
        key: 'price',
        align: 'right' as 'left' | 'right' | 'center',
        render: renderContent,
      },
      {
        title: '数量（件）',
        dataIndex: 'num',
        key: 'num',
        align: 'right' as 'left' | 'right' | 'center',
        render: (text: React.ReactNode, row: any, index: number) => {
          if (index < basicGoods.length) {
            return text;
          }
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
      {
        title: '金额',
        dataIndex: 'amount',
        key: 'amount',
        align: 'right' as 'left' | 'right' | 'center',
        render: (text: React.ReactNode, row: any, index: number) => {
          if (index < basicGoods.length) {
            return text;
          }
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
    ];
    return (
      <PageHeaderWrapper extra={<a href="#">修改</a>}>
        <Card bordered={false}>
          <Descriptions title="商户信息" style={{ marginBottom: 32 }}>
            <Descriptions.Item label="商户号">18100000000</Descriptions.Item>
            <Descriptions.Item label="商户名称">付小小</Descriptions.Item>
            <Descriptions.Item label="网点名称">菜鸟仓储</Descriptions.Item>
            <Descriptions.Item label="入帐帐户">浙江省杭州市西湖区万塘路18号</Descriptions.Item>
            <Descriptions.Item label="备注">无</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>网点信息</div>
          <Table
            style={{ marginBottom: 24 }}
            pagination={false}
            loading={loading}
            dataSource={goodsData}
            columns={goodsColumns}
            rowKey="id"
          />
        </Card>
      </PageHeaderWrapper >
    );
  }
}

export default connect(
  ({
    merInfo,
    loading,
  }: {
    merInfo: BasicProfileDataType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    merInfo,
    loading: loading.effects['profileBasic/fetchBasic'],
  }),
)(ProfileBasic);
