export interface SubListItem {
  settlementDate: string;
  settlementNumber: number;
  totalCharge: number;
  creait: number;
  submissionAmount: number;
  discountAmount: number;
  feesAndIncentives: number;
  chargeBacks: number;
  adjustments: number;
}

export interface TableListItem {
  settlementDate: string;
  settlementNumber: number;
  totalCharge: number;
  creait: number;
  submissionAmount: number;
  discountAmount: number;
  feesAndIncentives: number;
  chargeBacks: number;
  adjustments: number;
  subs: SubListItem[];
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
  settlementDate?: string;
  pageSize?: number;
  currentPage?: number;
}
