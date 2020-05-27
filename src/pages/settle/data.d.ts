export interface SettleSubItem {
  settleDate: string;
  merNo: string;
  channel: string;
  tranAmt: string;
  fee: string;
  settleAmt: string;
}

export interface SettleItem {
  settleDate: string;
  merNo: string;
  tranAmt: string;
  fee: string;
  settleAmt: string;
  subs: SettleSubItem[];
}

export interface SettleQuery {
  settleDate?: string;
  merNo?: string;
  page: number;
  size: number;
}

export interface Order {
  property: string;
  direction?: 'ASC' | 'DESC';
}

export interface Pageable {
  pageSize: number;
  pageNumber: number;
  sort: Order[];
}

export interface SettlePage {
  content: SettleItem[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
}
