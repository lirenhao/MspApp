import React, { Component, Suspense } from 'react';
import { Dispatch } from 'redux';
import { GridContent } from '@ant-design/pro-layout';
import { connect } from 'dva';
import PageLoading from './components/PageLoading';
import { StateType } from './model';
import { VisitDataType } from './data.d';

const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'));
const SalesCard = React.lazy(() => import('./components/SalesCard'));

interface DashboardAnalysisProps {
  dispatch: Dispatch<any>;
  salesData: VisitDataType[];
  loading: boolean;
}

class DashboardAnalysis extends Component<DashboardAnalysisProps> {

  // componentDidMount() {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'analysis/fetch',
  //   });
  // }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'analysis/clear',
    });
  }

  render() {
    const { salesData, loading } = this.props;

    return (
      <GridContent>
        <React.Fragment>
          <Suspense fallback={<PageLoading />}>
            <IntroduceRow loading={loading} />
          </Suspense>
          <Suspense fallback={null}>
            <SalesCard
              salesData={salesData}
              loading={loading}
            />
          </Suspense>
        </React.Fragment>
      </GridContent>
    );
  }
}

export default connect(
  ({
    analysis,
    loading,
  }: {
    analysis: StateType;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    salesData: analysis.salesData,
    loading: loading.models.analysis,
  }),
)(DashboardAnalysis);
