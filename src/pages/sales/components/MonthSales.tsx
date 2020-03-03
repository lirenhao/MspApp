import { Col, Row, Card, Avatar, Divider } from 'antd';
import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { Bar, Field, WaterWave } from './Charts';
import { MonthSalesData } from '../data';

const MonthSales = ({ loading, monthData }: { loading: boolean; monthData: MonthSalesData }) => (
  <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
    <Row gutter={24} type="flex">
      <Col xl={6} lg={12} md={12} sm={24} xs={24}>
        <Card bordered={false}>
          <Card.Meta
            avatar={<Avatar size="large" style={{ backgroundColor: 'rgba(24, 144, 255, 0.85)' }} icon="user-add" />}
            title={numeral(monthData.mers).format('0,0')}
            description="Merchant onboarding"
          />
          <Divider />
          <Card.Meta
            avatar={<Avatar size="large" style={{ backgroundColor: 'rgba(24, 144, 255, 0.85)' }} icon="bar-chart" />}
            title={numeral(monthData.point).format('0,0')}
            description="Touch point"
          />
          <Divider />
          <Card.Meta
            avatar={<Avatar size="large" style={{ backgroundColor: 'rgba(24, 144, 255, 0.85)' }} icon="database" />}
            title={numeral(monthData.revenue).format('0,0')}
            description="MDR Revenue"
          />
          <Divider />
          <Card.Meta
            avatar={<Avatar size="large" style={{ backgroundColor: 'rgba(24, 144, 255, 0.85)' }} icon="solution" />}
            title={numeral(monthData.trans).format('0,0')}
            description="Transation"
          />
        </Card>
      </Col>
      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
        <Card bordered={false}>
          <Card.Meta
            title={numeral(monthData.average).format('0,0')}
            description={`Average past months on ${moment(monthData.month, 'YYYYMM').format('YYYY')}`}
          />
          <br />
          <Bar height={250} title=""
            padding={[10, 30, 50, 60]}
            data={(monthData.pasts || []).map(item => ({ x: item.month, y: item.total }))} />
        </Card>
      </Col>
      <Col xl={6} lg={12} md={12} sm={24} xs={24}>
        <Card bordered={false}>
          <Field label="Target:" value={numeral(monthData.target).format('0,0')} />
          <Field label="Recent:" value={numeral(monthData.recent).format('0,0')} />
          <Divider />
          <WaterWave height={200} title=""
            percent={parseFloat(numeral((monthData.recent / monthData.target) * 100).format('0.00'))} />
        </Card>
      </Col>
    </Row>
  </Card>
);

export default MonthSales;
