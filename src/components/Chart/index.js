import Plot from 'react-plotly.js';


function Chart({ quoteCode }) {
    const currencyHistory = JSON.parse(sessionStorage.getItem("currency_history") || "[]");

    const x = currencyHistory.map((_, index) => 40*(index));
    const y = currencyHistory.map(historyPoint => {
      return historyPoint?.currencies[quoteCode].buy
    });

    return (
        <Plot
          data={[
            {
              x,
              y,
              mode: "lines",
              type: "scatter"
            },
          ]}
        />
      );
}

export default Chart;

