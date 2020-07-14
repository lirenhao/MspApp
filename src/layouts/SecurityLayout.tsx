import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect } from 'umi';
import { UserModelState, User } from '@/models/user';

interface SecurityLayoutProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  user: User;
}

const SecurityLayout: React.FC<SecurityLayoutProps> = props => {
  const { dispatch, loading, user, children } = props;

  React.useEffect(() => {
    dispatch({ type: 'user/fetchUser' });
  }, []);

  if (!loading && user) {
    switch (user.status) {
      case "01": {
        return <Redirect to="/pre/init"></Redirect>;
      }
      case "02": {
        return <Redirect to="/pre/policy"></Redirect>;
      }
      case "03": {
        return <Redirect to="/pre/init"></Redirect>;
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
  user: user.user,
  loading: loading.models.user,
}))(SecurityLayout);
