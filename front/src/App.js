import "./App.css";

import { useState, useEffect } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Form from "./components/Form";
import ListItem from "./components/ListItem";
import Graph from "./components/Graph";

const API = "http://localhost:4000";

function App() {
  const [cost, setCost] = useState("");
  const [obs, setObs] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toString());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);

  const fullMonth = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const getMonthPurchases = () => {
    return purchases
      .filter(
        (purchase) => new Date(purchase.date).getFullYear() === selectedYear
      )
      .filter(
        (purchase) => new Date(purchase.date).getMonth() === selectedMonth
      );
  };

  const getMonthTotal = () => {
    return getMonthPurchases()
      .reduce((prev, curr) => prev + curr.cost, 0)
      .toFixed(2);
  };

  //useEffect com [] so roda 1 vez ao iniciar a pagina
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const res = await fetch(API + "/compra")
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));

      setLoading(false);

      setPurchases(
        res.compras.sort(
          (a, b) => new Date(a.date).getDate() - new Date(b.date).getDate()
        )
      );
    };

    loadData();
  }, []);

  const handleLeftArrow = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else setSelectedMonth(selectedMonth - 1);
  };

  const handleRightArrow = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else setSelectedMonth(selectedMonth + 1);
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="App">
      <div className="left-container">
        <div className="stats">
          <div className="form">
            <h2>Insira seu gasto do dia</h2>
            <Form
              _id={undefined}
              cost={cost}
              setCost={setCost}
              obs={obs}
              setObs={setObs}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              setPurchases={setPurchases}
            />
          </div>
          <div className="graph">
            <Graph
              purchases={purchases}
              selectedYear={selectedYear}
              fullMonth={fullMonth}
            />
          </div>
        </div>
      </div>
      <div className="right-container">
        <div className="total-month">
          <BsArrowLeft onClick={() => handleLeftArrow()} />
          <div className="total-text">
            <h3>
              Total do mês de {fullMonth[selectedMonth]} de {selectedYear}:
            </h3>
            <h2>R$ {getMonthTotal()}</h2>
          </div>
          <BsArrowRight onClick={() => handleRightArrow()} />
        </div>
        <div className="list">
          <h2>Lista de gastos</h2>
          {getMonthPurchases().length === 0 && <p>Não há gastos neste mês</p>}
          {getMonthPurchases().map((purchase) => (
            <ListItem
              key={purchase._id}
              _id={purchase._id}
              cost={purchase.cost}
              obs={purchase.obs}
              date={purchase.date}
              setPurchases={setPurchases}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
