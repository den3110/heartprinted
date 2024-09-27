import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@material-ui/core/";
import { NotificationManager } from "react-notifications";
import { GetCategoryDetails } from "../../../../services";
import "./index.css";

const Filterbycategory = ({ onSelectFilterCategory }) => {
  const [list, setList] = useState([]);
  const [toggle, setToggle] = useState("");

  const handleToggleButton = (id) => () => {
    setToggle(id);
  };

  const handleFilterCategory = async (row, slug) => {
    let data = { id: row.id, slug: slug };
    try {
      let category = await GetCategoryDetails.getFilterByCategory(data);
      if (category) {
        onSelectFilterCategory(category);
      } else {
        NotificationManager.error("empty data in category", "Undefined");
      }
    } catch (e) {
      NotificationManager.error("empty data in category", "Undefined");
    }
  };

  const fetchCategoryDetails = useCallback(async () => {
    let url = window.location.href.split("/");
    var lastSegment = url.pop() || url.pop();
    try {
      let category = await GetCategoryDetails.getAllCategoryList(lastSegment);
      if (category) {
        setList(category.data);
      }
    } catch (e) {
      NotificationManager.error("empty data in category", "Undefined");
    }
  }, []);

  useEffect(() => {
    fetchCategoryDetails();
  }, [fetchCategoryDetails]);

  return (
    <div>
      <Button
        togglefilter="offcanvas1"
        className="filter-btn pull-bs-canvas-right"
        variant="contained"
        color="secondary"
      >
        Filters
      </Button>
      <div className="bs-canvas bs-canvas-right position-fixed bg-cart h-100">
        <div className="bs-canvas-header side-cart-header p-3 ">
          <div className="d-inline-block  main-cart-title">Filters</div>
          <button
            type="button"
            className="bs-canvas-close close"
            aria-label="Close"
          >
            <i className="mdi mdi-close" />
          </button>
        </div>
        <div className="bs-canvas-body filter-body">
          {list ? (
            <div className="filter-items">
              <div className="filtr-cate-title">
                <h4>{list.name}</h4>
              </div>

              <div className="shop-filters filter-item-body">
                <div id="accordion">
                  {!list.SubCategories
                    ? "loading"
                    : list.SubCategories.map((prop, index) => {
                        return (
                          <div className="card" key={index}>
                            <div className="card-header" id="headingThree">
                              <h5 className="mb-0">
                                <button
                                  className="btn btn-link"
                                  onClick={handleToggleButton(prop.id)}
                                >
                                  {prop.sub_name}{" "}
                                  <span className="mdi mdi-chevron-down float-right" />
                                </button>
                              </h5>
                            </div>
                            {prop.SubChildCategories.map((row, index) => (
                              <div
                                key={index}
                                id="collapsefour"
                                className={
                                  row.subcategoryId === toggle
                                    ? "collapse show"
                                    : "collapse"
                                }
                              >
                                <div className="card-body">
                                  <div
                                    className="list-group bs-canvas-close"
                                    aria-label="Close"
                                    onClick={() =>
                                      handleFilterCategory(row, list.slug)
                                    }
                                  >
                                    <span className="list-group-item list-group-item-action">
                                      {row.name}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* Filter Right Sidebar Offsetl End*/}
    </div>
  );
};

export default Filterbycategory;
