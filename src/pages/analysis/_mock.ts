import { VisitDataType } from './data';

const salesData: VisitDataType[] = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}

export default {
  'GET  /api/fake_chart_data': {
    salesData,
  },
};
