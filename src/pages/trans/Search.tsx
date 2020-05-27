import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { Card, Form, Row, Col, Input, DatePicker, Select, Space, Button } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { FormInstance } from 'antd/lib/form';
import moment from 'moment';
import { UserModelState } from '@/models/user';
import { TransQuery, MerSubItem } from './data';
import { StateType } from './model';

interface SearchProps {
  dispatch: Dispatch<any>;
  merNo?: string;
  query: TransQuery;
  merSubs: MerSubItem[];
  form: FormInstance;
}

const DateFormat: React.FC<Record<string, any>> = ({ value, format, onChange, ...rest }) => {
  return (
    <DatePicker {...rest}
      value={value && value !== '' ? moment(value as string, format) : null}
      onChange={date => onChange(date ? date.format(format) : '')}
    />
  )
}

const defaultColConfig = {
  lg: 8,
  md: 12,
  xxl: 8,
  xl: 8,
  sm: 12,
  xs: 24,
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { span: 24 },
};

const SearchView: React.FC<SearchProps> = props => {
  const { dispatch, form, merNo, query, merSubs } = props;

  const handleSubmit = (values: any) => {
    dispatch({
      type: 'trans/fetchQuery',
      payload: {
        ...values,
        page: 0,
        size: query.size,
      },
    })
  }

  return (
    <Card style={{ marginBottom: '20px' }} bodyStyle={{ paddingBottom: 0 }}>
      <Form
        form={form}
        initialValues={{
          ...query,
          merNo,
        }}
        onFinish={handleSubmit}
      >
        <Row gutter={16} justify="start">
          <Col {...defaultColConfig} >
            <Form.Item
              name="merNo" {...layout}
              label={formatMessage({ id: 'trans.merNo.title' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'trans.merNo.required' })
                }
              ]}
            >
              <Select placeholder={formatMessage({ id: 'settle.merNo.placeholder' })}>
                {merSubs?.map(sub => (
                  <Select.Option key={sub.merNo} value={sub.merNo}>{sub.merName}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col {...defaultColConfig} >
            <Form.Item {...layout} label={formatMessage({ id: 'trans.termNo.title' })} name="termNo">
              <Input placeholder={formatMessage({ id: 'trans.termNo.placeholder' })} />
            </Form.Item>
          </Col>
          <Col {...defaultColConfig} >
            <Form.Item {...layout} label={formatMessage({ id: 'trans.tranType.title' })} name="tranType">
              <Select placeholder={formatMessage({ id: 'trans.tranType.placeholder' })} allowClear={true}>
                <Select.Option value='00'>消费</Select.Option>
                <Select.Option value='01'>撤销</Select.Option>
                <Select.Option value='02'>退货</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} justify="start">
          <Col {...defaultColConfig} >
            <Form.Item {...layout} label={formatMessage({ id: 'trans.respCode.title' })} name="respCode">
              <Select placeholder={formatMessage({ id: 'trans.respCode.placeholder' })} allowClear={true}>
                <Select.Option value='00'>成功</Select.Option>
                <Select.Option value='01'>失败</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col {...defaultColConfig} >
            <Form.Item
              {...layout} name="tranDate"
              label={formatMessage({ id: 'trans.tranDate.title' })}
            >
              <DateFormat style={{ width: '100%' }} showToday={false} allowClear={false} format="YYYYMMDD"
                placeholder={formatMessage({ id: 'trans.tranDate.placeholder' })}
                disabledDate={(date: moment.Moment) => date && (date >= moment().endOf('day') || date < moment().add('day', -30))}
              />
            </Form.Item>
          </Col>
          <Col {...defaultColConfig} style={{ textAlign: 'right' }}>
            <Form.Item {...tailLayout}>
              <Space>
                <Button type="primary" htmlType="submit">{formatMessage({ id: 'trans.query.submit' })}</Button>
                <Button onClick={() => form.resetFields()}>{formatMessage({ id: 'trans.query.reset' })}</Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

export default connect(
  ({ user, trans }: {
    user: UserModelState;
    trans: StateType,
  }) => ({
    merNo: user.user.merNo,
    query: trans.query,
    merSubs: trans.merSubs,
  }),
)(SearchView);
