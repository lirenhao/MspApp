import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

const FullScreenIcon = () => {
  const [fullscreen, setFullscreen] = React.useState<boolean>(false);

  React.useEffect(() => {
    document.onfullscreenchange = () => {
      setFullscreen(!!document.fullscreenElement);
    };
  }, []);

  return fullscreen ?
    (
      <Tooltip title={formatMessage({ id: 'trans.option.exitFullscreen' })}>
        <FullscreenExitOutlined />
      </Tooltip>
    ) :
    (
      <Tooltip title={formatMessage({ id: 'trans.option.fullscreen' })}>
        <FullscreenOutlined />
      </Tooltip>
    );
};

export default FullScreenIcon;
