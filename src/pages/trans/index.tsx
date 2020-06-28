import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { DownloadOutlined } from '@ant-design/icons';
import { Form, Card, Table, Tooltip, Button } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { formatMessage } from 'umi-plugin-react/locale';
import moment from 'moment';
import numeral from 'numeral';
import { TransPage, TransQuery, TransItem } from './data.d';
import { UserModelState } from '@/models/user';
import { StateType } from './model';
import Search from './Search';
import ToolBar from './toolBar';

interface PageViewProps {
  dispatch: Dispatch<any>;
  merNo?: string;
  page: TransPage,
  query: TransQuery,
  loading: boolean;
}

const PageView: React.FC<PageViewProps> = props => {
  const { dispatch, loading, merNo, page, query } = props;

  const [isDownload, setIsDownload] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [form] = Form.useForm();

  React.useEffect(() => {
    dispatch({
      type: 'trans/fetchMerSubs',
      payload: {
        merNo,
      },
    });
  }, [merNo]);

  const columns = [
    {
      title: formatMessage({ id: 'trans.merNo.title' }),
      dataIndex: 'merNo',
    },
    {
      title: formatMessage({ id: 'trans.termNo.title' }),
      dataIndex: 'termNo',
    },
    {
      title: formatMessage({ id: 'trans.cardNo.title' }),
      dataIndex: 'cardNo',
    },
    {
      title: formatMessage({ id: 'trans.tranAmt.title' }),
      dataIndex: 'tranAmt',
      render: (val: string) => `S$${numeral(val).format('0,0.00')}`,
    },
    {
      title: formatMessage({ id: 'trans.tranType.title' }),
      dataIndex: 'tranType',
      render: (val: string) => {
        switch (val) {
          case '00':
            return formatMessage({ id: 'trans.tranType.pay' });
          case '01':
            return formatMessage({ id: 'trans.tranType.refund' });
          case '02':
            return formatMessage({ id: 'trans.tranType.revoke' });
          default:
            return val;
        }
      },
    },
    {
      title: formatMessage({ id: 'trans.respCode.title' }),
      dataIndex: 'respCode',
      render: (val: string) => {
        switch (val) {
          case '00':
            return formatMessage({ id: 'trans.respCode.success' });
          case '01':
            return formatMessage({ id: 'trans.respCode.fail' });
          default:
            return val;
        }
      },
    },
    {
      title: formatMessage({ id: 'trans.tranDate.title' }),
      dataIndex: 'tranDate',
      render: (val: string) => moment(val, 'YYYYMMDD').format('YYYY-MM-DD'),
    },
    {
      title: formatMessage({ id: 'trans.tranTime.title' }),
      dataIndex: 'tranTime',
      render: (val: string) => moment(val, 'HHmmss').format('HH:mm:ss'),
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

  const handleDownload = () => {
    setIsDownload(true);
    dispatch({
      type: 'trans/fetchDownload',
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
            title={formatMessage({ id: 'trans.query.result' })}
            options={[
              <Tooltip key="download" title={formatMessage({ id: 'trans.option.download' })}>
                <Button loading={isDownload} icon={<DownloadOutlined />} type="link"
                  onClick={() => form.validateFields().then(() => handleDownload()).catch(() => { })}
                />
              </Tooltip>,
            ]}
            rootRef={rootRef}
            onReload={() => { form.submit() }}
          />
          <Table<TransItem>
            rowKey="lsId"
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
  ({ user, trans, loading }: {
    user: UserModelState;
    trans: StateType,
    loading: { models: { [key: string]: boolean } };
  }) => ({
    merNo: user.user.merNo,
    page: trans.page,
    query: trans.query,
    loading: loading.models.trans,
  }),
)(PageView);
