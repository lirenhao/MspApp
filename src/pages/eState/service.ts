import request from '@/utils/request';
import pdfMake from "pdfmake/build/pdfmake";
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import moment from 'moment';
import numeral from 'numeral';
import vfs from './vfs_fonts';
import { Query, Result } from './data.d';

pdfMake.vfs = vfs;
pdfMake.fonts = {
  Helvetica: {
    normal: 'Helvetica.ttf',
    bold: 'Helvetica-Bold.ttf',
    italics: 'Helvetica-Oblique.ttf',
    bolditalics: 'Helvetica-BoldOblique.ttf',
  },
};

export async function getMerSubs() {
  return request('/svc/msp/mer/subs');
}

export async function getResult(params: Query) {
  return request('/svc/msp/eState', {
    params,
  });
}

const getPdfDefinition = (result: Result): TDocumentDefinitions => ({
  pageSize: 'A4',
  pageMargins: [60, 90, 60, 100],
  header: {
    style: 'header',
    width: 600,
    height: 80,
    image: 'header.png',
  },
  footer: {
    style: 'footer',
    columns: [
      {
        stack: [
          'BANK OF CHINA LIMITED',
          '(Incorported in China)',
          'SINGAPORE BRANCH',
        ]
      },
      {
        stack: [
          ['4 Battery Road'],
          ['Bank of China Building'],
          ['Singaore 049908'],
        ]
      },
      {
        table: {
          body: [
            ['Tel', ':1800-669 5566'],
            ['Fax', ':(65)6534 3401'],
          ],
        },
        layout: 'noBorders',
      },
      {
        table: {
          body: [
            ['UEN', ':S36FC0753C'],
            ['SWIFT', ':BKCHSGSG'],
          ],
        },
        layout: 'noBorders',
      },
    ]
  },
  content: [
    {
      columns: [
        {
          table: {
            widths: [70, 2, 100],
            heights: [15, 15],
            body: [
              ['Merchant ID', ':', result.merchantId],
              ['Statement Date', ':', `${result.settleDate[0]}~${result.settleDate[1]}`],
            ],
          },
          layout: 'noBorders'
        },
        {
          table: {
            widths: [240],
            heights: [30],
            body: [
              [{ text: 'MERCHANT SETTLEMENT PAYMENT ADVICE', style: 'merHeader', }],
            ],
          },
          layout: 'noBorders'
        },
      ]
    },
    {
      table: {
        body: [
          [`${result.merchantName || ''}`],
          [`${result.emailAddress || ''}`],
          [`SINGAPORE ${result.postalCode || ''}`],
        ],
      },
      layout: 'noBorders',
    },
    { text: `Attention to:${result.contactPerson || ''}`, style: 'text' },
    { text: 'Dear Sir / Mdm', style: 'text' },
    {
      text: 'Kindly find below credited amount for funds settlement to your bank account. We take this opportunity to thank you for using Bank of China’s Merchant Services.',
      style: 'text'
    },
    {
      table: {
        widths: ['16%', '16%', '16%', '16%', '18%', '16%'],
        heights: (row: number) => row === 0 ? 28 : 20,
        body: [
          [
            { text: 'Transaction Type', style: 'settleHeader' },
            { text: 'Settlement Date', style: 'settleHeader' },
            { text: 'Settlement Amount', style: 'settleHeader' },
            { text: 'Merchant Discount Fee', style: 'settleHeader' },
            { text: 'Net Settlement Amount', style: 'settleHeader' },
            { text: 'Transfer \nDate', style: 'settleHeader' }
          ],
          ...result.settles.map(settle => [
            { text: settle.channel, style: 'settleRow' },
            { text: moment(settle.settleDate, 'YYYYMMDD').format('DD-MM-YYYY'), style: 'settleRow' },
            { text: `S$${numeral(settle.tranAmt).format('0,0.00')}`, style: 'settleRow' },
            { text: `S$${numeral(settle.fee).format('0,0.00')}`, style: 'settleRow' },
            { text: `S$${numeral(settle.settleAmt).format('0,0.00')}`, style: 'settleRow' },
            { text: moment(settle.settleDate, 'YYYYMMDD').add(1, 'day').format('DD-MM-YYYY'), style: 'settleRow' }
          ]),
        ]
      },
      layout: {
        hLineWidth: () => 0,
        vLineWidth: () => 0,
        fillColor: (row: number) => (row % 2 === 0) ? '#C8C8C8' : '#E6E6E6',
      }
    },
    {
      text: 'Should you have any clarifications, please feel free to call our MSU hotline at 6412 9779 during office hours (weekdays 9am to 6pm excluding public holidays).',
      style: 'text'
    },
    {
      table: {
        body: [
          ['Yours sincerely'],
          ['Card Centre'],
          ['Bank of China Limited, Singapore Branch'],
        ],
      },
      layout: 'noBorders',
    },
    { text: '(This is a computer generated letter. No signature is required)', style: 'text' },
    {
      table: {
        widths: ['50%', '50%'],
        heights: (row: number) => row === 0 ? 30 : 'auto',
        dontBreakRows: true,
        body: [
          [{ text: 'IMPORTANT NOTE', style: 'noteHeader', }, {}],
          [
            {
              colSpan: 2, stack: [
                {
                  text: 'This statement is confidential and privileged and is only intended for the addressee(s) specified. If you are not the intended recipient of this statement, please contact Bank of China Limited, Singapore Branch (“BOCSG”) at 1800 338 5335 or +65 6338 5335 (if calling from overseas) immediately. Please do not copy, store or further disclose the contents of this statement (including any personal data) in any form to any person and return this statement to BOCSG immediately. Please be cautioned against unauthorised use, retention and disclosure of personal data as set out in the Singapore Personal Data Protection Act and any other applicable data protection laws and regulations.',
                  style: 'text',
                },
                {
                  text: 'Please examine this statement and advise us of any discrepancy within 10 days from the statement date; otherwise the account will be considered correct, conclusive and binding. If there is any error, omission or statement enquiry, do contact us at our MSU hotline telephone no.: 6412 9779. Please notify us if your statement has not reached you within the settlement month.',
                  style: 'text',
                },
              ]
            },
            {}
          ],
        ],
      },
      layout: {
        hLineWidth: (row: number, node: any) => (row === 0 || row === node.table.body.length) ? 1 : 0,
        vLineWidth: (row: number, node: any) => (row === 0 || row === node.table.widths.length) ? 1 : 0,
        hLineColor: '#929A9F',
        vLineColor: '#929A9F',
      },
    },
  ],
  styles: {
    header: {
      alignment: 'center',
    },
    footer: {
      bold: true,
      fontSize: 9,
      margin: [60, 30, 20, 10],
    },
    merHeader: {
      bold: true,
      color: 'white',
      alignment: 'center',
      fillColor: '#929A9F',
      margin: [0, 10, 0, 0],
    },
    settleHeader: {
      bold: true,
      color: 'white',
      alignment: 'center',
      fillColor: '#000000',
      margin: [0, 4, 0, 4],
    },
    settleRow: {
      alignment: 'center',
      margin: [0, 6, 0, 0],
      fontSize: 9,
    },
    text: {
      margin: [0, 10, 0, 10]
    },
    noteHeader: {
      bold: true,
      color: 'white',
      alignment: 'left',
      fillColor: '#929A9F',
      margin: [4, 12, 0, 0],
    },
  },
  defaultStyle: {
    font: 'Helvetica',
    fontSize: 10,
  }
});

export async function generPdf(result: Result) {
  return new Promise(resolve => {
    pdfMake.createPdf(getPdfDefinition(result)).getBlob(blob => resolve(blob));
  });
}
