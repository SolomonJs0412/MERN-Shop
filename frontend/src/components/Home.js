import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MetaData from "./layout/MetaData";
import { getProducts } from "./../actions/productActions";
import Product from "./product/Product";

const Home = () => {
  const dispatch = useDispatch();

  const { loading, products, error, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <h1>Đang tải trang...</h1>
      ) : (
        <Fragment>
          <MetaData title={"Cửa hàng đồng hồ Online"} />
          <h1 id="products_heading">Sản phẩm mới nhất</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
