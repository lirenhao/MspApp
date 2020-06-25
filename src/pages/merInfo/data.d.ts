export interface TermData {
  merNo: string;
  termNo: string;
  termAddress: string;
  serialNumber: string;
  status: string;
}

export interface MerData {
  merNo: string;
  merName: string;
  merNameAbbr: string;
  accountNo: string;
  merAddress: string;
  contactName: string;
  contactPhone: string;
  contactTax: string;
  contactEmail: string;
  terms: TermData[];
}
