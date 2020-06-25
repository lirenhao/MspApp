import { MerData } from './data.d'

const getMerData: MerData = {
  merNo: '123456789012345',
  merName: '测试商户',
  merNameAbbr: 'test',
  accountNo: '入帐帐户',
  merAddress: '北京市海淀区上地西路八号院',
  contactName: '联系人',
  contactPhone: '联系电话',
  contactTax: '传真',
  contactEmail: '电子邮件',
  terms: [
    {
      merNo: '123456789012345',
      termNo: '12345678',
      termAddress: '北京市海淀区上地西路八号院B栋6楼',
      serialNumber: '1',
      status: 'OK'
    }
  ],
};

export default {
  'GET /svc/msp/mer': getMerData,
};
