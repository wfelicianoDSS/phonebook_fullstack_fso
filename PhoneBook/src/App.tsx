import React, { useEffect, useState } from "react";
import { getAll } from "./Requests";
import "./App.css";

interface person {
  name: string;
  phone: string;
}

function App() {
  const [persons, setPersons] = useState<person[]>([]);

  useEffect(() => {
    getAll().then(setPersons);
  }, []);

  const [newName, setNewName] = useState<string>("");
  const [newPhone, setNewPhone] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPhone(event.target.value);
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const duplicate = persons.some((p) => p.name === newName);
    if (duplicate) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }
    const newPerson = { name: newName, phone: newPhone };
    setPersons([...persons, newPerson]);
    setNewName("");
    setNewPhone("");
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  // compute filtered persons on render
  const filteredPersons = !search.trim()
    ? persons
    : persons.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      );

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <div>
          Filter <input value={search} onChange={handleSearchChange} />
        </div>
        <form onSubmit={handleOnSubmit}>
          <div>
            name: <input value={newName} onChange={handleNameChange} />
          </div>
          <div>
            phone: <input value={newPhone} onChange={handlePhoneChange} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        {filteredPersons.map((person) => (
          <p key={person.name}>
            {person.name} - {person.phone}
          </p>
        ))}
      </div>
    </>
  );
}

export default App;
