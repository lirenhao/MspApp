import React, { Component, Suspense } from 'react';
import { Card, DatePicker } from 'antd';
import { Dispatch } from 'redux';
import moment from 'moment';
import { GridContent } from '@ant-design/pro-layout';
import { connect } from 'dva';
import PageLoading from './components/PageLoading';
import { ModelState } from './model';

const MonthSales = React.lazy(() => import('./components/MonthSales'));
const TopsSales = React.lazy(() => import('./components/TopsSales'));

interface SalesProps {
  sales: ModelState;
  dispatch: Dispatch<any>;
  loading: boolean;
}

interface SalesState {
  monthValue: string;
}

@connect(
  ({
    sales,
    loading,
  }: {
    sales: any;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    sales,
    loading: loading.models.sales,
  }),
)
class Sales extends Component<
SalesProps,
SalesState
> {
  state: SalesState = {
    monthValue: moment(new Date()).format("YYYYMM"),
  };

  reqRef: number = 0;

  timeoutId: number = 0;

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'sales/fetchMonth',
        payload: moment(new Date()).format("YYYYMM"),
      });
      dispatch({
        type: 'sales/fetchTops',
      });
    });
  }

  handleMonthChange = (_: moment.Moment | null, dateString: string) => {
    const { dispatch } = this.props;
    this.setState({
      monthValue: dateString
    })
    console.log(dateString);
    dispatch({
      type: 'sales/fetchMonth',
      payload: dateString,
    });
  };

  render() {
    const { monthValue } = this.state;
    const { sales, loading } = this.props;
    const { month, tops } = sales;

    return (
      <GridContent>
        <React.Fragment>
          <Suspense fallback={<PageLoading />}>
            <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }} title={
              <DatePicker.MonthPicker onChange={this.handleMonthChange} value={moment(monthValue, "YYYYMM")} format="YYYYMM" />
            }>
              <MonthSales loading={loading} monthData={month} />
            </Card>
          </Suspense>
          <Suspense fallback={<PageLoading />}>
            <TopsSales loading={loading} topsData={tops} />
          </Suspense>
        </React.Fragment>
      </GridContent>
    );
  }
}

export default Sales;
