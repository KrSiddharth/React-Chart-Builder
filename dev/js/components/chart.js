import React, {Component} from 'react';
import Icon from '../components/icon';
import {Line, Bar, Doughnut} from 'react-chartjs-2';

class ChartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = this.getState(props);
  }

  componentWillReceiveProps(newProps) {
    this.setState(this.getState(newProps));
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
    }

    return array;
}

  getState (props) {
    const colorArray = ['#FFCE56', '#FF6384', '#36A2EB', '#4BC0C0', '#EC933C', '#71B37C'];
    const newState = {
      chartData: {
        labels: props.chartData.xAxisData,
        datasets: [
          {
            label: props.chartData.datasetLabel,
            fill: 'transparent',
            backgroundColor: colorArray,
            pointBorderColor: "#FFD030",
            pointStrokeColor: "#fff",
            pointBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            data: props.chartData.yAxisData
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: props.chartData.chartName
        }
      }
    }

    if (props.chartData.chartType !== 'pie') {
      newState.chartData.datasets[0].borderColor = colorArray[0];
      newState.options.scales = {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: props.chartData.xAxisLabel
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: props.chartData.yAxisLabel
          }
        }]
      };
      newState.options.tooltips = {
        mode: 'index',
        intersect: false,
      };
    }

    return newState;
  }
  getChart() {
    switch (this.props.chartData.chartType) {
      case 'line':
        return (<Line data={this.state.chartData} options={this.state.options} />);
      case 'bar':
        return (<Bar data={this.state.chartData} options={this.state.options} />);
      case 'pie':
        return (<Doughnut data={this.state.chartData} options={this.state.options} />);
    }
  }
    render() {
        return (this.getChart());
    }
}

export default ChartComponent;
