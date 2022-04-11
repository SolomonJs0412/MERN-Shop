import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to="/dashboard">
              <i className="fa fa-tachometer"></i> Dashboard
            </Link>
          </li>

          <li>
            <a
              href="#productSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-product-hunt"></i> Sản phẩm
            </a>
            <ul className="collapse list-unstyled" id="productSubmenu">
              <li>
                <Link to="/admin/products">
                  <i className="fa fa-clipboard"></i> Tất cả sản phẩm
                </Link>
              </li>

              <li>
                <Link to="/admin/product">
                  <i className="fa fa-plus"></i> Tạo mới
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/admin/orders">
              <i className="fa fa-shopping-basket"></i> Đơn đặt hàng
            </Link>
          </li>

          <li>
            <Link to="/admin/users">
              <i className="fa fa-users"></i> Người dùng
            </Link>
          </li>

          <li>
            <Link to="/admin/reviews">
              <i className="fa fa-star"></i> Đánh giá
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
