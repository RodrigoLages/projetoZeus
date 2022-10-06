import { useState, useEffect, useContext } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context/AuthContext";
import Form from "../components/Form";
import ListItem from "../components/ListItem";
import Graph from "../components/Graph";



const API = "http://localhost:4000";

function Home() {
  const [cost, setCost] = useState("");
  const [obs, setObs] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toString());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(Context);
  const navigate = useNavigate();

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

  const getYearTotal = () => {
    return purchases
      .filter(
        (purchase) => new Date(purchase.date).getFullYear() === selectedYear
      )
      .reduce((prev, curr) => prev + curr.cost, 0)
      .toFixed(2);
  }

  const getYearsShown = () => {
    return [...new Set(purchases.map(
      item => new Date(item.date).getFullYear()
      ))].sort((a,b) => b - a)
  }

  //useEffect com [] so roda 1 vez ao iniciar a pagina
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      if (!token) return navigate("/login")

      const res = await fetch(API + "/compra", {
        method: "GET",
            headers: {
              "Authorization": "Bearer " + token,
            },
      })
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
  }, [token, navigate]);

  const handleLeftArrow = () => {
    if (selectedMonth === 0) setSelectedMonth(11);
    else setSelectedMonth(selectedMonth - 1);
  };

  const handleRightArrow = () => {
    if (selectedMonth === 11) setSelectedMonth(0);
    else setSelectedMonth(selectedMonth + 1);
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
          <div className="year-stats">
            <h3>Total do ano: R$ {getYearTotal()}</h3>
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
          <BsChevronLeft onClick={() => handleLeftArrow()} />
          <div className="total-text">
            <h3>Total do mês de </h3>
            <select 
            onChange={(e) => setSelectedMonth(fullMonth.indexOf(e.target.value))} 
            value={fullMonth[selectedMonth]}
            >
              {fullMonth.map((mth) => (<option value={mth} key={mth}>{mth}</option>))}
            </select>
            <select
            onChange={(e) => setSelectedYear(parseInt(e.target.value))} 
            value={getYearsShown().includes(selectedYear) ? selectedYear : setSelectedYear(getYearsShown()[0])}
            >
              {getYearsShown().map((year) => (<option value={year} key={year}>{year}</option>))}
            </select>
            <h2>R$ {getMonthTotal()}</h2>
          </div>
          <BsChevronRight onClick={() => handleRightArrow()} />
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
              purchases={purchases}
              setPurchases={setPurchases}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;