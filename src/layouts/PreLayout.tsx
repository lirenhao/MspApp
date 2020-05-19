import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import ProLayout, {
  BasicLayoutProps as ProLayoutProps,
  Settings,
  DefaultFooter,
} from '@ant-design/pro-layout';
import { formatMessage } from 'umi-plugin-react/locale';
import { ConnectState } from '@/models/connect';
import RightContent from '@/components/GlobalHeader/RightContent';
import logo from '../assets/logo.svg';

export interface LayoutProps extends ProLayoutProps {
  settings: Settings;
  dispatch: Dispatch<any>;
}

const footerRender = () => (
  <DefaultFooter
    copyright="2020 copyright文本"
    links={[]}
  />
);

const PreLayout: React.FC<LayoutProps> = props => {
  const { settings, children } = props;

  return (
    <ProLayout
      logo={logo}
      footerRender={footerRender}
      rightContentRender={() => <RightContent />}
      {...settings}
    >
      {children}
    </ProLayout>
  )
};

export default connect(({ global, settings }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
}))(PreLayout);