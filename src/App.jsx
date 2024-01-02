/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'

import "./App.css";


const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProduct = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products?limit=100");
      const data = await res.json();
      console.log(data);
      if (data && data.products) {
        setProducts(data.products);

      }

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
 
  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= products.length / 10 && selectedPage !== page) {
      setPage(selectedPage)
    }
  }

  return (
    <div className='pic'>
      {products.length > 0 &&
        <div className="products">
          {products.slice(page*6-6,page*6).map((prod) => (
            <span className='products__single' key={prod.id}>
              <img src={prod.thumbnail} alt={prod.title} />
              <span>{prod.title}</span>
              <span className='price'>${prod.price}</span>

            </span>

          ))}
        </div>
      }

{products.length > 0 && <div className="pagination">
        <span onClick={() => selectPageHandler(page - 1)} className={page > 1 ? "" : "pagination__disable"}>◀</span>

        {[...Array(products.length / 10)].map((_, i) => {
          return <span key={i} className={page === i + 1 ? "pagination__selected" : ""} onClick={() => selectPageHandler(i + 1)}>{i + 1}</span>
        })}

        <span onClick={() => selectPageHandler(page + 1)} className={page < products.length / 10 ? "" : "pagination__disable"}>▶</span>
      </div>}
    </div>
  )
}

export default App
