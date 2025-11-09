import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Countries = () => {
  const [data, setData] = useState([]);
  const [rangeValue, setRangeValue] = useState(36);
  const radios = ["Africa", "America", "Europe", "Asia", "Oceania"];
  const [selectedRadio, SetselectedRadio] = useState("");
  useEffect(() => {
    axios
      .get(
        "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,continents"
      )
      .then((res) => setData(res.data));
  }, []);

  return (
    <div className="countries">
      <ul>
        <ul className="radio-container">
          <input
            type="range"
            min="1"
            max="250"
            defaultValue={rangeValue}
            onChange={(e) => setRangeValue(e.target.value)}
          />
          {radios.map((continent, index) => (
            <li key={index}>
              <input
                type="radio"
                id={continent}
                checked={continent === selectedRadio}
                name="continent-radio"
                onChange={(e) => SetselectedRadio(e.target.id)}
              />
              <label htmlFor={continent}>{continent}</label>
            </li>
          ))}
        </ul>
      </ul>
      <h2>Countries</h2>

      {selectedRadio && (
        <button onClick={() => SetselectedRadio("")}>
          Annuler la recherche{" "}
        </button>
      )}
      <ul>
        {data
          .filter((country) => country.continents[0].includes(selectedRadio))
          .sort((a, b) => b.population - a.population)
          .slice(0, rangeValue)
          .map((country, index) => (
            <Card key={index} country={country} />
          ))}
      </ul>
    </div>
  );
};

export default Countries;
