import React, { Suspense } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { Col, Row, Card } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { GridContent } from '@ant-design/pro-layout';
import numeral from 'numeral';
import PageLoading from './components/PageLoading';
import { ChartCard, Pie, Bar } from './components/Charts';
import { StateType } from './model';
import { TotalData, MonthData, TopData } from './data.d';

import styles from './style.less';

const totalColProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 8,
  style: { marginBottom: 24 },
};

interface AnalysisViewProps {
  dispatch: Dispatch<any>;
  total: TotalData;
  months: MonthData[];
  tops: TopData[];
  loading: boolean;
}

const AnalysisView: React.FC<AnalysisViewProps> = props => {
  const { dispatch, total, months, tops, loading } = props;

  React.useEffect(() => {
    dispatch({ type: 'analysis/fetchTotal' });
    dispatch({ type: 'analysis/fetchMonths' });
    dispatch({ type: 'analysis/fetchTops' });
  }, []);

  return (
    <GridContent>
      <React.Fragment>
        <Suspense fallback={<PageLoading />}>
          <Row gutter={24}>
            <Col {...totalColProps}>
              <ChartCard
                bordered={false}
                title={total.year}
                avatar={
                  <img
                    alt="indicator"
                    style={{ width: 56, height: 56 }}
                    src="https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png"
                  />
                }
                loading={loading}
                total={numeral(total.count).format('0,0')}
                footer={<>{formatMessage({ id: 'analysis.total.tran.count' })}</>}
                contentHeight={60}
              >
              </ChartCard>
            </Col>
            <Col {...totalColProps}>
              <ChartCard
                bordered={false}
                loading={loading}
                title={total.year}
                avatar={
                  <img
                    alt="indicator"
                    style={{ width: 56, height: 56 }}
                    src="https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png"
                  />
                }
                total={() => `S$${numeral(total.trans).format('0,0.00')}`}
                footer={<>{formatMessage({ id: 'analysis.total.tran.volume' })}</>}
                contentHeight={60}
              >
              </ChartCard>
            </Col>
            <Col {...totalColProps}>
              <ChartCard
                bordered={false}
                loading={loading}
                title={total.year}
                avatar={
                  <img
                    alt="indicator"
                    style={{ width: 56, height: 56 }}
                    src="https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png"
                  />
                }
                total={() => `S$${numeral(total.settle).format('0,0.00')}`}
                footer={<>{formatMessage({ id: 'analysis.total.settle.volume' })}</>}
                contentHeight={60}
              >
              </ChartCard>
            </Col>
            <Col {...totalColProps}>
              <Card bordered={false}>
                <Pie
                  hasLegend
                  data={[{ x: 'On-us', y: 10 }, { x: 'Off-us', y: 20 },]}
                  height={160}
                  inner={0}
                />
              </Card>
            </Col>
          </Row>
        </Suspense>
        <Suspense fallback={null}>
          <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
            <br />
            <div className={styles.salesCard}>
              <Row>
                <Col xl={14} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesBar}>
                    <Bar
                      height={295}
                      title={formatMessage({ id: 'analysis.month.sales' })}
                      data={months.map(item => ({ x: `${item.month}月`, y: item.sales }))}
                    />
                  </div>
                </Col>
                <Col xl={10} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesRank}>
                    <h4 className={styles.rankingTitle}>

                    </h4>
                    <ul className={styles.rankingList}>
                      {tops.map((item, i) => (
                        <li key={i}>
                          <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}>
                            {i + 1}
                          </span>
                          <span className={styles.rankingItemTitle} title={item.merNo}>
                            {item.merNo}
                          </span>
                          <span className={styles.rankingItemTitle} title={item.merName}>
                            {item.merName}
                          </span>
                          <span className={styles.rankingItemValue}>
                            {numeral(item.sales).format('0,0.00')}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Col>
              </Row>
            </div>
          </Card>
        </Suspense>
      </React.Fragment>
    </GridContent>
  );
}

export default connect(
  ({
    analysis,
    loading,
  }: {
    analysis: StateType;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    total: analysis.total,
    months: analysis.months,
    tops: analysis.tops,
    loading: loading.models.analysis,
  }),
)(AnalysisView);
