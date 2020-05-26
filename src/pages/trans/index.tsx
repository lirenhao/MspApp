import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { DownloadOutlined } from '@ant-design/icons';
import { Form, Card, Table, Button, notification } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { formatMessage } from 'umi-plugin-react/locale';
import moment from 'moment';
import { TransPage, TransQuery, TransItem } from './data.d';
import { StateType } from './model';
import { downloadTrans } from './service';
import Search from './Search';
import ToolBar from './toolBar';

interface PageViewProps {
  dispatch: Dispatch<any>;
  page: TransPage,
  query: TransQuery,
  loading: boolean;
}

const PageView: React.FC<PageViewProps> = props => {
  const { dispatch, loading, page, query } = props;

  const [isDownload, setIsDownload] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [form] = Form.useForm();

  const columns = [
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
    },
    {
      title: formatMessage({ id: 'trans.tranTime.title' }),
      dataIndex: 'tranTime',
      renderText: (val: string) => moment(val, 'HHmmss').format('HH:mm:ss'),
      hideInSearch: true,
    },
  ];

  const handlePage = (page: number, size?: number) => {
    dispatch({
      type: 'trans/fetchQuery',
      payload: {
        ...query,
        size,
        page: page > 0 ? page - 1 : page,
      },
    })
  };

  const pagination = {
    total: page.totalElements,
    current: page.pageable.pageNumber + 1,
    pageSize: page.pageable.pageSize,
    onChange: handlePage,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50'],
    onShowSizeChange: handlePage,
    showTotal: (total: number, range: number[]) => `${range[0]}-${range[1]} of ${total} items`,
  };

  const handleDownload = async () => {
    setIsDownload(true);
    try {
      const resp = await downloadTrans(query);
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
      <div ref={rootRef}>
        <Search form={form} />
        <Card bordered={false}
          style={{ height: '100%' }}
          bodyStyle={{ padding: 0 }}
        >
          <ToolBar
            title="查询结果"
            options={[
              <Button loading={isDownload} icon={<DownloadOutlined />} key="download" type="link" onClick={() => {
                handleDownload()
              }} />,
            ]}
            rootRef={rootRef}
            onReload={() => { form.submit() }}
          />
          <Table<TransItem>
            key="lsId"
            loading={loading}
            columns={columns}
            pagination={pagination}
            dataSource={page.content}
          />
        </Card>
      </div>
    </PageHeaderWrapper>
  );
};

export default connect(
  ({ trans, loading }: {
    trans: StateType,
    loading: { models: { [key: string]: boolean } };
  }) => ({
    page: trans.page,
    query: trans.query,
    loading: loading.models.trans,
  }),
)(PageView);
