export interface SettleSubItem {
  settleDate: string;
  merNo: string;
  channel: string;
  tranAmt: string;
  fee: string;
  settleAmt: string;
}

export interface Query {
  merNo: string;
  settleDate: string[];
}

export interface Result {
  merchantId: string;
  settleDate: string[];
  merchantName: string;
  emailAddress: string;
  postalCode: string;
  contactPerson: string;
  settles: SettleSubItem[];
}

export interface MerSubItem {
  merNo: string;
  merName: string;
}
