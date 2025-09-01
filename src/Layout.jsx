import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import CustomHeader from "./SharedComponents/CustomHeader";
import FooterComponent from "./SharedComponents/CustomFooter";
import searchClient from "./helper";
import SearchResults from "./SharedComponents/SearchResults";
const Layout = () => {
  // const location = useLocation();
  // const [searchResults, setSearchResults] = useState([]);

  // const algoliaClient = searchClient;
  // const algoliaIndex = algoliaClient.initIndex("products_ecommerce");

  // // Function to get the hits from aloglia.
  // const search = async (query) => {
  //   try {
  //     const result = await algoliaIndex.search(query);
  //     setSearchResults(result.hits);
  //     console.log(searchResults);
  //   } catch (error) {
  //     console.error("Error searching:", error);
  //     setSearchResults([]);
  //   }
  // };

  // const handleSearch = (query) => {
  //   search(query);
  // };

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <CustomHeader
      // style={{ flex: "0 0 auto" }}
      // location={location}
      // handleSearch={handleSearch}
      />
      <div style={{ flex: "1 0 auto" }}>
        {/* Conditionally render SearchResults component based on route
        {location.pathname === "/search" && (
          <SearchResults searchResults={searchResults} />
        )} */}
        <Outlet />
      </div>
      <FooterComponent style={{ flex: "0 0 auto" }} />
    </div>
  );
};

export default Layout;
