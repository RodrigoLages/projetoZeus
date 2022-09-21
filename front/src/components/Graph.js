import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Graph(props) {
  const chartData = () => {
    const arr = [];
    for (let i = 0; i < 12; i++) {
      arr[i] = props.purchases
        .filter(
          (item) => new Date(item.date).getFullYear() === props.selectedYear
        )
        .filter((item) => new Date(item.date).getMonth() === i)
        .reduce((prev, curr) => prev + curr.cost, 0);
    }
    return arr;
  };

  const data = {
    labels: props.fullMonth,
    datasets: [
      {
        label: "Gasto Mensal",
        data: chartData(),
        borderColor: "hsl(250, 36%, 57%)",
        backgroundColor: "rgba(211, 205, 244, 1)",
      },
    ],
  };

  return <Line data={data} />;
}

export default Graph;
