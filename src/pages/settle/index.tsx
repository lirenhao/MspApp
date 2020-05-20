import React from 'react';
import { DownloadOutlined, LinkOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import { DatePicker, Table, Button, notification } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { getLocale, formatMessage } from 'umi-plugin-react/locale';
import ProTable, { IntlProvider, zhCNIntl, enUSIntl, ProColumns, ActionType } from '@ant-design/pro-table';
import moment from 'moment';
import { SettleItem } from './data.d';
import { querySettle, downloadSettle } from './service';

import '@ant-design/compatible/assets/index.css';

interface SettleProps extends FormComponentProps { }

const SettleList: React.FC<SettleProps> = () => {
  const [params, setParams] = React.useState({});
  const [isDownload, setIsDownload] = React.useState(false);

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

  const handleDownload = async () => {
    setIsDownload(true);
    try {
      const resp = await downloadSettle(params);
      if (resp.status === 200) {
        const content = await resp.blob();
        const file = new Blob([content], { type: 'application/vnd.ms-excel' });
        const fileName = resp.headers.get('X-Suggested-Filename');
        if ('download' in document.createElement('a')) {
          // 非IE下载
          const elink = document.createElement('a');
          elink.download = fileName;
          elink.style.display = 'none';
          elink.href = URL.createObjectURL(file);
          document.body.appendChild(elink);
          elink.click();
          // 释放URL 对象
          URL.revokeObjectURL(elink.href);
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(file, fileName);
        }
      } else {
        notification.error({
          message: '文件下载失败',
          description: '您的网络发生异常,请稍后再试',
        });
      }
    } catch (error) {
      notification.error({
        message: '文件下载失败',
        description: '您的网络发生异常,请稍后再试',
      });
    }
    setIsDownload(false);
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
            <Button icon={<LinkOutlined />} type="link" target="_blank" href="https://ap-gateway.mastercard.com/ma/">
              Ecommerce
            </Button>,
            <Button loading={isDownload} icon={<DownloadOutlined />} type="link" onClick={() => handleDownload()} />,
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
