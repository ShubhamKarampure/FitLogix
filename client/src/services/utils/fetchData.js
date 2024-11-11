import { FaTeeth } from "react-icons/fa";

export const exerciseOptions = {
  method: 'GET',
  url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_EXERCISEDB_KEY,
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  }
};


export const fetchData = async (url, options) => {

    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}