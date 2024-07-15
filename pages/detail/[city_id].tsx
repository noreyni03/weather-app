import CityData from "../../interfaces/city";
import WeatherData from "../../interfaces/weather";
import cities from "../../lib/city.list.json";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

let Cities = cities as CityData[];

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { city_id } = context.query;
  // Find the city why city Id
  const city = Cities.find(city => city.id.toString() == city_id);
  if (!city) {
    throw new Error("City not found");
  }
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.WEATHER_API_KEY}&exclude=minutely&units=metric`;
  // Fetch the weather data
  const res = await fetch(url);
  const weatherData: WeatherData = await res.json();
  if (!weatherData) {
    throw new Error("Weather data not found");
  }
  return {
    props: {
      city: city,
      weather: weatherData,
    },
  };
}

type Props = {
  city: CityData;
  weather: WeatherData;
};

export default function funcName({ city, weather }: Props) {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  return (
    <>
      <Head>
        <title>WeatherData</title>
      </Head>
      <main className="mt-5 mx-5">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">WeatherData</h1>
        <Link href="/" className="text-sm text-blue-500 hover:underline">
          &larr; Home
        </Link>
        <div className="py-5 flex justify-center">
          <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-6 shadow-lg transform transition duration-500 hover:scale-105">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2 className="text-3xl mb-4 text-white font-semibold">
                  {city.name} ({city.country})
                </h2>
                <span className="font-medium text-2xl text-white">
                  {weather.main.temp_max.toFixed(0)}&deg;C
                </span>
                &nbsp;
                <span className="text-gray-200 text-lg">
                  {weather.main.temp_min.toFixed(0)}&deg;C
                </span>
              </div>
              <div className="flex flex-col items-end">
                <Image
                  loader={() => iconUrl}
                  src={iconUrl}
                  width={100}
                  height={100}
                  alt="Weather Icon"
                  className="rounded-full shadow-md"
                />
                <div className="text-white text-lg mt-2">
                  {weather.weather[0].description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}