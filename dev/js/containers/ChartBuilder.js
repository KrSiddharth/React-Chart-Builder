import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import GridLayout from '../components/GridLayout';
import Modal from '../components/Modal';
import Logo from '../components/logo.js';
import Icon from '../components/icon';

import {
  addChart,
  editChart
} from '../actions/index'


class ChartBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      chartKey: null
    }
    this.openChartModal = this.openChartModal.bind(this);
    this.closeChartModal = this.closeChartModal.bind(this);
    this.editChartModal = this.editChartModal.bind(this);

  }
    openChartModal() {
      this.setState({isModalOpen: true, chartKey: null})
    }
    closeChartModal() {
      this.setState({isModalOpen: false, chartKey: null})
    }
    editChartModal(key) {
      console.log(key, this.props.charts[key]);
      this.setState({isModalOpen: true, chartKey: key});
    }
    render() {
        return (
          <div className={this.state.isModalOpen ? 'overflowHidden' : ''}>
            <header>
              <Icon icon='react' width='50' height='50' viewBox='0 0 180 180'/>
              <span className='title'>React Chart Builder</span>
              <button className='fixed' onClick={this.openChartModal}>Create Chart</button>
            </header>
            <GridLayout
              charts={this.props.charts}
              editChartModal={this.editChartModal}
              closeChartModal={this.closeChartModal}
            />
            {
              this.state.isModalOpen &&
              <Modal
                addChart={this.props.addChart}
                chartData={this.state.chartKey !== null ? this.props.charts[this.state.chartKey] : null}
                editChart={this.props.editChart}
                chartKey={this.state.chartKey}
                closeChartModal={this.closeChartModal}
              />
            }
          </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        charts: state.builder.charts
    };
}


function matchDispatchToProps(dispatch){
    return bindActionCreators(
      {
        addChart: addChart,
        editChart: editChart,
      }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ChartBuilder);
