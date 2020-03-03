import { Card, Col, Row, Tabs, Divider } from 'antd';

import React from 'react';
import numeral from 'numeral';
import BasePie from './BasePie';
import { TopSalesData } from '../data';
import styles from '../style.less';

const { TabPane } = Tabs;

const TopsSales = ({
  topsData,
  loading,
}: {
  topsData: TopSalesData;
  loading: boolean;
}) => {
  const [activeKey, setActiveKey] = React.useState<string>('trans');
  const { trans, revenue, income } = topsData;
  const basePieData = activeKey === 'trans' ? trans : revenue;
  return (
    <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
      <Row type="flex">
        <Col xl={8} lg={18} md={18} sm={24} xs={24}>
          <div className={styles.salesCard}>
            <Tabs onChange={setActiveKey} activeKey={activeKey}>
              <TabPane tab="TOP 5 transaction" key="trans">
                <div className={styles.salesRank}>
                  <h4 className={styles.rankingTitle}>
                    TOP 5 transaction
                  </h4>
                  <ul className={styles.rankingList}>
                    {trans.map((item, i) => (
                      <li key={item.name}>
                        <span className={styles.rankingItemTitle}>
                          {item.name}
                        </span>
                        <span className={styles.rankingItemTitle}>
                          {item.nick}
                        </span>
                        <span className={styles.rankingItemValue}>
                          {numeral(item.total).format('0,0')}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabPane>
              <TabPane tab="TOP 5 Revenue" key="revenue">
                <div className={styles.salesRank}>
                  <h4 className={styles.rankingTitle}>
                    TOP 5 Revenue
                  </h4>
                  <ul className={styles.rankingList}>
                    {revenue.map((item, i) => (
                      <li key={item.name}>
                        <span className={styles.rankingItemTitle}>
                          {item.name}
                        </span>
                        <span className={styles.rankingItemTitle}>
                          {item.nick}
                        </span>
                        <span className={styles.rankingItemValue}>
                          {numeral(item.total).format('0,0')}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </Col>
        <Col xl={8} lg={12} md={12} sm={24} xs={24}>
          <BasePie
            data={basePieData.filter((_, index) => index < 3).map(item => ({ label: item.nick, value: item.total }))}
            height={350}
          />
        </Col>
        <Col xl={8} lg={12} md={12} sm={24} xs={24}>
          <div className={styles.salesCard}>
            <div className={styles.salesRank}>
              <h4 className={styles.rankingTitle}>
                INCOME STATEMENT
              </h4>
              <ul className={styles.rankingList}>
                <li>
                  <span className={styles.rankingItemTitle}>
                    Revenue
                  </span>
                  <span className={styles.rankingItemValue}>
                    {numeral(income.revenue).format('0,0')}
                  </span>
                </li>
                <li>
                  <span className={styles.rankingItemTitle}>
                    Cost
                  </span>
                  <span className={styles.rankingItemValue}>
                    {numeral(income.cost).format('0,0')}
                  </span>
                </li>
                <Divider style={{ marginTop: '8px', marginBottom: '-8px' }} />
                <li>
                  <span className={styles.rankingItemTitle}>
                    GROSS PROFIT
                  </span>
                  <span className={styles.rankingItemValue}>
                    {numeral(income.grossProfit).format('0,0')}
                  </span>
                </li>
                <li>
                  <span className={styles.rankingItemTitle}>
                    OTHER INCOME
                  </span>
                  <span className={styles.rankingItemValue}>
                    {numeral(income.otherIncome).format('0,0')}
                  </span>
                </li>
                <li>
                  <span className={styles.rankingItemTitle}>
                    OTHER EXENES
                  </span>
                  <span className={styles.rankingItemValue}>
                    {numeral(income.otherExenes).format('0,0')}
                  </span>
                </li>
                <Divider style={{ marginTop: '8px', marginBottom: '-8px' }} />
                <li>
                  <span className={styles.rankingItemTitle}>
                    EBIT
                  </span>
                  <span className={styles.rankingItemValue}>
                    {numeral(income.ebit).format('0,0')}
                  </span>
                </li>
                <li>
                  <span className={styles.rankingItemTitle}>
                    Interest And Tax
                  </span>
                  <span className={styles.rankingItemValue}>
                    {numeral(income.interestAndTax).format('0,0')}
                  </span>
                </li>
                <Divider style={{ marginTop: '8px', marginBottom: '-8px' }} />
                <li>
                  <span className={styles.rankingItemTitle}>
                    NET PROFIT
                  </span>
                  <span className={styles.rankingItemValue}>
                    {numeral(income.netProfit).format('0,0')}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  )
};

export default TopsSales;
