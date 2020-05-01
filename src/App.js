import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const time = Date.now();

    const response = await api.post("repositories", {
      title: `Projeto ${time}`,
      url: `http://github.com.projeto-${time}`,
      techs: ["AngularJs", "ReactJs", "React Native"],
      likes: 0
    });

    console.log(response.data);
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const NewRepositories = Array.from(repositories);
    const repositoryIndex = NewRepositories.findIndex(
      repository => repository.id === id
    );

    NewRepositories.splice(repositoryIndex, 1);
    setRepositories(NewRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
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
