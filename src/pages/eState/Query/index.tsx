import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { Form, Button, Divider, Select, DatePicker } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import moment from 'moment';
import { UserModelState } from '@/models/user';
import { StateType } from '../model';
import { MerSubItem, Query } from '../data.d';
import styles from './index.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

const RangeDateFormat: React.FC<Record<string, any>> = ({ value, format, onChange, ...rest }) => {
  const disabledDate = (current: any) => {
    if (!value || value.length === 0) {
      return false;
    }
    const tooLate = value[0] && current.diff(moment(value[0] as string, format), 'days') > 7;
    const tooEarly = value[1] && moment(value[1] as string, format).diff(current, 'days') > 7;
    return tooEarly || tooLate || current >= moment().endOf('day').add(-1, 'day');
  };
  return (
    <RangePicker {...rest}
      disabledDate={disabledDate}
      value={value?.map((date: any) => date && date !== '' ? moment(date as string, format) : undefined)}
      onChange={dates => onChange(dates?.map(date => date ? date.format(format) : undefined))}
    />
  )
}

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

interface QueryViewProps {
  dispatch: Dispatch<any>;
  merNo?: string;
  merSubs: MerSubItem[];
  query: Query;
  loading: boolean;
}

const QueryView: React.FC<QueryViewProps> = props => {
  const { dispatch, merNo, query, merSubs } = props;

  const handleNext = (values: any) => {
    dispatch({
      type: 'eState/fetchResult',
      payload: values,
    });
  };

  return (
    <>
      <Form
        {...formItemLayout}
        layout="horizontal"
        className={styles.stepForm}
        hideRequiredMark
        initialValues={{
          ...query,
          merNo,
        }}
        onFinish={handleNext}
      >
        <Form.Item
          label={formatMessage({ id: 'eState.query.merNo' })}
          name="merNo"
          rules={[{ required: true, message: '请选择商户号' }]}
        >
          <Select placeholder="请选择商户号">
            {merSubs?.map(sub => (
              <Option key={sub.merNo} value={sub.merNo}>{`${sub.merNo}[${sub.merName}]`}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={formatMessage({ id: 'eState.query.settleDate' })}
          name="settleDate"
          rules={[
            { required: true, message: '请选择结算' },
          ]}
        >
          <RangeDateFormat format='YYYYMMDD' style={{ width: '100%' }} allowClear={false} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
        >
          <Button type="primary" htmlType="submit">
            {formatMessage({ id: 'eState.option.next' })}
          </Button>
        </Form.Item>
      </Form>
      <Divider style={{ margin: '40px 0 24px' }} />
      <div className={styles.desc}>
        <h3>说明</h3>
        <h4>模块一</h4>
        <p>
          如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
        </p>
        <h4>模块二</h4>
        <p>
          如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
        </p>
      </div>
    </>
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
    loading: loading.models.eState,
  }))(QueryView);
