import React from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import { Button } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { getLocale, formatMessage } from 'umi-plugin-react/locale';
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
      title: formatMessage({ id: 'trans.merNo.title' }),
      dataIndex: 'merNo',
      hideInSearch: true,
    },
    {
      title: formatMessage({ id: 'trans.termNo.title' }),
      dataIndex: 'termNo',
    },
    {
      title: formatMessage({ id: 'trans.cardStatus.title' }),
      dataIndex: 'cardStatus',
      valueEnum: {
        '00': { text: formatMessage({ id: 'trans.cardStatus.credit' }) },
        '01': { text: formatMessage({ id: 'trans.cardStatus.debit' }) },
      },
    },
    {
      title: formatMessage({ id: 'trans.cardNo.title' }),
      dataIndex: 'cardNo',
      hideInSearch: true,
    },
    {
      title: formatMessage({ id: 'trans.tranAmt.title' }),
      dataIndex: 'tranAmt',
      renderText: (val: string) => `SG$${val}`,
    },
    {
      title: formatMessage({ id: 'trans.tranType.title' }),
      dataIndex: 'tranType',
      valueEnum: {
        '00': { text: formatMessage({ id: 'trans.tranType.pay' }) },
        '01': { text: formatMessage({ id: 'trans.tranType.refund' }) },
        '02': { text: formatMessage({ id: 'trans.tranType.revoke' }) },
      },
    },
    {
      title: formatMessage({ id: 'trans.tranStatus.title' }),
      dataIndex: 'tranStatus',
      valueEnum: {
        '00': { text: formatMessage({ id: 'trans.tranStatus.success' }) },
        '01': { text: formatMessage({ id: 'trans.tranStatus.fail' }) },
      },
    },
    {
      title: formatMessage({ id: 'trans.tranDate.title' }),
      dataIndex: 'tranDate',
      valueType: 'dateRange',
      renderText: (val: string) => moment(val, 'YYYYMMDD').format('YYYY-MM-DD'),
    },

    {
      title: formatMessage({ id: 'trans.tranTime.title' }),
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
          headerTitle={formatMessage({ id: 'trans.query.result' })}
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
