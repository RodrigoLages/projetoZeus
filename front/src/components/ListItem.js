import { useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import Form from "./Form";

const API = "http://localhost:4000";

function ListItem(props) {
  const [cost, setCost] = useState(props.cost);
  const [obs, setObs] = useState(props.obs);
  const [selectedDate, setSelectedDate] = useState(props.date);
  const [formVisibility, setFormVisibility] = useState(false);

  const handleEdit = async (_id) => {
    setFormVisibility(!formVisibility);
  };

  const handleDelete = async (_id) => {
    if (!window.confirm("Você tem certeza que deseja excluir o item?")) return;

    await fetch(API + "/compra/" + _id, {
      method: "DELETE",
    });

    props.setPurchases((prevState) =>
      prevState.filter((purchase) => purchase._id !== _id)
    );
  };

  return (
    <div className="purchase_container">
      <div className="purchase" key={props._id}>
        <div className="left">
          <h3>R$ {parseFloat(cost).toFixed(2)}</h3>
          <p>Observações: {obs === "" ? "Nenhuma" : obs}</p>
        </div>
        <div>
          <h4>{new Date(selectedDate).toLocaleDateString("pt-BR")}</h4>
          <div>
            <BsPencilSquare onClick={() => handleEdit(props._id)} />
            <BsTrash onClick={() => handleDelete(props._id)} />
          </div>
        </div>
      </div>
      <div className={formVisibility ? "formEditShow" : "formEditHide"}>
        <Form
          _id={props._id}
          cost={cost}
          setCost={setCost}
          obs={obs}
          setObs={setObs}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setPurchases={props.setPurchases}
          setFormVisibility={setFormVisibility}
        />
      </div>
    </div>
  );
}

export default ListItem;