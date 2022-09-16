const API = "http://172.17.9.208:4000/compra";

//create
async function saveItem(item) {
  const res = await fetch(API, {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));

  return Promise.resolve(res.compras);
}

//get all
async function getItems() {
  const res = await fetch(API)
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return Promise.resolve(res.compras);
}

//get one
async function getItem(_id) {
  const res = await fetch(API + '/' + _id)
    .then((res) => res.json())
    .catch((err) => console.log("O erro foi: " + err));

  return res;
}

//patch one
async function editItem(item) {
  const res = await fetch(API + '/' + item._id, {
    method: "PATCH",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));

  return Promise.resolve(res.compras);
}

//delete one
async function deleteItem(_id) {
  await fetch(API + "/" + _id, {
    method: "DELETE",
  });
}

module.exports = {
  saveItem,
  getItems,
  getItem,
  editItem,
  deleteItem
};
