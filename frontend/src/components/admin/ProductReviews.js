import React, { Fragment, useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";

import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getProductReviews, clearErrors } from "../../actions/productActions";

const ProductReviews = () => {
  const [productId, setProductId] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, reviews } = useSelector((state) => state.productReviews);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (productId !== "") {
      dispatch(getProductReviews(productId));
    }
  }, [dispatch, alert, error, productId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getProductReviews(productId));
  };

  const setReviews = () => {
    const data = {
      columns: [
        {
          label: "ID Người dùng",
          field: "id",
          sort: "asc",
        },
        {
          label: "Đánh giá",
          field: "rating",
          sort: "asc",
        },
        {
          label: "Bình luận",
          field: "comment",
          sort: "asc",
        },
      ],
      rows: [],
    };

    reviews.forEach((review) => {
      data.rows.push({
        id: review._id,
        rating: review.rating,
        comment: review.comment,

        actions: (
          <button className="btn btn-danger py-1 px-2 ml-2">
            <i className="fa fa-trash"></i>
          </button>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"Product Reviews"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="row justify-content-center mt-5">
              <div className="col-5">
                <form onSubmit={submitHandler}>
                  <div className="form-group">
                    <label htmlFor="productId_field">Nhập ID sản phẩm</label>
                    <input
                      type="text"
                      id="productId_field"
                      className="form-control"
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                    />
                  </div>

                  <button
                    id="search_button"
                    type="submit"
                    className="btn btn-primary btn-block py-2"
                  >
                    Tìm kiếm
                  </button>
                </form>
              </div>
            </div>

            {reviews && reviews.length > 0 ? (
              <MDBDataTable
                data={setReviews()}
                className="px-3"
                bordered
                striped
                hover
              />
            ) : (
              <p className="mt-5 text-center">
                Chưa có lượt đánh giá nào với sản phẩm.
              </p>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
