import SearchBox from "../components/SearchBox";
import Head from "next/head";
export default function Search() {
  return (
    <>
      <Head>
        <title>Weather-App</title>
      </Head>
      <main className="mt-5 mx-5 bg-blue-50 p-5 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Weather-App</h1>
        <form className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl mb-4 text-gray-800 font-semibold">
            Enter a city name to see its weather
          </h2>
          <div className="mb-4">
            <SearchBox />
          </div>
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
            Search
          </button>
        </form>
      </main>
    </>
  );
}