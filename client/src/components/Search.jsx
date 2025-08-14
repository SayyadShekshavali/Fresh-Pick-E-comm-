import React, { useEffect, useState } from "react";
import { CartStore } from "../store/CartStore";
function Search() {
  const search = CartStore((state) => state.search);
  const [product, setProduct] = useState([]);
  const [name, setName] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      if (name.trim() === "") return;
      const result = await search(name);
      console.log("Result from search:", result);
      setProduct(result || []);
    };
    fetchData();
  }, [name]);
  console.log(product);
  return (
    <div className="h-120 ">
      <h1 className="text-center m-10 ">Search for product</h1>
      <div className="flex justify-center align-center  m-3">
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Search for Product"
          className="p-5 rounded-xl border-2 border-black h-10 w-100"
        />
      </div>
      <div>
        <div>
          {product.length === 0 ? (
            <h2>Product not found</h2>
          ) : (
            product.map((item, index) => {
              return (
                <div key={index} className="flex flex-col items-center m-4">
                  <img
                    src={`http://localhost:5000/${item.photo.replace(
                      /\\/g,
                      "/"
                    )}`}
                    alt={item.name}
                    className="lg:h-50 lg:w-100 h-[70px] w-[140px] md:h-[90px] w-[150px] object-cover rounded"
                  />
                  <div className="text-center mt-2">
                    <p className="lg:text-xl text-md font-bold">{item.name}</p>
                    <p className="lg:text-lg text-md">Price: ${item.price}</p>
                    <p className="lg:text-lg text-md">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
