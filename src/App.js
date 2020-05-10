import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  /** state */
  const [list, setList] = useState([]);

  /** ações ao carregar a página */
  useEffect(() => {
    getListApi();
  }, []);

  /** busca os dados na api */
  async function getListApi() {
    const response = await api.get("/repositories");
    if (response.data) {
      setList(response.data);
    }
  }

  // cria repositório na api e no state
  async function handleAddRepository() {
    const dados = {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    };

    const response = await api.post("repositories", dados);
    if (response.data) {
      setList([response.data, ...list]);
    }
  }

  // remove repositório na api e no state
  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    if (response.status === 204) {
      setList(list.filter((item) => item.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {list.length > 0 &&
          list.map((item) => (
            <li key={item.id}>
              {item.title}
              <button onClick={() => handleRemoveRepository(item.id)}>
                Remover
              </button>
            </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
