import React from 'react';
import { DownloadOutlined, LinkOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import { DatePicker, Table, Button } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { getLocale, formatMessage } from 'umi-plugin-react/locale';
import ProTable, { IntlProvider, zhCNIntl, enUSIntl, ProColumns, ActionType } from '@ant-design/pro-table';
import moment from 'moment';
import { SettleItem } from './data.d';
import { querySettle } from './service';

import '@ant-design/compatible/assets/index.css';

interface SettleProps extends FormComponentProps { }

const SettleList: React.FC<SettleProps> = () => {
  const [params, setParams] = React.useState({});
  const actionRef = React.useRef<ActionType>();

  const columns: ProColumns<SettleItem>[] = [
    {
      title: formatMessage({ id: 'settle.merNo.title' }),
      dataIndex: 'merNo',
    },
    {
      title: formatMessage({ id: 'settle.settleDate.title' }),
      dataIndex: 'settleDate',
      valueType: 'date',
      renderText: (val: string) => moment(val, 'YYYYMMDD').format('YYYY-MM-DD'),
      renderFormItem: (item, { onChange, ...rest }) => (
        <DatePicker style={{ width: '100%' }} showToday={false}
          disabledDate={(date) => date && date >= moment().endOf('day')}
          {...item.formItemProps} {...rest} onChange={onChange}
        />
      ),
    },
    {
      title: formatMessage({ id: 'settle.tranAmt.title' }),
      dataIndex: 'tranAmt',
      renderText: (val: number) => `SG$${val}`,
      hideInSearch: true,
    },
    {
      title: formatMessage({ id: 'settle.fee.title' }),
      dataIndex: 'fee',
      renderText: (val: number) => `SG$${val}`,
      hideInSearch: true,
    },
    {
      title: formatMessage({ id: 'settle.settleAmt.title' }),
      dataIndex: 'settleAmt',
      renderText: (val: number) => `SG$${val}`,
      hideInSearch: true,
    },
  ];

  const handleDownload = async () => {
    console.log(params);
  };

  const expandedRowRender = (record: SettleItem) => {
    const columns = [
      {
        title: formatMessage({ id: 'settle.merNo.title' }),
        dataIndex: 'merNo',
      },
      {
        title: formatMessage({ id: 'settle.settleDate.title' }),
        dataIndex: 'settleDate'
      },
      {
        title: formatMessage({ id: 'settle.tranAmt.title' }),
        dataIndex: 'tranAmt',
        render: (val: number) => `SG$${val}`,
      },
      {
        title: formatMessage({ id: 'settle.fee.title' }),
        dataIndex: 'fee',
        render: (val: number) => `SG$${val}`,
      },
      {
        title: formatMessage({ id: 'settle.settleAmt.title' }),
        dataIndex: 'settleAmt',
        render: (val: number) => `SG$${val}`,
      },
      {
        title: formatMessage({ id: 'settle.channel.title' }),
        dataIndex: 'channel',
      },
    ];
    if (record.subs && record.subs.length > 0) {
      return <Table columns={columns} dataSource={record.subs} pagination={false} />;
    } else {
      return <></>
    }
  };

  return (
    <PageHeaderWrapper>
      <IntlProvider value={getLocale() === 'en-US' ? enUSIntl : zhCNIntl}>
        <ProTable<SettleItem>
          headerTitle={formatMessage({ id: 'settle.query.result' })}
          actionRef={actionRef}
          rowKey="settleDate"
          expandable={{ expandedRowRender }}
          toolBarRender={() => [
            <Button icon={<LinkOutlined />} type="link" onClick={() => handleDownload()} >
              Ecommerce
            </Button>,
            <Button icon={<DownloadOutlined />} type="link" onClick={() => handleDownload()} />
          ]}
          options={{ density: false, fullScreen: true, reload: true, setting: false }}
          beforeSearchSubmit={(params) => {
            if (params.settleDate) {
              params.settleDate = moment(params.settleDate).format('YYYYMMDD');
            }
            setParams(params)
            return params
          }}
          request={async (params = {}) => {
            try {
              const result = await querySettle({
                ...params,
                size: params.pageSize,
                page: params.current as number - 1,
              });
              return {
                data: result.content,
                page: result.totalPages,
                total: result.totalElements,
                success: true,
              }
            } catch (err) {
              return {
                data: [],
                success: false,
              }
            }
          }}
          columns={columns}
        />
      </IntlProvider>
    </PageHeaderWrapper>
  );
};

export default Form.create<SettleProps>()(SettleList);
