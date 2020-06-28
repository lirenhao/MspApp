import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { Spin, Card, Form, Select, DatePicker, Space, Button, Divider, Table } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { formatMessage } from 'umi-plugin-react/locale';
import moment from 'moment';
import { UserModelState } from '@/models/user';
import { StateType } from './model';
import { MerSubItem, Query, Result } from './data.d';
import styles from './style.less';

interface PageViewProps {
  dispatch: Dispatch<any>;
  merNo?: string;
  merSubs: MerSubItem[];
  query: Query;
  result: Partial<Result>;
  loading: boolean;
}

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

const RangeDateFormat: React.FC<Record<string, any>> = ({ value, format, onChange, ...rest }) => {
  const [dates, setDates] = React.useState([]);

  const disabledDate = (current: any) => {
    if (!dates || dates.length === 0) {
      return current >= moment().endOf('day') || current < moment().endOf('day').add('day', -30);
    }
    const tooLate = dates[0] && current.diff(moment(dates[0] as string, format), 'days') > 7;
    const tooEarly = dates[1] && moment(dates[1] as string, format).diff(current, 'days') > 7;
    return tooEarly || tooLate || current >= moment().endOf('day') || current < moment().endOf('day').add('day', -30);
  };

  return (
    <DatePicker.RangePicker {...rest}
      disabledDate={disabledDate}
      onCalendarChange={(date: any) => { setDates(date) }}
      value={value?.map((date: any) => date && date !== '' ? moment(date as string, format) : undefined)}
      onChange={dates => onChange(dates?.map(date => date ? date.format(format) : undefined))}
    />
  )
}

const PageView: React.FC<PageViewProps> = props => {
  const { dispatch, merNo, merSubs, query, result, loading } = props;

  React.useEffect(() => {
    dispatch({
      type: 'eState/fetchMerSubs',
      payload: {
        merNo,
      },
    });
  }, [merNo]);

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

  const handleQuery = (values: any) => {
    dispatch({
      type: 'eState/fetchResult',
      payload: values,
    });
  };

  const handleDownload = () => {
    dispatch({
      type: 'eState/fetchDownload',
      payload: {
        fileName: 'Settlement.pdf'
      },
    });
  };

  return (
    <PageHeaderWrapper title="Merchant E-statement">
      <Spin spinning={loading}>
        <Card bordered={false}>
          <Form
            {...formItemLayout}
            layout="horizontal"
            className={styles.stepForm}
            hideRequiredMark
            initialValues={{
              ...query,
              merNo,
            }}
            onFinish={handleQuery}
          >
            <Form.Item
              label={formatMessage({ id: 'eState.query.merNo.label' })}
              name="merNo"
              rules={[{ required: true, message: formatMessage({ id: 'eState.query.merNo.required' }) }]}
            >
              <Select placeholder={formatMessage({ id: 'eState.query.merNo.placeholder' })}>
                {merSubs?.map(sub => (
                  <Select.Option key={sub.merNo} value={sub.merNo}>{`${sub.merNo}[${sub.merName}]`}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label={formatMessage({ id: 'eState.query.settleDate.label' })}
              name="settleDate"
              rules={[
                { required: true, message: formatMessage({ id: 'eState.query.settleDate.required' }) },
              ]}
            >
              <RangeDateFormat format='YYYYMMDD' style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                xs: { span: 24, offset: 0 },
                sm: {
                  span: formItemLayout.wrapperCol.span,
                  offset: formItemLayout.labelCol.span,
                },
              }}
              noStyle={true}
            >
              <div style={{ textAlign: 'center' }}>
                <Space>
                  <Button type="primary" style={{ width: 96 }} htmlType="submit">
                    {formatMessage({ id: 'eState.option.query' })}
                  </Button>
                  <Button type="primary" style={{ width: 96 }}
                    onClick={handleDownload}
                    disabled={!(result.settles && result.settles.length > 0)}
                  >
                    {formatMessage({ id: 'eState.option.download' })}
                  </Button>
                </Space>
              </div>
            </Form.Item>
          </Form>
          <Divider style={{ margin: '40px 0 24px' }} />
          <div className={styles.desc}>
            <Table columns={columns} dataSource={result.settles} rowKey={record => `${record.merNo}${record.settleDate}${record.channel}`} />
          </div>
        </Card>
      </Spin>
    </PageHeaderWrapper >
  );
};

export default connect(
  ({ user, eState, loading }: {
    user: UserModelState;
    eState: StateType;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    merNo: user.user.merNo,
    merSubs: eState.merSubs,
    query: eState.query,
    result: eState.result,
    loading: loading.models.eState,
  }),
)(PageView);
