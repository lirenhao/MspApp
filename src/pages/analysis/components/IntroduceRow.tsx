import React from 'react';
import { Col, Row } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import numeral from 'numeral';
import { ChartCard, Pie } from './Charts';
import Yuan from '../utils/Yuan';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow = ({ loading }: { loading: boolean }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="2020"
        avatar={
          <img
            alt="indicator"
            style={{ width: 56, height: 56 }}
            src="https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png"
          />
        }
        loading={loading}
        total={numeral(8846).format('0,0')}
        footer={<>Total Transaction Count</>}
        contentHeight={60}
      >
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="2020"
        avatar={
          <img
            alt="indicator"
            style={{ width: 56, height: 56 }}
            src="https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png"
          />
        }
        total={() => <Yuan>126560</Yuan>}
        footer={<>Total Transaction Volume</>}
        contentHeight={60}
      >
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="2020"
        avatar={
          <img
            alt="indicator"
            style={{ width: 56, height: 56 }}
            src="https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png"
          />
        }
        total={() => <Yuan>126560</Yuan>}
        footer={<>Total Settlement Volume</>}
        contentHeight={60}
      >
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <Pie
        hasLegend
        data={[{ x: 'On-us', y: 10 }, { x: 'Off-us', y: 20 },]}
        height={60}
        inner={0}
      />
    </Col>
  </Row>
);

export default IntroduceRow;
