import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { Row, Col, Space, Typography } from "antd";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import searchClient from "../helper";
import { useState } from "react";
import { Checkbox } from "antd";

const SearchResults = () => {
  const { Text } = Typography;
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const algoliaClient = searchClient;
  const algoliaIndex = algoliaClient.initIndex("products_ecommerce");
  const [priceRefinements, setpriceRefinements] = useState("");
  const [ratingRefinements, setRatingRefinements] = useState("");
  // Function to get the hits from aloglia.
  const search = async (query) => {
    setLoading(true);
    try {
      let filters = [];
      if (priceRefinements) {
        filters.push(priceRefinements);
      }
      if (ratingRefinements) {
        filters.push(ratingRefinements);
      }
      const combinedFilters = filters.join(" AND ");

      const result = await algoliaIndex.search(query, {
        filters: combinedFilters,
      });

      setSearchResults(result.hits);
      console.log(result.hits);
    } catch (error) {
      console.error("Error searching:", error);
      setSearchResults([]);
    }
    setLoading(false);
  };

  const handlePriceChange = (value) => {
    setpriceRefinements(value === priceRefinements ? null : value);
  };

  const handleRatingChange = (value) => {
    setRatingRefinements(value === ratingRefinements ? null : value);
  };

  useEffect(() => {
    search(query);
  }, [priceRefinements, ratingRefinements]);

  useEffect(() => {
    setpriceRefinements("");
    setRatingRefinements("");
  }, [query]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2>Refinement List</h2>
        <ul>
          <Text>Ratings</Text>
          <li>
            <Checkbox
              onChange={() => handlePriceChange("price:0 TO 50")}
              checked={priceRefinements === "price:0 TO 50"}
            >
              Rs0 - Rs50
            </Checkbox>
          </li>
          <li>
            <Checkbox
              onChange={() => handlePriceChange("price:51 TO 100")}
              checked={priceRefinements === "price:51 TO 100"}
            >
              Rs51 - Rs100
            </Checkbox>
          </li>
          <Text>Ratings</Text>
          <li>
            <Checkbox
              onChange={() => handleRatingChange("rating.rate:4.5 TO 5")}
              checked={ratingRefinements === "rating.rate:4.5 TO 5"}
            >
              4.5 or higher
            </Checkbox>
          </li>
          <li>
            <Checkbox
              onChange={() => handleRatingChange("rating.rate:4 TO 4.5")}
              checked={ratingRefinements === "rating.rate:4 TO 4.5"}
            >
              4 to 4.5
            </Checkbox>
          </li>
          <li>
            <Checkbox
              onChange={() => handleRatingChange("rating.rate:3.5 TO 4")}
              checked={ratingRefinements === "rating.rate:3.5 TO 4"}
            >
              3.5 to 4
            </Checkbox>
          </li>
        </ul>
      </div>
      {searchResults.length === 0 ? (
        <p>No results found</p>
      ) : (
        <Row gutter={4}>
          {searchResults.map((hit) => (
            <Col key={hit.id} xs={24} sm={12} md={12} lg={6}>
              <ProductCard product={hit} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};
export default SearchResults;
