import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  /** state */
  const [repositories, setRepositories] = useState([]);
  const [data, setData] = useState([]);

  /** variavel que controle se o item pode ser criado */
  const isValid = !!data.title && !!data.url && !!data.techs;

  useEffect(() => {
    api.get("/repositories").then((response) => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", data);
    if (response.status === 200) {
      setRepositories([...repositories, response.data]);
      setData([]);
    }
  }

  async function handleRemoveRepository(id) {
    /** envia para api o pedido de delete */
    const response = await api.delete(`/repositories/${id}`);

    /** se o status for correspondente remove o item do array do state */
    if (response.status === 204) {
      setRepositories(
        repositories.filter((repository) => repository.id !== id)
      );
    }
  }

  function handleData(event) {
    /** desestrutura a variavel event */
    const { name, value } = event.target;
    /** atribui os valores ao array do state */
    setData({ ...data, [name]: value });
  }

  return (
    <div className="container">
      <div className="repository-create">
        <form action="#" autoComplete="off">
          <label htmlFor="">título</label>
          <input
            type="text"
            name="title"
            value={data.title || ""}
            onChange={handleData}
          />

          <label htmlFor="">url</label>
          <input
            type="text"
            name="url"
            value={data.url || ""}
            onChange={handleData}
          />

          <label htmlFor="">techs</label>
          <input
            type="text"
            name="techs"
            value={data.techs || ""}
            onChange={handleData}
          />
        </form>

        <button disabled={!isValid} onClick={handleAddRepository}>
          Adicionar
        </button>
      </div>

      <ul data-testid="repository-list" className="list">
        <h1>Lista repositórios</h1>
        {repositories.length > 0 ? (
          repositories.map((repository) => (
            <li key={repository.id}>
              <span>{repository.title}</span>
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))
        ) : (
          <li>nenhum repositório encontrado</li>
        )}
      </ul>
    </div>
  );
}

export default App;
