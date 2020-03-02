import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect } from 'umi';
import { UserModelState, MerInfo } from '@/models/user';

interface SecurityLayoutProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  merInfo: MerInfo;
}

const SecurityLayout: React.FC<SecurityLayoutProps> = props => {
  const { dispatch, loading, merInfo, children } = props;

  React.useEffect(() => {
    dispatch({ type: 'user/fetchMerInfo' });
  }, []);

  if (!loading && merInfo) {
    switch (merInfo.status) {
      case "01": {
        return <Redirect to="/init/policy"></Redirect>;
      }
      case "02": {
        return <Redirect to="/init/reset"></Redirect>;
      }
      case "03": {
        return <Redirect to="/init/reset"></Redirect>;
      }
      case "00": {
        return children as React.ReactElement;
      }
      default: {
        return <PageLoading />;
      }
    }
  } else {
    return <PageLoading />;
  }
}

export default connect(({
  user,
  loading,
}: {
  user: UserModelState;
  loading: { models: { [key: string]: boolean } };
}) => ({
  merInfo: user.merInfo,
  loading: loading.models.user,
}))(SecurityLayout);
