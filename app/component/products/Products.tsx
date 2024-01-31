"use client";
import React, { useState } from "react";
import { useGetProductsQuery } from "@/app/redux/apis/productApi";

import { product } from "@/app/component/types/types";
import style from "@/app/products/products.module.css";

const Products = () => {
  const [page, setPage] = useState(0);
  const { data, isLoading, isSuccess, isFetching } = useGetProductsQuery({
    page,
  });

  console.log(data);
  return (
    <div className={style.mainWrapper}>
      {(isLoading || isFetching) && (
        <div className="display-flex-item-center">
          <span className="loader-spiner"></span>
        </div>
      )}

      {isSuccess &&
        data.products.map((product: product) => {
          return (
            <div key={product.id} className={style.post}>
              <img
                src={product.thumbnail}
                alt={product.title}
                className={style.productImage}
              />
              <div className={style.productInfo}>
                <div className={style.price}>{`${product.price} KWD`}</div>
                <div>{product.title}</div>
                <div className={style.postDescription}>
                  {product.description}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Products;
