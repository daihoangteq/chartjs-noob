import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js';

// Custom plugin for multiple tooltips
const multiTooltipPlugin = {
  id: 'multiTooltip',
  afterDraw: (chart) => {
    if (chart.tooltip._active && chart.tooltip._active.length) {
      const activePoints = chart.tooltip._active;
      const chartArea = chart.chartArea;
      const ctx = chart.ctx;

      ctx.save();

      activePoints.forEach((point) => {
        const position = point.element.getCenterPoint();
        
        // Draw vertical line
        ctx.beginPath();
        ctx.moveTo(position.x, chartArea.top);
        ctx.lineTo(position.x, chartArea.bottom);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.stroke();
        ctx.restore();
      });
    }
  }
};

// Register the plugin
ChartJS.register(multiTooltipPlugin);

const MultiTooltipChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Dataset 2',
        data: [5, 15, 10, 8, 12, 9],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
        position: 'nearest',
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div style={{ width: '600px', height: '400px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default MultiTooltipChart;
