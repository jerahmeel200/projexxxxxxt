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
    if (inputs.trim() !== "") {
      setTodos([...todos, { text: inputs, isChecked: false }]);
      setInputs("");
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
            <div className="flex justify-between">
              {editIndex === index ? (
                <>
                  <button
                    className="bg-green-600 "
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

// import React, { useState } from "react";
// import FoodRecipe from "../../foodRecipe";
// import Calculator from "./Calculator";

// function App() {
//   const [todos, setTodos] = useState([]);
//   const [inputs, setInputs] = useState("");

//   const handleInputs = (e) => {
//     setInputs(e.target.value);
//   };
//   const handleAddTodo = () => {
//     setTodos([...todos, inputs]);
//     setInputs("");
//   };
//   const handeleRemove = (index) => {
//     const newTodo = [...todos];
//     newTodo.splice(index, 1);
//     setTodos(newTodo);
//   };
//   return (
//     <div>
//       <input type="text" value={inputs} onChange={handleInputs} />
//       <button onClick={handleAddTodo}>add</button>

//       <ul>
//         {todos.map((todo, index) => (
//           <li key={index}>
//             {todo}
//             <button onClick={() => handeleRemove(index)}>delete</button>
//           </li>
//         ))}
//       </ul>
//       {/* <Calculator /> */}

//     </div>
//   );
// }

// export default App;

// import React, { useRef, useState } from "react";
// import { youtube_parser } from "./utils";
// import axios from "axios";

// function App() {
//   const inputUrlRef = useRef();
//   const [urlResult, setUrlResult] = useState(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const youtubeID = youtube_parser(inputUrlRef.current.value);
//     console.log(youtubeID);

//     const options = {
//       method: "get",
//       url: "https://youtube-mp36.p.rapidapi.com/dl",
//       headers: {
//         "X-RapidAPI-Key": "55394cabe0msh445d3e040f6fa20p1b0f32jsn51741384fc18",
//         "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
//       },
//       params: {
//         id: youtubeID,
//       },
//     };
//     axios(options)
//       .then((res) => setUrlResult(res.data.link))
//       .catch((err) => console.log(err));
//     inputUrlRef.current.value = "";
//   };
//   return (
//     <div className="app">
//       <span className="logo">youtube2mp3</span>
//       <section className="content">
//         <h1 className="content_title ">Youtube to mp3 converter</h1>
//         <p className="content_description">
//           Transform youtube videos into mp3 in just a few click{" "}
//         </p>
//         <form onSubmit={handleSubmit} className="form">
//           <input
//             ref={inputUrlRef}
//             placeholder="paste your youtube url"
//             type="text"
//             className="form_input"
//           />
//           <button type="submit" className="form_button">
//             search
//           </button>
//         </form>
//         {urlResult ? (
//           <a
//             target="_blank"
//             rel="noreferrer"
//             className="download_btn"
//             href={urlResult}
//           >
//             Download Mp3
//           </a>
//         ) : (
//           ""
//         )}
//       </section>
//     </div>
//   );
// }

// export default App;
