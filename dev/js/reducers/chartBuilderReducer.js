const initialState = {
  charts: [
    {
      chartName: "Recko Chart",
      chartType: "bar",
      datasetLabel: "Value",
      xAxisLabel: "Month",
      yAxisLabel: "Value",
      xAxisData: [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June"
      ],
      yAxisData: [
        "10",
        "50",
        "20",
        "80",
        "30",
        "100"
      ]
    },
    {
      chartName: "New Chart",
      chartType: "line",
      datasetLabel: "Chart Dataset",
      xAxisLabel: "Month",
      yAxisLabel: "Value",
      xAxisData: [
        "Jan",
        "Feb",
        "March",
        "Apr",
        "May"
      ],
      yAxisData: [
        "120",
        "150",
        "90",
        "30",
        "200"
      ]
    },
    {
      chartName: "Gender Data",
      chartType: "pie",
      datasetLabel: "",
      xAxisLabel: "",
      yAxisLabel: "",
      xAxisData: [
        "Male",
        "Female"
      ],
      yAxisData: [
        "30",
        "70"
      ]
    }
  ]
};

export default function reducer(state=initialState, { type, payload })  {

  if(type === 'ADD_CHART') {
    console.log(payload)
    const updatedCharts = Array.from(state.charts);
    updatedCharts.push(payload);
    return Object.assign({}, state, { charts: updatedCharts });
  }

  if(type === 'EDIT_CHART') {
    console.log(payload.chartData, payload.key)
    const updatedCharts = Array.from(state.charts);
    updatedCharts[payload.key] = payload.chartData;
    return Object.assign({}, state, { charts: updatedCharts });
  }
  return state;
}
