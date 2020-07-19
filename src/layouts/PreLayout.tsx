import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import ProLayout, {
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import RightContent from '@/components/GlobalHeader/RightContent';
import Background from './Background';
import BasicFooter from './BasicFooter';
import logo from '../assets/logo.png';

export interface LayoutProps extends ProLayoutProps {
  settings: Settings;
  dispatch: Dispatch<any>;
}

const PreLayout: React.FC<LayoutProps> = props => {
  const { settings, children } = props;

  return (
    <Background>
      <ProLayout
        logo={logo}
        footerRender={() => <BasicFooter />}
        rightContentRender={() => <RightContent />}
        {...settings}
      >
        {children}
      </ProLayout>
    </Background>
  )
};

export default connect(({ global, settings }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
}))(PreLayout);