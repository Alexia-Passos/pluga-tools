import "./Home.css";
import { useEffect, useState } from "react";

import CardContent from "./components/card-content/CardContent";
import HomePagination from "./components/home-pagination/home-pagination";

function Home() {
  const [plugaResource, setPlugaResource] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [itensPagination] = useState(12);
  const [currentPagination, setCurrentPagination] = useState(0);

  const numberOfPages = Math.ceil(plugaResource.length / itensPagination);
  const startIndex = currentPagination * itensPagination;
  const endIndex = startIndex + itensPagination;
  const currentItens = plugaResource.slice(startIndex, endIndex);

  useEffect(() => {
    const url = `https://pluga.co/ferramentas_search.json`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPlugaResource(data);
      });
  }, []);

  const filterPlugaResource =
    searchValue.length > 0
      ? plugaResource.filter((resource) =>
          resource.name.toLowerCase().includes(searchValue)
        )
      : [];

  return (
    <div className="container">
      <div className="headerStyle">
        <img
          className="plugaLogo"
          src="/pluga-alltype-white.svg"
          alt="pluga-logo"
        ></img>
        <input
          className="inputStyle"
          type={"search"}
          placeholder="Buscar Ferramentas"
          onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
        />
      </div>

      <div className="cardContainer" data-testid="card-element">
        {searchValue.length > 0
          ? filterPlugaResource.map((element) => {
              return (
                <CardContent
                  key={element.app_id}
                  name={element.name}
                  icon={element.icon}
                  link={element.link}
                />
              );
            })
          : currentItens.map((element) => {
              return (
                <CardContent
                  key={element.app_id}
                  name={element.name}
                  icon={element.icon}
                  link={element.link}
                />
              );
            })}
      </div>
      <HomePagination
        setCurrentPage={setCurrentPagination}
        numberOfPage={numberOfPages}
      />
    </div>
  );
}

export default Home;
