import React, {Component} from 'react';
import  ReactGridLayout from 'react-grid-layout';
import Chart from '../components/chart';
import Icon from '../components/icon';
import Modal from '../components/Modal';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

class GridLayout extends Component {
  constructor(props) {
    super(props);
    const newLayout = props.charts.map((chart, i) => ({i: i.toString(), x: (6*i) % 12, y: Infinity, w: 6, h: 8}));
    this.state = {layout: newLayout, show: null};

    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);

  }

  componentWillReceiveProps(newProps) {
    if(newProps.charts.length !== this.props.charts.length) {
      const newLayOut = Array.from(this.state.layout);
      newLayOut.push({i: this.state.layout.length.toString(), x: (this.state.layout.length * 6) % (this.state.cols || 12), y: Infinity, w: 6, h: 8});
      this.setState({layout: newLayOut});
    }
  }

  onLayoutChange(layout) {
    this.setState({show: true, layout});
    window.dispatchEvent(new Event('resize'));
  }

  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  render() {
      return (
        <div>
          <ReactGridLayout className="layout"  containerPadding={[10, 10]} onBreakpointChange={this.onBreakpointChange} onLayoutChange={this.onLayoutChange} layout={this.state.layout} cols={12} rowHeight={30} width={1200}>
            {this.props.charts.map((chart, i) => (
              <div key={i} className={this.state.show ? '' : 'hidden'}><Chart chartData={chart}/><div className='edit-icon' key={i} onClick={() => this.props.editChartModal(i)}><Icon icon='edit' /></div></div>
            ))}
          </ReactGridLayout>
        </div>
      );
  }
}

export default GridLayout;
