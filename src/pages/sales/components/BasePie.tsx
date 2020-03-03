import React from "react";
import numeral from 'numeral';
import {
  Chart,
  Geom,
  Axis,
  Coord,
  Label,
  Legend
} from "bizcharts";
import DataSet from "@antv/data-set";

interface BasePieProps {
  height?: number;
  forceFit?: boolean;
  data: {
    label: string;
    value: number;
  }[]
}

const BasePie = (props: BasePieProps) => {
  const {
    height = 0,
    forceFit = true,
    data,
  } = props;
  const { DataView } = DataSet;
  const dv = new DataView();
  dv.source(data).transform({
    type: "percent",
    field: "value",
    dimension: "label",
    as: "percent"
  });
  const cols = {
    percent: {
      formatter: (val: number) => numeral(val * 100).format('0.00') + "%"
    }
  };
  return (
    <div>
      <Chart
        scale={cols}
        height={height}
        forceFit={forceFit}
        data={dv}
      >
        <Coord type="theta" radius={0.75} />
        <Axis name="percent" />
        <Legend />
        <Geom
          type="intervalStack"
          position="percent"
          color={['label', '#ff0000-#00ff00']}
          tooltip={[
            "item*percent",
            (label, percent) => {
              percent = percent * 100 + "%";
              return {
                name: label,
                value: percent
              };
            }
          ]}
          style={{
            lineWidth: 1,
            stroke: "#fff"
          }}
        >
          <Label
            content="percent"
            formatter={(val, item) => {
              return item.point.label + ": " + val;
            }}
          />
        </Geom>
      </Chart>
    </div>
  );
}

export default BasePie;
