import React from 'react';
import { Card, Col, Row } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import numeral from 'numeral';
import { VisitDataType } from '../data.d';
import { Bar } from './Charts';
import styles from '../style.less';

const rankingListData: { merNo: string; address: string; sales: number }[] = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    merNo: '123456789012345',
    address: formatMessage({ id: 'dashboardanalysis.analysis.test' }, { no: i }),
    sales: 323234,
  });
}

const SalesCard = ({
  salesData,
  loading,
}: {
  salesData: VisitDataType[];
  loading: boolean;
}) => (
    <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
      <br />
      <div className={styles.salesCard}>
        <Row>
          <Col xl={14} lg={12} md={12} sm={24} xs={24}>
            <div className={styles.salesBar}>
              <Bar
                height={295}
                title="Monthly Sales Overview"
                data={salesData}
              />
            </div>
          </Col>
          <Col xl={10} lg={12} md={12} sm={24} xs={24}>
            <div className={styles.salesRank}>
              <h4 className={styles.rankingTitle}>

              </h4>
              <ul className={styles.rankingList}>
                {rankingListData.map((item, i) => (
                  <li key={i}>
                    <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}>
                      {i + 1}
                    </span>
                    <span className={styles.rankingItemTitle} title={item.merNo}>
                      {item.merNo}
                    </span>
                    <span className={styles.rankingItemTitle} title={item.address}>
                      {item.address}
                    </span>
                    <span className={styles.rankingItemValue}>
                      {numeral(item.sales).format('0,0')}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );

export default SalesCard;
