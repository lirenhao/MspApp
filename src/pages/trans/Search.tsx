import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { Card, Form, Row, Col, Input, DatePicker, Select, Space, Button } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { formatMessage } from 'umi-plugin-react/locale';
import moment from 'moment';
import { TransQuery } from './data';
import { StateType } from './model';

interface SearchProps {
  dispatch: Dispatch<any>;
  form: FormInstance;
  query: TransQuery;
  loading: boolean;
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
  const { dispatch, form, query } = props;

  const handleSumbit = (values: any) => {
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
        initialValues={query}
        onFinish={handleSumbit}
      >
        <Row gutter={16} justify="start">
          <Col {...defaultColConfig} >
            <Form.Item {...layout} label={formatMessage({ id: 'trans.merNo.title' })} name="merNO">
              <Input placeholder="" />
            </Form.Item>
          </Col>
          <Col {...defaultColConfig} >
            <Form.Item {...layout} label={formatMessage({ id: 'trans.termNo.title' })} name="termNo">
              <Input placeholder="" />
            </Form.Item>
          </Col>
          <Col {...defaultColConfig} >
            <Form.Item {...layout} label={formatMessage({ id: 'trans.tranType.title' })} name="tranType">
              <DatePicker style={{ width: '100%' }} showToday={false}
                disabledDate={(date) => date && date >= moment().endOf('day')}
                placeholder={formatMessage({ id: 'trans.tranDate.placeholder' })}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} justify="start">
          <Col {...defaultColConfig} >
            <Form.Item {...layout} label={formatMessage({ id: 'trans.respCode.title' })} name="respCode">
              <Input placeholder="" />
            </Form.Item>
          </Col>
          <Col {...defaultColConfig} >
            <Form.Item {...layout} label={formatMessage({ id: 'trans.tranDate.title' })} name="tranDate">
              <DatePicker style={{ width: '100%' }} showToday={false}
                disabledDate={(date) => date && date >= moment().endOf('day')}
                placeholder={formatMessage({ id: 'trans.tranDate.placeholder' })}
              />
            </Form.Item>
          </Col>
          <Col {...defaultColConfig} style={{ textAlign: 'right' }}>
            <Form.Item {...tailLayout}>
              <Space>
                <Button type="primary" htmlType="submit">查询</Button>
                <Button onClick={() => form.resetFields()}>重置</Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

export default connect(
  ({ trans, loading }: {
    trans: StateType,
    loading: { models: { [key: string]: boolean } };
  }) => ({
    query: trans.query,
    loading: loading.models.trans,
  }),
)(SearchView);
