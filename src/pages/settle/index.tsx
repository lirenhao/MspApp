import React from 'react';
import { DownloadOutlined, LinkOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import { Table, Button } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { getLocale } from 'umi-plugin-react/locale';
import ProTable, { IntlProvider, zhCNIntl, enUSIntl, ProColumns, ActionType } from '@ant-design/pro-table';
import moment from 'moment';
import { TableListItem } from './data.d';
import { querySettle } from './service';

import '@ant-design/compatible/assets/index.css';

interface TableListProps extends FormComponentProps { }

const TableList: React.FC<TableListProps> = () => {
  const [params, setParams] = React.useState({});
  const actionRef = React.useRef<ActionType>();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'settlementDate',
      dataIndex: 'settlementDate',
      valueType: 'dateRange',
    },
    {
      title: 'settlementNumber',
      dataIndex: 'settlementNumber',
      hideInSearch: true,
    },
    {
      title: 'totalCharge',
      dataIndex: 'totalCharge',
      renderText: (val: number) => `SG$${val}`,
      hideInSearch: true,
    },
    {
      title: 'creait',
      dataIndex: 'creait',
      renderText: (val: number) => `SG$${val}`,
      hideInSearch: true,
    },
    {
      title: 'submissionAmount',
      dataIndex: 'submissionAmount',
      renderText: (val: number) => `SG$${val}`,
      hideInSearch: true,
    },
    {
      title: 'discountAmount',
      dataIndex: 'discountAmount',
      renderText: (val: number) => `SG$${val}`,
      hideInSearch: true,
    },
    {
      title: 'feesAndIncentives',
      dataIndex: 'feesAndIncentives',
      renderText: (val: number) => `SG$${val}`,
      hideInSearch: true,
    },
    {
      title: 'chargeBacks',
      dataIndex: 'chargeBacks',
      renderText: (val: number) => `SG$${val}`,
      hideInSearch: true,
    },
    {
      title: 'adjustments',
      dataIndex: 'adjustments',
      renderText: (val: number) => `SG$${val}`,
      hideInSearch: true,
    },
  ];

  const handleDownload = async () => {
    console.log(params);
  };

  const expandedRowRender = (record: TableListItem) => {
    const columns = [
      { title: '结算日期', dataIndex: 'settlementDate'  },
      { title: '信用日期', dataIndex: 'creditDate'  },
      { title: '总交易金额', dataIndex: 'totalAmt'  },
      { title: 'MDR', dataIndex: 'mdr'  },
      { title: '退款', dataIndex: 'refundAmt'  },
      { title: '调整', dataIndex: 'upgrade'  },
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
        <ProTable<TableListItem>
          headerTitle="Settlement Summary"
          actionRef={actionRef}
          rowKey="settlementDate"
          expandable={{ expandedRowRender }}
          toolBarRender={() => [
            <Button icon={<LinkOutlined />} type="link" onClick={() => handleDownload()} >
              Ecommerce
            </Button>,
            <Button icon={<DownloadOutlined />} type="link" onClick={() => handleDownload()} />
          ]}
          options={{ density: false, fullScreen: true, reload: true, setting: false }}
          beforeSearchSubmit={(params) => {
            if (params.settlementDate) {
              const data = {
                ...params,
                settlementDate: moment(params.settlementDate).format("YYYYMMDD"),
              }
              setParams(data)
              return data
            }
            setParams(params)
            return params
          }}
          request={params => querySettle(params)}
          columns={columns}
        />
      </IntlProvider>
    </PageHeaderWrapper>
  );
};

export default Form.create<TableListProps>()(TableList);
