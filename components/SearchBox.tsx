import React, { useEffect, useState } from "react";
import CityData from "../interfaces/city";
import Link from "next/link";
import styles from "./SearchBox.module.css"; // Import CSS module

const MIN_CITY_CHARS = 3;

let timeoutId: ReturnType<typeof setTimeout>;
const debounce = (fn: Function, ms = 300) => {
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export default function SearchBox() {
  const [inputValue, setInputValue] = useState("");
  const [cities, setCities] = useState<CityData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/city/${inputValue}`);
        const data = await response.json();
        setCities(data.cities);
      } catch (error) {
        console.error(error);
      }
    };
    if (inputValue.length >= MIN_CITY_CHARS) {
      debounce(fetchData)();
    }
  }, [inputValue]);

  return (
    <div className="flex flex-col items-center mt-10">
      <input
        className="bg-gray-200 p-4 rounded-lg w-80 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        type="text"
        placeholder="City name"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      {inputValue.length >= MIN_CITY_CHARS && (
        <ul className="mt-4 w-80 bg-white rounded-lg shadow-lg overflow-hidden">
          {cities.map(city => (
            <li key={city.id} className="border-b last:border-none">
              <Link href={`/detail/${city.id}`}>
                <span className="block p-4 hover:bg-blue-100 transition duration-300">
                  <span className="font-semibold">{city.name}</span>
                  {city.state ? `, ${city.state}` : ""} <span className="text-gray-500">({city.country})</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}