import React, { useEffect, useState } from "react";
import { InputGroup, FormControl, Alert } from "react-bootstrap";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import TodoLogo from "./images/todologo.svg";
import "./todo.css";

const GetStoreData = () => {
  let list = localStorage.getItem("list");

  if (list) {
    return JSON.parse(localStorage.getItem("list") as string);
  } else {
    return [];
  }
};

function Todo() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(GetStoreData());
  const [message, setMessage] = useState(0);
  const [toggleItem, setToggleItem] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  //   Add items method
  const addItems = () => {
    if (!inputData) {
    } else if (inputData && !toggleItem) {
      setItems(
        items.map((elem:any) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setToggleItem(true);
      setInputData('');
      setIsEditItem(null);
      setMessage(3);
      setTimeout(() => {
        setMessage(0);
      }, 2000);
    } else {
      const addAllData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, addAllData]);
      setInputData("");
      setMessage(1);
      setTimeout(() => {
        setMessage(0);
      }, 2000);
    }
  };

  //   Delete items method
  const deleteItems = (ind:any) => {
    const updatedData = items.filter((elem:any) => {
      return ind !== elem.id;
    });
    setItems(updatedData);
    setMessage(2);
    setTimeout(() => {
      setMessage(0);
    }, 2000);
  };

  //   removeAll all method
  const removeAll = () => {
    setItems([]);
    setMessage(2);
    setTimeout(() => {
      setMessage(0);
    }, 2000);
  };

  // Edit items Method
  const editItem = (id:any) => {
    let editItemValue = items.find((elem:any) => {
      return elem.id === id;
    });
    console.log(editItemValue);
    setToggleItem(false);
    setInputData(editItemValue.name);
    setIsEditItem(id);
  };

  // Set local storage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(items));
  }, [items]);
  return (
    <div className="myMainDiv">
      <div className="message">
        {message === 1 ? (
          <Alert variant="success">Successfully Add todo!</Alert>
        ) : message === 2 ? (
          <Alert variant="danger">Deleted your todo!</Alert>
        ) : message === 3 ? (
          <Alert variant="warning">Todo Updated?!</Alert>
        ) :  null}
      </div>
      <div className="main_TodoDiv py-5">
        <div className="childTodoDiv my-5">
          <figure className="d-flex  align-items-center flex-column">
            <img width="150px" src={TodoLogo} alt="logo" />
            <figcaption className="my-2 fw-bold text-white">
              Add Your Todo List ✌️
            </figcaption>
          </figure>

          <div className="inputSection">
            <InputGroup className="mb-5">
              <FormControl
                className="text-capitalize"
                placeholder="✍️ Add your Todo"
                aria-label="✍️ Add your Todo"
                type="text"
                value={inputData}
                aria-describedby="basic-addon"
                onChange={(e) => setInputData(e.target.value)}
              />
              {toggleItem ? (
                <Button title="Add item" onClick={addItems} variant="contained">
                  <AddIcon color="primary" />
                </Button>
              ) : (
                <Button onClick={addItems} variant="contained" title="Update data">
                  <EditIcon className="text-success" />
                </Button>
              )}
            </InputGroup>
          </div>

          <div className="todoItem">
            {items.map((val:any) => {
              return (
                <div key={val.id} className="eachitem mb-2 text-capitalize">
                  <span>{val.name}</span>
                  <div>
                    <span id="editIcon" title="Edit item">
                      <EditIcon onClick={() => editItem(val.id)} />
                    </span>
                    <span title="Delete item">
                      <DeleteIcon
                        id="deleteIcon"
                        onClick={() => deleteItems(val.id)}
                      />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="clearAll my-3">
            <Button
              title="Delete item"
              onClick={removeAll}
              className="fw-bold text-danger"
              variant="contained"
            >
              <span>Remove All</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
