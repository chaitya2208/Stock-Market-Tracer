import { useState } from "react";
import { Search } from "lucide-react";
import WatchList from "./WatchList.js";

function WatchListContainer() {
  console.log("WatchListContainer Rendered!");

  const [searchText, setSearchText] = useState("");

  return (
    <div className="w-screen p-6 bg-white shadow-lg rounded-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Watchlist</h1>
      </div>

      <div className="mb-4 flex items-center gap-4">
        <div className="relative ml-auto w-64">
          <input
            type="text"
            placeholder="Search stocks..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="h-10 w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none shadow-sm"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search className="h-4 w-4" />
          </button>
        </div>
      </div>

      <WatchList searchText={searchText} />
    </div>
  );
}

export default WatchListContainer;

