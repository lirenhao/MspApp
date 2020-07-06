import { LogoutOutlined, SettingOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { ClickParam } from 'antd/es/menu';
import React from 'react';
import { connect } from 'dva';
import { router } from 'umi';
import { formatMessage } from 'umi-plugin-react/locale';
import { ConnectProps, ConnectState } from '@/models/connect';
import { User } from '@/models/user';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export interface GlobalHeaderRightProps extends ConnectProps {
  user?: User;
  menu?: boolean;
}

class AvatarDropdown extends React.Component<GlobalHeaderRightProps> {
  onMenuClick = (event: ClickParam) => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: 'user/fetchLogout',
          callback: () => {
            window.location.href = `${process.env.SERVICE_CONTEXT || ''}/login?redirect=${process.env.SERVICE_CONTEXT || ''}/`;
          },
        });
      }

      return;
    }

    router.push(`/${key}`);
  };

  render(): React.ReactNode {
    const {
      user,
      menu,
    } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="center">
            <UserOutlined />
            个人中心
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="settings">
            <SettingOutlined />
            个人设置
          </Menu.Item>
        )}
        {menu && <Menu.Divider />}
        <Menu.Item key="modifyPwd">
          <LockOutlined />
          {formatMessage({ id: 'menu.modifyPwd' })}
        </Menu.Item>
        <Menu.Item key="logout">
          <LogoutOutlined />
          {formatMessage({ id: 'menu.logout' })}
        </Menu.Item>
      </Menu>
    );
    return user && user.merNo ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar}>Mer</Avatar>
          <span className={styles.name}>{user.merNo}</span>
        </span>
      </HeaderDropdown>
    ) : (
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      );
  }
}

export default connect(({ user }: ConnectState) => ({
  user: user.user,
}))(AvatarDropdown);
