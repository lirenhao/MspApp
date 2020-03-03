import React from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import { Button } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { getLocale } from 'umi-plugin-react/locale';
import ProTable, { IntlProvider, zhCNIntl, enUSIntl, ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data.d';
import { queryRule } from './service';

import '@ant-design/compatible/assets/index.css';

interface TableListProps extends FormComponentProps { }

const TableList: React.FC<TableListProps> = () => {
  const [params, setParams] = React.useState({});
  const actionRef = React.useRef<ActionType>();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '规则名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'desc',
      hideInSearch: true,
    },
    {
      title: '服务调用次数',
      dataIndex: 'callNo',
      renderText: (val: string) => `${val} 万`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: { text: '关闭' },
        1: { text: '运行中' },
        2: { text: '已上线' },
        3: { text: '异常' },
      },
    },
    {
      title: '上次调度时间',
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
    },
  ];

  const handleDownload = async () => {
    console.log(params);
  };

  return (
    <PageHeaderWrapper>
      <IntlProvider value={getLocale() === 'en-US' ? enUSIntl : zhCNIntl}>
        <ProTable<TableListItem>
          headerTitle="交易查询"
          actionRef={actionRef}
          rowKey="key"
          toolBarRender={() => [
            <Button icon={<DownloadOutlined />} type="link" onClick={() => handleDownload()} />
          ]}
          options={{ density: false, fullScreen: true, reload: true, setting: false }}
          beforeSearchSubmit={(data) => {
            setParams(data)
            return data
          }}
          request={params => queryRule(params)}
          columns={columns}
        />
      </IntlProvider>
    </PageHeaderWrapper>
  );
};

export default Form.create<TableListProps>()(TableList);
