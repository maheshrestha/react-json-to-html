import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import { Button } from 'antd';

class DummyChart extends React.Component {

  state = {
      loading: false,
      iconLoading: false,
    }

    enterLoading = () => {
      this.setState({ loading: true });
    }

    enterIconLoading = () => {
      this.setState({ iconLoading: true });
      this.props.onCalculate();
    }


  render() {
    const data = [
      {
        year: "Jan",
        Earnings: 0
      },
      {
        year: "Feb",
        Earnings: 0
      },
      {
        year: "Mar",
        Earnings: 0
      },
      {
        year: "Apr",
        Earnings: 0
      },
      {
        year: "May",
        Earnings: 0
      },
      {
        year: "Jun",
        Earnings: 0
      },
      {
        year: "Jul",
        Earnings: 0
      },
      {
        year: "Aug",
        Earnings: 0
      },
      {
        year: "Sep",
        Earnings: 0
      },
      {
        year: "Oct",
        Earnings: 0
      },
      {
        year: "Nov",
        Earnings: 0
      },
      {
        year: "Dec",
        Earnings: 0
      }
    ];
    const cols = {
      Earnings: {
        min: 0
      },
      year: {
        range: [0, 1]
      }
    };
    return (

      [
        <Button className="calculate-graph" type="primary" icon="line-chart" loading={this.state.iconLoading} onClick={this.enterIconLoading}>Calculate</Button>,
          <div className="mt-earning-chart mt-mdm-padding ant-spin-blur">
              <div className="module-holder chart-holder chart-spline">
                <div className="rbc-toolbar">
                  <span className="rbc-btn-group">
                    <button type="button">Today</button>
                    <button type="button">Back</button>
                    <button type="button">Next</button>
                  </span>
                  <span className="rbc-toolbar-label">&nbsp;</span>
                  <span className="rbc-btn-group">
                    <button type="button" className="rbc-active" >Year</button>
                    <button type="button" className="" >Month</button>
                    <button type="button" className="" >Week</button>
                  </span>
                </div>
                <div className="">
                  <Chart height={400} data={data} scale={cols} forceFit>
                    <Axis name="year" />
                    <Axis name="Earnings" />
                    <Tooltip
                      crosshairs={{
                        type: "y"
                      }}
                    />
                    <Geom type="line" position="year*Earnings" size={1} color="#C0C0C0" padding={[10, 40, 40, 40]}/>

                  </Chart>
                </div>
              </div>
        	</div>
        ]
    );
  }
}

export default DummyChart;
