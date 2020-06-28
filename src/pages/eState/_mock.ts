export default {
  'GET /svc/msp/eState': {
    merchantId: '123456789012345',
    settleDate: ['20200131', '20200131'],
    merchantName: '测试商户-1',
    emailAddress: 'emailAddress',
    postalCode: 'postalCode',
    contactPerson: 'contactPerson',
    settles: [
      {
        settleDate: '20200131',
        merNo: '123456789012345',
        channel: 'UnionPay',
        tranAmt: '123.45',
        fee: '0.23',
        settleAmt: '123.22',
      }
    ],
  },
};
