import React from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import { Divider, Space, Tooltip } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import FullScreenIcon from './FullscreenIcon';
import styles from './index.less';

export interface ToolBarProps {
  title: string;
  options?: React.ReactNode[] | false;
  rootRef: React.RefObject<HTMLDivElement>;
  onReload: () => void;
}

const ToolBar: React.FC<ToolBarProps> = props => {
  const { title, options, rootRef, onReload } = props;
  return (
    <div className={styles.toolbar}>
      <div className={styles.title}>
        {title}
      </div>
      <div className={styles.option}>
        <Space>
          {options}
        </Space>
        <div className={styles.defaultoption}>
          {options && <Divider type="vertical" />}
          <Space>
            <span className={styles.itemicon} onClick={() => {
              if (!rootRef.current || !document.fullscreenEnabled) {
                return;
              }
              if (document.fullscreenElement) {
                document.exitFullscreen();
              } else {
                rootRef.current.requestFullscreen();
              }
            }}>
              <FullScreenIcon />
            </span>
            <span className={styles.itemicon} onClick={onReload}>
              <Tooltip title={formatMessage({ id: 'trans.option.reload' })}>
                <ReloadOutlined />
              </Tooltip>
            </span>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
