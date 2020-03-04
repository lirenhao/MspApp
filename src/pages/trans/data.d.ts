export interface TableListItem {
  tranNo: string;
  merNo: string;
  termNo: string;
  cardStatus: string;
  cardNo: string;
  tranAmt: number;
  tranType: string;
  tranStatus: string;
  tranDate: string;
  tranTime: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter?: string;
  merNo?: string;
  termNo?: string;
  tranType?: string;
  tranStatus?: string;
  tranDate?: string;
  pageSize?: number;
  currentPage?: number;
}
