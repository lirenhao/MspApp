import React, { Suspense } from 'react';
import { Dispatch } from 'redux';
import { GridContent } from '@ant-design/pro-layout';
import { connect } from 'dva';
import PageLoading from './components/PageLoading';
import { StateType } from './model';
import { VisitDataType } from './data.d';

const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'));
const SalesCard = React.lazy(() => import('./components/SalesCard'));

interface AnalysisViewProps {
  dispatch: Dispatch<any>;
  salesData: VisitDataType[];
  loading: boolean;
}

const AnalysisView: React.FC<AnalysisViewProps> = props => {
  const { salesData, loading } = props;

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
)(AnalysisView);
