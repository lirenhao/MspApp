import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { Form, Input, Button, Divider, Table } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import moment from 'moment';
import { StateType } from '../model';
import { Query, Result } from '../data.d'
import styles from './index.less';

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

interface ResultViewProps {
  dispatch: Dispatch<any>;
  query: Query;
  result: Partial<Result>;
  loading: boolean;
}

const ResultView: React.FC<ResultViewProps> = (props) => {
  const { dispatch, query, result } = props;

  const handlePrev = () => {
    dispatch({
      type: 'eState/setCurrent',
      payload: 'query',
    });
  };

  const handleNext = () => {
    dispatch({
      type: 'eState/fetchDownload',
      payload: {
        fileName: 'Settlement.pdf'
      },
    });
  };

  const columns = [
    {
      title: formatMessage({ id: 'eState.channel.title' }),
      dataIndex: 'channel',
    },
    {
      title: formatMessage({ id: 'eState.settleDate.title' }),
      dataIndex: 'settleDate',
      render: (val: string) => moment(val, 'YYYYMMDD').format('DD-MM-YYYY'),
    },
    {
      title: formatMessage({ id: 'eState.tranAmt.title' }),
      dataIndex: 'tranAmt',
      render: (val: string) => `SG$${val}`,
    },
    {
      title: formatMessage({ id: 'eState.fee.title' }),
      dataIndex: 'fee',
      render: (val: string) => `SG$${val}`,
    },
    {
      title: formatMessage({ id: 'eState.settleAmt.title' }),
      dataIndex: 'settleAmt',
      render: (val: string) => `SG$${val}`,
    },
    {
      title: formatMessage({ id: 'eState.tranDate.title' }),
      dataIndex: 'settleDate',
      render: (val: string) => moment(val, 'YYYYMMDD').add(1, 'day').format('DD-MM-YYYY'),
    },
  ];

  return (
    <>
      <Form
        {...formItemLayout}
        layout="horizontal"
        className={styles.stepForm}
      >
        <Form.Item label={formatMessage({ id: 'eState.query.merNo' })} >
          <Input value={query.merNo} readOnly />
        </Form.Item>
        <Form.Item label={formatMessage({ id: 'eState.query.settleDate' })}>
          <Input value={`${moment(query.settleDate[0], 'YYYYMMDD').format('YYYY-MM-DD')} ~ ${moment(query.settleDate[1], 'YYYYMMDD').format('YYYY-MM-DD')}`} readOnly />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: 8 }}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
        >
          <Button type="primary" onClick={handleNext} disabled={!(result.settles && result.settles.length > 0)}>
            {formatMessage({ id: 'eState.option.download' })}
          </Button>
          <Button onClick={handlePrev} style={{ marginLeft: 8 }}>
            {formatMessage({ id: 'eState.option.back' })}
          </Button>
        </Form.Item>
      </Form>
      <Divider style={{ margin: '40px 0 24px' }} />
      <div className={styles.desc}>
        <Table columns={columns} dataSource={result.settles} rowKey={record => `${record.merNo}${record.settleDate}${record.channel}`} />
      </div>
    </>
  );
};
export default connect(
  ({
    eState,
    loading,
  }: {
    eState: StateType;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    query: eState.query,
    result: eState.result,
    loading: loading.models.eState,
  }),
)(ResultView);
