import React from "react";
import {PieChart, Pie, Legend, Tooltip} from 'recharts';

export default class Chart extends React.Component{
  render() {
    return (
      <PieChart width={400} height={400}>
        <Pie  isAnimationActive={false}
              data={this.props.data}
              cx={200}
              cy={200}
              outerRadius={50}
              fill="#8884d8"
              label
          />
        <Tooltip/>
      </PieChart>
    )
  }
}
