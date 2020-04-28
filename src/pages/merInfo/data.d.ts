export interface TermData {
  termNo: string;
  termAddress: string;
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
