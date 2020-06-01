import { Card, Descriptions, Divider, Table } from 'antd';
import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { Dispatch } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { MerData } from './data.d';
import styles from './style.less';

interface MerInfoProps {
  loading: boolean;
  dispatch: Dispatch<any>;
  merInfo: MerData;
}
interface MerInfoState {
  visible: boolean;
}

class MerInfo extends Component<MerInfoProps, MerInfoState> {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'merInfo/fetch',
    });
  }

  render() {
    const { loading, merInfo } = this.props;
    const termColumns = [
      {
        title: formatMessage({ id: 'merInfo.merNo.title' }),
        dataIndex: 'merNo',
        key: 'merNo',
      },
      {
        title: formatMessage({ id: 'merInfo.termNo.title' }),
        dataIndex: 'termNo',
        key: 'termNo',
      },
      {
        title: formatMessage({ id: 'merInfo.serialNumber.title' }),
        dataIndex: 'serialNumber',
        key: 'serialNumber',
      },
      {
        title: formatMessage({ id: 'merInfo.termAddress.title' }),
        dataIndex: 'termAddress',
        key: 'termAddress',
      },
      {
        title: formatMessage({ id: 'merInfo.status.title' }),
        dataIndex: 'status',
        key: 'status',
      },
    ];
    return (
      <PageHeaderWrapper extra={<a href="#">{formatMessage({ id: 'merInfo.revise' })}</a>}>
        <Card bordered={false}>
          <Descriptions column={2} title={formatMessage({ id: 'merInfo.title' })} style={{ marginBottom: 32 }}>
            <Descriptions.Item label={formatMessage({ id: 'merInfo.merName.title' })}>{merInfo.merName}</Descriptions.Item>
            <Descriptions.Item label={formatMessage({ id: 'merInfo.merAddress.title' })}>{merInfo.merAddress}</Descriptions.Item>
            {/* <Descriptions.Item label={formatMessage({ id: 'merInfo.merNameAbbr.title' })}>{merInfo.merNameAbbr}</Descriptions.Item>
            <Descriptions.Item label={formatMessage({ id: 'merInfo.accountNo.title' })}>{merInfo.accountNo}</Descriptions.Item> */}
            <Descriptions.Item label={formatMessage({ id: 'merInfo.merNo.title' })}>{merInfo.merNo}</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />
          <Descriptions column={2} title={formatMessage({ id: 'merInfo.contact.title' })}>
            <Descriptions.Item label={formatMessage({ id: 'merInfo.contactName.title' })}>{merInfo.contactName}</Descriptions.Item>
            <Descriptions.Item label={formatMessage({ id: 'merInfo.contactPhone.title' })}>{merInfo.contactPhone}</Descriptions.Item>
            <Descriptions.Item label={formatMessage({ id: 'merInfo.contactEmail.title' })}>{merInfo.contactEmail}</Descriptions.Item>
            <Descriptions.Item label={formatMessage({ id: 'merInfo.contactTax.title' })}>{merInfo.contactTax}</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>{formatMessage({ id: 'merInfo.term.title' })}</div>
          <Table
            style={{ marginBottom: 24 }}
            scroll={{ y: 300 }}
            pagination={false}
            loading={loading}
            dataSource={merInfo.terms}
            columns={termColumns}
            rowKey="termNo"
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
    merInfo: MerData;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    merInfo,
    loading: loading.effects['merInfo/fetch'],
  }),
)(MerInfo);
