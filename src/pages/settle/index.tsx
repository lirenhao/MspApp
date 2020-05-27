import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { DownloadOutlined, LinkOutlined } from '@ant-design/icons';
import { Form, Card, Table, Tooltip, Button } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { formatMessage } from 'umi-plugin-react/locale';
import moment from 'moment';
import { SettlePage, SettleQuery, SettleItem } from './data.d';
import { StateType } from './model';
import Search from './Search';
import ToolBar from './toolBar';

interface PageViewProps {
  dispatch: Dispatch<any>;
  page: SettlePage,
  query: SettleQuery,
  loading: boolean;
}

const PageView: React.FC<PageViewProps> = props => {
  const { dispatch, loading, page, query } = props;

  const [isDownload, setIsDownload] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: formatMessage({ id: 'settle.merNo.title' }),
      dataIndex: 'merNo',
    },
    {
      title: formatMessage({ id: 'settle.settleDate.title' }),
      dataIndex: 'settleDate',
      render: (val: string) => moment(val, 'YYYYMMDD').format('YYYY-MM-DD'),
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

  const handlePage = (page: number, size?: number) => {
    dispatch({
      type: 'settle/fetchQuery',
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

  const handleDownload = () => {
    setIsDownload(true);
    dispatch({
      type: 'settle/fetchDownload',
      callback: () => setIsDownload(false)
    })
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
            title={formatMessage({ id: 'settle.query.result' })}
            options={[
              <Button icon={<LinkOutlined />} type="link" target="_blank" href="https://ap-gateway.mastercard.com/ma/">
                Ecommerce
              </Button>,
              <Tooltip key="download" title={formatMessage({ id: 'settle.option.download' })}>
                <Button loading={isDownload} icon={<DownloadOutlined />} type="link"
                  onClick={() => form.validateFields().then(() => handleDownload()).catch(() => { })}
                />
              </Tooltip>,
            ]}
            rootRef={rootRef}
            onReload={() => { form.submit() }}
          />
          <Table<SettleItem>
            rowKey="settleDate"
            loading={loading}
            columns={columns}
            expandable={{ expandedRowRender }}
            pagination={pagination}
            dataSource={page.content}
          />
        </Card>
      </div>

    </PageHeaderWrapper>
  );
};

export default connect(
  ({ settle, loading }: {
    settle: StateType,
    loading: { models: { [key: string]: boolean } };
  }) => ({
    page: settle.page,
    query: settle.query,
    loading: loading.models.settle,
  }),
)(PageView);
