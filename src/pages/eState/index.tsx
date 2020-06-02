import React from 'react';
import { Dispatch } from 'redux';
import { Card, Steps } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import { UserModelState } from '@/models/user';
import { StateType } from './model';
import Query from './Query';
import Result from './Result';
import styles from './style.less';

const { Step } = Steps;

interface PageViewProps {
  dispatch: Dispatch<any>;
  merNo?: string;
  current?: string;
  loading: boolean;
}

const getCurrentStepAndComponent = (current?: string) => {
  switch (current) {
    case 'result':
      return { step: 1, component: <Result /> };
    default:
      return { step: 0, component: <Query /> };
  }
};

const PageView: React.FC<PageViewProps> = props => {
  const { dispatch, merNo, current, loading } = props;

  const [stepComponent, setStepComponent] = React.useState<React.ReactNode>(<Query />);
  const [currentStep, setCurrentStep] = React.useState<number>(0);

  React.useEffect(() => {
    dispatch({
      type: 'eState/fetchMerSubs',
      payload: {
        merNo,
      },
    });
  }, [merNo]);

  React.useEffect(() => {
    const { step, component } = getCurrentStepAndComponent(current);
    setCurrentStep(step);
    setStepComponent(component);
  }, [current]);

  return (
    <PageHeaderWrapper title="Merchant E-statement">
      <Card bordered={false} loading={loading}>
        <>
          <Steps current={currentStep} className={styles.steps}>
            <Step title={formatMessage({ id: 'eState.step.query' })} />
            <Step title={formatMessage({ id: 'eState.step.download' })} />
          </Steps>
          {stepComponent}
        </>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(
  ({ user, eState, loading }: {
    user: UserModelState;
    eState: StateType;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    merNo: user.user.merNo,
    current: eState.current,
    loading: loading.models.eState,
  }),
)(PageView);
