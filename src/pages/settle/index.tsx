import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { DownloadOutlined, LinkOutlined } from '@ant-design/icons';
import { Form, Card, Table, Tooltip, Button } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { formatMessage } from 'umi-plugin-react/locale';
import moment from 'moment';
import numeral from 'numeral';
import { SettlePage, SettleQuery, SettleItem, SettleSubItem } from './data.d';
import { UserModelState } from '@/models/user';
import { StateType } from './model';
import Search from './Search';
import ToolBar from './toolBar';
import Trans from './Trans';

interface PageViewProps {
  dispatch: Dispatch<any>;
  merNo?: string;
  page: SettlePage,
  query: SettleQuery,
  loading: boolean;
}

const PageView: React.FC<PageViewProps> = props => {
  const { dispatch, loading, merNo, page, query } = props;

  const [isDownload, setIsDownload] = React.useState(false);
  const [isTrans, setIsTrans] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [form] = Form.useForm();

  React.useEffect(() => {
    dispatch({
      type: 'settle/fetchMerSubs',
      payload: {
        merNo,
      },
    });
  }, [merNo]);

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
      render: (val: number) => `S$${numeral(val).format('0,0.00')}`,
    },
    {
      title: formatMessage({ id: 'settle.fee.title' }),
      dataIndex: 'fee',
      render: (val: number) => `S$${numeral(val).format('0,0.00')}`,
    },
    {
      title: formatMessage({ id: 'settle.settleAmt.title' }),
      dataIndex: 'settleAmt',
      render: (val: number) => `S$${numeral(val).format('0,0.00')}`,
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
        render: (val: number) => `S$${numeral(val).format('0,0.00')}`,
      },
      {
        title: formatMessage({ id: 'settle.fee.title' }),
        dataIndex: 'fee',
        render: (val: number) => `S$${numeral(val).format('0,0.00')}`,
      },
      {
        title: formatMessage({ id: 'settle.settleAmt.title' }),
        dataIndex: 'settleAmt',
        render: (val: number) => `S$${numeral(val).format('0,0.00')}`,
      },
      {
        title: formatMessage({ id: 'settle.channel.title' }),
        dataIndex: 'channel',
        render: (val: string, record: SettleSubItem) => (<Button type='link' onClick={() => handleTrans(record)}>{val}</Button>),
      },
    ];
    if (record.subs && record.subs.length > 0) {
      return (
        <Table<SettleSubItem>
          rowKey={record => record.settleDate + record.merNo + record.channel}
          columns={columns}
          dataSource={record.subs}
          pagination={false}
        />
      )
    } else {
      return (<></>)
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

  const handleTrans = (record: SettleSubItem) => {
    dispatch({
      type: 'settle/fetchTrans',
      payload: record,
      callback: () => {
        setIsTrans(true);
      },
    })
  }

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
              <Button key="ecommerce" icon={<LinkOutlined />} type="link" target="_blank" href="https://ap-gateway.mastercard.com/ma/">
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
            rowKey={record => record.settleDate + record.merNo}
            loading={loading}
            columns={columns}
            expandable={{ expandedRowRender }}
            pagination={pagination}
            dataSource={page.content}
          />
        </Card>
      </div>
      <Trans visible={isTrans} onCancel={() => setIsTrans(false)} />
    </PageHeaderWrapper>
  );
};

export default connect(
  ({ user, settle, loading }: {
    user: UserModelState;
    settle: StateType;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    merNo: user.user.merNo,
    page: settle.page,
    query: settle.query,
    loading: loading.models.settle,
  }),
)(PageView);
