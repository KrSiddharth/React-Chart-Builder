import React, {Component} from 'react';

class Modal extends Component {
  constructor(props) {
    super(props);
    if(props.chartData) {
      this.state = props.chartData;
    } else {
      this.state = {
          chartName: '',
          chartType: 'line',
          datasetLabel: '',
          xAxisLabel: '',
          yAxisLabel: '',
          xAxisData: [],
          yAxisData: [],
      };
    }
    this.handleChange = this.handleChange.bind(this);
    this.createChart = this.createChart.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.props.closeChartModal();
  }

  handleChange (evt) {
    if (evt.target.name === 'xAxisData' || evt.target.name === 'yAxisData') {
      let newData = Array.from(this.state[evt.target.name]);
      newData[evt.target.dataset.key-1] = evt.target.value;
      this.setState({ [evt.target.name]: newData });
    } else {
      this.setState({ [evt.target.name]: evt.target.value });
    }
  }

  createChart () {
    const {chartName, chartType, datasetLabel, xAxisLabel, yAxisLabel, xAxisData, yAxisData} = this.state;
    if(this.state.xAxisData[0] && this.state.xAxisData[1] && this.state.yAxisData[0] && this.state.yAxisData[0]){
      if(this.props.chartKey !== null) {
        this.props.editChart(this.state, this.props.chartKey);
      } else {
        this.props.addChart(this.state);
      }
      this.props.closeChartModal();
    } else {
      console.log('Please enter atleast two data points');
    }
  }

  render() {
    const N = 7;
    const colArr = Array.apply(null, {length: N}).map(Number.call, Number);
      return (
        <div>
          <div className='showOverlay' onClick={this.closeModal}></div>
          <div className='showModal'>
            Select chart type
            <select className='mxMd' name='chartType' onChange={this.handleChange} value={this.state.chartType}>
              <option value="line">Line Chart</option>
              <option value="bar">Bar Chart</option>
              <option value="pie">Pie Chart</option>
            </select>
            <div className='flexBox'>
              <div className='halfWidth'>
                Chart name
                <input className='styledInput'
                  type="text"
                  name='chartName'
                  value={this.state.chartName}
                  onChange={this.handleChange}
                  placeholder='Enter chart name'
                />
              </div>
              {
                this.state.chartType !== 'pie' &&
                <div className='halfWidth'>
                  Dataset Label
                  <input className='styledInput'
                    type="text"
                    name='datasetLabel'
                    value={this.state.datasetLabel}
                    onChange={this.handleChange}
                    placeholder='Enter dataset label'
                  />
                </div>
              }
            </div>
            {
              this.state.chartType !== 'pie' &&
              <div className='flexBox'>
                <div className='halfWidth'>
                  X-axis Label
                  <input className='styledInput'
                    type="text"
                    name='xAxisLabel'
                    value={this.state.xAxisLabel}
                    onChange={this.handleChange}
                    placeholder='Enter x-axis label'
                  />
                </div>
                <div className='halfWidth'>
                  Y-axis Label
                  <input className='styledInput'
                    type="text"
                    name='yAxisLabel'
                    value={this.state.yAxisLabel}
                    onChange={this.handleChange}
                    placeholder='Enter y-axis label'
                />
                </div>
              </div>
            }
            <div>
              Dataset
              <table>
                <tbody>
                  <tr>
                    {colArr.map((i) => (i === 0 ? <td key={i}>{this.state.chartType !== 'pie' ? 'X-axis' : 'Label'}</td> : <td key={i}><input
                      onChange={this.handleChange}
                      type="text"
                      value={this.state.xAxisData[i-1]}
                      name={`xAxisData`}
                      data-key={i}
                  /></td>))}
                  </tr>
                  <tr>
                    {colArr.map((i) => (i === 0 ? <td key={i}>{this.state.chartType !== 'pie' ? 'Y-axis' : 'Data'}</td> : <td key={i}><input
                      onChange={this.handleChange}
                      type="text"
                      name={`yAxisData`}
                      value={this.state.yAxisData[i-1]}
                      data-key={i}
                  /></td>))}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='alignCenter mLg'><button onClick={this.createChart}>{this.props.chartKey === null ? 'Create Chart' : 'Edit Chart'}</button></div>
          </div>
        </div>
      );
  }
}

export default Modal;
