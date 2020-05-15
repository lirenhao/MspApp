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

export interface SettleParams {
  settleDate: string;
  merNo: string;
}
