export interface MonthPastData {
  month: string;
  total: number;
}

export interface MonthSalesData {
  month: string;
  mers: number; // Merchant onboarding
  point: number; // Touch point
  revenue: number; // MDR Revenue
  trans: number; // Transation
  average: number; // Average past months
  target: number; // Target
  recent: number; // Recent
  pasts: MonthPastData[]; // Average past months
}

export interface IncomeStatement {
  revenue: number;
  cost: number;
  grossProfit: number;
  otherIncome: number;
  otherExenes: number;
  ebit: number;
  interestAndTax: number;
  netProfit: number;
}

export interface TopData {
  name: string;
  nick: string;
  total: number;
}

export interface TopSalesData {
  trans: TopData[]; // TOP 5 transaction
  revenue: TopData[];// TOP 5 Revenue
  income: IncomeStatement;
}

export interface SalesData {
  monthSales: MonthSalesData;
  topSales: TopSalesData;
}
