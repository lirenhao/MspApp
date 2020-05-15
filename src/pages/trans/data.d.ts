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

export interface TransParams {
  merNo?: string;
  termNo?: string;
  tranType?: string;
  respCode?: string;
  tranDate?: string;
}
