import React from "react";
import { useSearchParams } from "react-router-dom";

const PRODUCTS = [
  { label: "Pen", value: "pen" },
  { label: "Pencil", value: "pencil" },
];
const COLOR = [
  { label: "Black", value: "black" },
  { label: "Blue", value: "blue" },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get selected types as an array
  const selectedTypes = searchParams.get("type")
    ? searchParams.get("type")!.split(",")
    : [];
  // Get selected types as an array
  const selectedColors = searchParams.get("color")
    ? searchParams.get("color")!.split(",")
    : [];

  const handleCheckboxChange = (key = "type", value: string) => {
    if (key === "type") {
      let updatedTypes: string[];
      if (selectedTypes.includes(value)) {
        updatedTypes = selectedTypes.filter((type) => type !== value);
      } else {
        updatedTypes = [...selectedTypes, value];
      }
      if (updatedTypes.length > 0) {
        searchParams.set("type", updatedTypes.join(","));
      } else {
        searchParams.delete("type");
      }
      setSearchParams(searchParams);
    } else if (key === "color") {
      let updatedTypes: string[];
      if (selectedColors.includes(value)) {
        updatedTypes = selectedColors.filter((type) => type !== value);
      } else {
        updatedTypes = [...selectedColors, value];
      }
      if (updatedTypes.length > 0) {
        searchParams.set("color", updatedTypes.join(","));
      } else {
        searchParams.delete("color");
      }
      setSearchParams(searchParams);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <section>
        <h4>Product</h4>
        {PRODUCTS.map((product) => (
          <label
            key={product.value}
            style={{ display: "block", margin: "8px 0" }}
          >
            <input
              type="checkbox"
              value={product.value}
              checked={selectedTypes.includes(product.value)}
              onChange={() => handleCheckboxChange("type", product.value)}
            />
            {product.label}
          </label>
        ))}
      </section>
      <section>
        <h4>Color</h4>
        {COLOR.map((color) => (
          <label
            key={color.value}
            style={{ display: "block", margin: "8px 0" }}
          >
            <input
              type="checkbox"
              value={color.value}
              checked={selectedColors.includes(color.value)}
              onChange={() => handleCheckboxChange("color", color.value)}
            />
            {color.label}
          </label>
        ))}
      </section>
      <pre>
        {JSON.stringify(Object.fromEntries(searchParams.entries()), null, 2)}
      </pre>
    </div>
  );
};

export default Products;
