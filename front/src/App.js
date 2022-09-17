import "./App.css";

import { useState, useEffect } from "react";
import { BsTrash, BsArrowLeft, BsArrowRight } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const API = "http://localhost:4000";

function App() {
  const [cost, setCost] = useState("");
  const [obs, setObs] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);

  const fullMonth = new Map();
  fullMonth.set(0, "Janeiro");
  fullMonth.set(1, "Fevereiro");
  fullMonth.set(2, "Março");
  fullMonth.set(3, "Abril");
  fullMonth.set(4, "Maio");
  fullMonth.set(5, "Junho");
  fullMonth.set(6, "Julho");
  fullMonth.set(7, "Agosto");
  fullMonth.set(8, "Setembro");
  fullMonth.set(9, "Outubro");
  fullMonth.set(10, "Novembro");
  fullMonth.set(11, "Dezembro");

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

  //Load costs on page
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const purchase = {
      cost,
      obs,
      date: selectedDate,
    };

    const res = await fetch(API + "/compra", {
      method: "POST",
      body: JSON.stringify(purchase),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));

    setPurchases((prevState) =>
      [...prevState, res.novaCompra].sort(
        (a, b) => new Date(a.date).getDate() - new Date(b.date).getDate()
      )
    );

    setCost("");
    setObs("");
    setSelectedDate(new Date());
  };

  const handleDelete = async (_id) => {
    await fetch(API + "/compra/" + _id, {
      method: "DELETE",
    });

    setPurchases((prevState) =>
      prevState.filter((purchase) => purchase._id !== _id)
    );
  };

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
      <div className="header">
        <h1>Registro de Gastos</h1>
      </div>
      <div className="form">
        <h2>Insira seu gasto do dia:</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="cost">Quanto você gastou?</label>
            <input
              type="number"
              name="cost"
              placeholder="00.00"
              onChange={(e) => setCost(parseFloat(e.target.value))}
              value={cost || ""}
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="obs">Observações:</label>
            <input
              type="text"
              name="obs"
              placeholder="(Opcional)"
              onChange={(e) => setObs(e.target.value)}
              value={obs || ""}
            />
          </div>
          <div className="form-control">
            <label htmlFor="date">Data:</label>
            <DatePicker
              name="date"
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              maxDate={new Date()}
              required
            />
          </div>
          <input type="submit" value="Adicionar gasto" />
        </form>
      </div>
      <div className="total-month">
        <BsArrowLeft onClick={() => handleLeftArrow()} />
        <div className="total-text">
          <h3>
            Total do mês de {fullMonth.get(selectedMonth)} de {selectedYear}:
          </h3>
          <h2>R$ {getMonthTotal()}</h2>
        </div>
        <BsArrowRight onClick={() => handleRightArrow()} />
      </div>
      <div className="list">
        <h2>Lista de gastos</h2>
        {getMonthPurchases().length === 0 && <p>Não há gastos neste mês</p>}
        {getMonthPurchases().map((purchase) => (
          <div className="purchase" key={purchase._id}>
            <div>
              <h3>R$ {parseFloat(purchase.cost).toFixed(2)}</h3>
              <p>
                Observações: {purchase.obs === "" ? "Nenhuma" : purchase.obs}
              </p>
            </div>
            <div>
              <h4>{new Date(purchase.date).toLocaleDateString("pt-BR")}</h4>
              <BsTrash onClick={() => handleDelete(purchase._id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
