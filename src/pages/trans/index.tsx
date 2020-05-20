import React from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import { DatePicker, Button, notification } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { getLocale, formatMessage } from 'umi-plugin-react/locale';
import ProTable, { IntlProvider, zhCNIntl, enUSIntl, ProColumns, ActionType } from '@ant-design/pro-table';
import moment from 'moment';
import { TransItem, TransParams } from './data.d';
import { queryTrans, downloadTrans } from './service';

import '@ant-design/compatible/assets/index.css';

interface TableListProps extends FormComponentProps { }

const TableList: React.FC<TableListProps> = () => {
  const [params, setParams] = React.useState({});
  const [isDownload, setIsDownload] = React.useState(false);

  const actionRef = React.useRef<ActionType>();

  const columns: ProColumns<TransItem>[] = [
    {
      title: formatMessage({ id: 'trans.merNo.title' }),
      dataIndex: 'merNo',
      // initialValue: '104767999000004',
    },
    {
      title: formatMessage({ id: 'trans.termNo.title' }),
      dataIndex: 'termNo',
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
      hideInSearch: true,
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
      title: formatMessage({ id: 'trans.respCode.title' }),
      dataIndex: 'respCode',
      valueEnum: {
        '00': { text: formatMessage({ id: 'trans.respCode.success' }) },
        '01': { text: formatMessage({ id: 'trans.respCode.fail' }) },
      },
    },
    {
      title: formatMessage({ id: 'trans.tranDate.title' }),
      dataIndex: 'tranDate',
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
      title: formatMessage({ id: 'trans.tranTime.title' }),
      dataIndex: 'tranTime',
      renderText: (val: string) => moment(val, 'HHmmss').format('HH:mm:ss'),
      hideInSearch: true,
    },
  ];

  const handleDownload = async () => {
    setIsDownload(true);
    try {
      const resp = await downloadTrans(params);
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
        <ProTable<TransItem, TransParams>
          headerTitle={formatMessage({ id: 'trans.query.result' })}
          actionRef={actionRef}
          rowKey="key"
          toolBarRender={() => [
            <Button loading={isDownload} icon={<DownloadOutlined />} type="link" onClick={() => handleDownload()} />
          ]}
          options={{ density: false, fullScreen: true, reload: true, setting: false }}
          beforeSearchSubmit={(params) => {
            if (params.tranDate) {
              params.tranDate = moment(params.tranDate).format('YYYYMMDD');
            }
            setParams(params)
            return params
          }}
          request={async (params = {}) => {
            try {
              const result = await queryTrans({
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

export default Form.create<TableListProps>()(TableList);
