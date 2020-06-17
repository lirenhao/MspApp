import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { Modal, Card, Descriptions, Table } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import moment from 'moment';
import { UserModelState } from '@/models/user';
import { SettleSubItem, SettleTranItem } from './data';
import { StateType } from './model';
import ToolBar from './toolBar';

interface TransViewProps {
  dispatch: Dispatch<any>;
  visible: boolean;
  onCancel(): void;
  sub: Partial<SettleSubItem>;
  trans: SettleTranItem[];
  loading: boolean;
}

const TransView: React.FC<TransViewProps> = props => {
  const { dispatch, visible, onCancel, sub, trans, loading } = props;

  const rootRef = React.useRef<HTMLDivElement>(null);

  const columns = [
    {
      title: formatMessage({ id: 'settle.settleDate.title' }),
      dataIndex: 'settleDate',
      render: (val: string) => moment(val, 'YYYYMMDD').format('YYYY-MM-DD'),
    },
    {
      title: formatMessage({ id: 'settle.merNo.title' }),
      dataIndex: 'merNo',
    },
    {
      title: formatMessage({ id: 'settle.termNo.title' }),
      dataIndex: 'termNo',
    },
    {
      title: formatMessage({ id: 'settle.cardNo.title' }),
      dataIndex: 'cardNo',
    },
    {
      title: formatMessage({ id: 'settle.tranName.title' }),
      dataIndex: 'tranName',
    },
    {
      title: formatMessage({ id: 'settle.tranAmt.title' }),
      dataIndex: 'tranAmt',
      render: (val: number) => `SG$${val}`,
    },
    {
      title: formatMessage({ id: 'settle.fee.title' }),
      dataIndex: 'fee',
      render: (val: number) => `SG$${val}`,
    },
    {
      title: formatMessage({ id: 'settle.settleAmt.title' }),
      dataIndex: 'settleAmt',
      render: (val: number) => `SG$${val}`,
    },
    {
      title: formatMessage({ id: 'settle.tranDate.title' }),
      dataIndex: 'tranDate',
      render: (val: string) => moment(val, 'YYYYMMDD').format('YYYY-MM-DD'),
    },
    {
      title: formatMessage({ id: 'settle.tranTime.title' }),
      dataIndex: 'tranTime',
      render: (val: string) => moment(val, 'hhmmss').format('hh:mm:ss'),
    },
    {
      title: formatMessage({ id: 'settle.batchNo.title' }),
      dataIndex: 'batchNo',
    },
    {
      title: formatMessage({ id: 'settle.authNo.title' }),
      dataIndex: 'authNo',
    },
    {
      title: formatMessage({ id: 'settle.traceNo.title' }),
      dataIndex: 'traceNo',
    },
    {
      title: formatMessage({ id: 'settle.rrn.title' }),
      dataIndex: 'rrn',
    },
    {
      title: formatMessage({ id: 'settle.channel.title' }),
      dataIndex: 'channel',
    },
  ];

  return (
    <Modal
      title={formatMessage({ id: 'settle.trans.detail' })}
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={1000}
      maskClosable={false}
      centered
    >
      <div ref={rootRef}>
        <Card bordered={false}
          style={{ height: '100%' }}
          bodyStyle={{ padding: 0 }}
        >
          <Descriptions size="default" bordered>
            <Descriptions.Item label={formatMessage({ id: 'settle.merNo.title' })}>{sub.merNo}</Descriptions.Item>
            <Descriptions.Item label={formatMessage({ id: 'settle.settleDate.title' })}>{sub.settleDate}</Descriptions.Item>
            <Descriptions.Item label={formatMessage({ id: 'settle.tranAmt.title' })}>{`SG$${sub.tranAmt}`}</Descriptions.Item>
            <Descriptions.Item label={formatMessage({ id: 'settle.fee.title' })}>{`SG$${sub.fee}`}</Descriptions.Item>
            <Descriptions.Item label={formatMessage({ id: 'settle.settleAmt.title' })}>{`SG$${sub.settleAmt}`}</Descriptions.Item>
            <Descriptions.Item label={formatMessage({ id: 'settle.channel.title' })}>{sub.channel}</Descriptions.Item>
          </Descriptions>
          <ToolBar
            title=""
            rootRef={rootRef}
            onReload={() => {
              dispatch({
                type: 'settle/fetchTrans',
                payload: sub,
              })
            }}
          />
          <Table<SettleTranItem>
            rowKey={record => record.settleDate + record.merNo + record.traceNo}
            columns={columns}
            dataSource={trans}
            scroll={{ x: 'max-content' }}
            pagination={{ showTotal: (total: number, range: number[]) => `${range[0]}-${range[1]} of ${total} items`, }}
            loading={loading}
          />
        </Card>
      </div>
    </Modal>
  );
}

export default connect(
  ({ user, settle, loading }: {
    user: UserModelState;
    settle: StateType,
    loading: { models: { [key: string]: boolean } };
  }) => ({
    merNo: user.user.merNo,
    sub: settle.sub,
    trans: settle.trans,
    loading: loading.models.settle,
  }),
)(TransView);
