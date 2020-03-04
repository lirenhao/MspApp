import React from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import { Button } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { getLocale } from 'umi-plugin-react/locale';
import ProTable, { IntlProvider, zhCNIntl, enUSIntl, ProColumns, ActionType } from '@ant-design/pro-table';
import moment from 'moment';
import { TableListItem } from './data.d';
import { queryTrans } from './service';

import '@ant-design/compatible/assets/index.css';

interface TableListProps extends FormComponentProps { }

const TableList: React.FC<TableListProps> = () => {
  const [params, setParams] = React.useState({});
  const actionRef = React.useRef<ActionType>();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'merNo',
      dataIndex: 'merNo',
      hideInSearch: true,
    },
    {
      title: 'termNo',
      dataIndex: 'termNo',
    },
    {
      title: 'cardStatus',
      dataIndex: 'cardStatus',
      valueEnum: {
        0: { text: '关闭' },
        1: { text: '运行中' },
        2: { text: '已上线' },
        3: { text: '异常' },
      },
    },
    {
      title: 'cardNo',
      dataIndex: 'cardNo',
      hideInSearch: true,
    },
    {
      title: 'tranAmt',
      dataIndex: 'tranAmt',
      renderText: (val: string) => `SG$${val}`,
    },
    {
      title: 'tranType',
      dataIndex: 'tranType',
      valueEnum: {
        0: { text: '关闭' },
        1: { text: '运行中' },
        2: { text: '已上线' },
        3: { text: '异常' },
      },
    },
    {
      title: 'tranStatus',
      dataIndex: 'tranStatus',
      valueEnum: {
        0: { text: '关闭' },
        1: { text: '运行中' },
        2: { text: '已上线' },
        3: { text: '异常' },
      },
    },
    {
      title: 'tranDate',
      dataIndex: 'tranDate',
      valueType: 'dateRange',
      renderText: (val: string) => moment(val, 'YYYYMMDD').format('YYYY-MM-DD'),
    },

    {
      title: 'tranTime',
      dataIndex: 'tranTime',
      renderText: (val: string) => moment(val, 'HHmmss').format('HH:mm:ss'),
      hideInSearch: true,
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
          request={params => queryTrans(params)}
          columns={columns}
        />
      </IntlProvider>
    </PageHeaderWrapper>
  );
};

export default Form.create<TableListProps>()(TableList);
