import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repo, setRepo] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepo(response.data)
    })
  }, [])

  async function handleAddRepository() {
    // TODO
    const newRepo = {
      url: 'https://github.com/axios/axios',
      title: 'Desafio ReactJS',
      techs: ['ReactJS', 'NodeJS']
    }

    const response = await api.post('/repositories', newRepo)

    setRepo(oldRepo => [...oldRepo, response.data])
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`/repositories/${id}`)
    setRepo(repo.filter(rep => rep.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repo.map(item => (
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
