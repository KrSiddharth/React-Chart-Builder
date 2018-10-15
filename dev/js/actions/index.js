export const addChart = (chartData) => {
    return {
        type: 'ADD_CHART',
        payload: chartData
    }
};

export const editChart = (chartData, key) => {
    return {
        type: 'EDIT_CHART',
        payload: {
          chartData,
          key }
    }
};
