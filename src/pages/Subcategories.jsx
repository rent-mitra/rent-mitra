import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SubcategoryPage = () => {
  const { category, subcategory } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch data dynamically based on category and subcategory
    fetch(`/api/categories/${category}/${subcategory}`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error(err));
  }, [category, subcategory]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>
        {category.charAt(0).toUpperCase() + category.slice(1)} -{" "}
        {subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}
      </h1>
      {items.length > 0 ? (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>No items found for this subcategory.</p>
      )}
    </div>
  );
};

export default SubcategoryPage;
