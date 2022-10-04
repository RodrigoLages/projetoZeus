import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext } from "react";
import { Context } from "../Context/AuthContext";

const API = "http://localhost:4000";

function Form(props) {
  const { token } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!props._id) {
      //Create
      const purchase = {
        cost: props.cost,
        obs: props.obs,
        date: props.selectedDate,
      };

      const res = await fetch(API + "/compra", {
        method: "POST",
        body: JSON.stringify(purchase),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));

      props.setPurchases((prevState) =>
        [...prevState, res.novaCompra].sort(
          (a, b) => new Date(a.date).getDate() - new Date(b.date).getDate()
        )
      );

      props.setCost("");
      props.setObs("");
      props.setSelectedDate(new Date().toString());
    } else {
      //Update
      const purchase = {
        cost: props.cost,
        obs: props.obs,
        date: props.selectedDate,
      };

      await fetch(API + "/compra/" + props._id, {
        method: "PATCH",
        body: JSON.stringify(purchase),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
      });

      const res = await fetch(API + "/compra", {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token,
        }
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));

      props.setPurchases(
        res.compras.sort(
          (a, b) => new Date(a.date).getDate() - new Date(b.date).getDate()
        )
      );

      props.setFormVisibility(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="cost">Quanto você gastou?</label>
        <input
          type="number"
          name="cost"
          placeholder="00,00"
          onChange={(e) => props.setCost(parseFloat(e.target.value))}
          value={props.cost || ""}
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
          autoComplete="off"
          onChange={(e) => props.setObs(e.target.value)}
          value={props.obs || ""}
        />
      </div>
      <div className="form-control">
        <label htmlFor="date">Data:</label>
        <DatePicker
          name="date"
          selected={new Date(props.selectedDate)}
          onChange={(date) => props.setSelectedDate(date.toString())}
          dateFormat="dd/MM/yyyy"
          maxDate={new Date()}
          withPortal
          required
        />
      </div>
      <input type="submit" value="Salvar" />
    </form>
  );
}

export default Form;
