import { SearchBox } from "@mapbox/search-js-react";

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_REACT_MAPBOX_API_KEY;

export default function SearchBoxComponent() {
  return (
    <form className="absolute left-6 top-6 z-30 w-fit">
      <SearchBox
        accessToken={MAPBOX_ACCESS_TOKEN}
        onSelect={(result) => console.log(result)}
        value=""
        onRetrieve={(result) => console.log(result)}
      />
    </form>
  );
}
