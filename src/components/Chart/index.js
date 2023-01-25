import Plot from 'react-plotly.js';

function Chart({ quoteCode }) {
    const currencyHistory = JSON.parse(sessionStorage.getItem("currency_history") || "[]");

    const x = currencyHistory.map((_, index) => index);
    const y = currencyHistory.map(historyPoint => {
      return historyPoint?.currencies?.[quoteCode]?.buy || historyPoint?.stocks?.[quoteCode]?.points;
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
          layout={{
            xaxis: {
              title: {
                text: 'Número da requisiçāo',
                font: {
                  family: 'Courier New, monospace',
                  size: 18,
                  color: '#7f7f7f'
                }
              },
            },
            yaxis: {
              title: {
                text: 'Valor',
                font: {
                  family: 'Courier New, monospace',
                  size: 18,
                  color: '#7f7f7f'
                }
              }
            },
          }}
          useResizeHandler={true}
          style={{width: "100%", height: "100%"}}
        />
      );
}

export default Chart;

