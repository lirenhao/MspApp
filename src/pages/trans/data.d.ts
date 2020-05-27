export interface TransItem {
  lsId: string;
  merNo: string;
  termNo: string;
  cardNo: string;
  tranAmt: number;
  tranType: string;
  respCode: string;
  tranDate: string;
  tranTime: string;
  batchNo: string;
  traceNo: string;
  authNo: string;
  rrn: string;
}

export interface TransQuery {
  merNo?: string;
  termNo?: string;
  tranType?: string;
  respCode?: string;
  tranDate?: string;
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

export interface TransPage {
  content: TransItem[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
}

export interface MerSubItem {
  merNo: string;
  merName: string;
}
