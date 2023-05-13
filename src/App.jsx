import React, { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputs, setInputs] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [updatedInput, setUpdatedInput] = useState("");

  const handleCheckboxChange = (index) => {
    const newTodos = [...todos];
    newTodos[index].isChecked = !newTodos[index].isChecked;
    setTodos(newTodos);
  };

  const handleInputs = (e) => {
    setInputs(e.target.value);
  };

  const handleAddTodo = () => {
    const trimmedInput = inputs.trim();
    if (trimmedInput !== "") {
      const todoIndex = todos.findIndex(
        (todo) => todo.text.trim() === trimmedInput
      );
      if (todoIndex !== -1) {
        alert("TODO already exists");
      } else {
        setTodos([...todos, { text: trimmedInput, isChecked: false }]);
        setInputs("");
      }
    }
  };

  const handleDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setUpdatedInput(todos[index].text);
  };

  const handleUpdate = (index) => {
    if (updatedInput === todos[index].text) {
      alert("No changes have been made.");
      return;
    }

    const newTodos = [...todos];
    newTodos[index].text = updatedInput;
    setTodos(newTodos);
    setEditIndex(-1);
    setUpdatedInput("");
  };

  const handleCancelUpdate = () => {
    setEditIndex(-1);
    setUpdatedInput("");
  };

  return (
    <div className="mx-11 md-mx-8">
      <header>
        <div className="bg-stone-900 flex justify-center mx-11 header">
          <h1 className="text-white  text-5xl">Todo</h1>
        </div>
      </header>
      <section>
        <div className="flex justify-center mx-11">
          <input
            value={inputs}
            onChange={handleInputs}
            type="text"
            className="w-full text-neutral-800 border-slate-200 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 border"
          />
          <button onClick={handleAddTodo} className="bg-rose-700">
            Submit
          </button>
        </div>
      </section>
      <div className="mx-11 md-mx-8 border-dotted  h-10 ">
        {todos.map((todo, index) => (
          <div
            className="flex justify-between pt-2 bg-slate-200 mb-5 "
            key={index}
          >
            {editIndex === index ? (
              <div>
                <input
                  type="text"
                  value={updatedInput}
                  onChange={(e) => setUpdatedInput(e.target.value)}
                  className="w-full text-neutral-800 border-slate-200 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 border"
                />
              </div>
            ) : (
              <div>
                <input
                  type="checkbox"
                  checked={todo.isChecked}
                  onChange={() => handleCheckboxChange(index)}
                />
                <span
                  className="text-black"
                  style={{
                    textDecoration: todo.isChecked ? "line-through" : "none",
                  }}
                >
                  {todo.text}
                </span>
              </div>
            )}
            <div>
              {editIndex === index ? (
                <>
                  <button
                    className="bg-green-600"
                    onClick={() => handleUpdate(index)}
                  >
                    Update
                  </button>
                  <button className="bg-red-600" onClick={handleCancelUpdate}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="bg-green-600"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
