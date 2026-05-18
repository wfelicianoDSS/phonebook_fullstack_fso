import axios from "axios";

const baseUrl = "https://fso-phonebook-backend-594j.onrender.com/api/persons";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getById = async (id: number) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const createPerson = async () => {};

const updatePerson = async () => {};

const deletePerson = async () => {};

export { getAll, getById, createPerson, updatePerson, deletePerson };
