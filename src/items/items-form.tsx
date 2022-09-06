
import { useEffect, useState, useRef } from "react";
import { OnClick, Search, SearchComponentState, useSearch, value, checked, PageSizeSelect } from "react-hook-core";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Pagination } from "reactx-pagination";
import { inputSearch } from "uione";
import { getItemService, Item, ItemFilter } from "./service";
import { SortItem } from "./sortItem";

import { Chip, TextField, Autocomplete } from "@mui/material";
import { SaveItem } from "./saveItem";
import { Shop } from "../shop/service";

interface ItemSearch extends SearchComponentState<Item, ItemFilter> { }

export interface Props {
  shop?: Shop;
}

export const ItemsForm = (props: Props) => {
  const { shop } = props;
  const navigate = useNavigate();
  const refForm = useRef();
  const location = useLocation();
  const [isShop, setIsShop] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);

  console.log(props.shop);


  useEffect(() => {
    if (location.pathname.includes("products")) {
      setIsShop(true);
    }
  }, [location.pathname])

  const itemFilter: ItemFilter = {
    shopId: props.shop?.id
  };

  const initialState: ItemSearch = {
    list: [],
    filter: itemFilter,
  };

  const getFilter = (): ItemFilter => {
    return value(state.filter);
  };

  const p = { getFilter };

  const {
    state,
    resource,
    component,
    updateState,
    search,
    doSearch,
    sort,
    toggleFilter,
    clearQ,
    changeView,
    pageChanged,
    pageSizeChanged,
    setState,
  } = useSearch<Item, ItemFilter, ItemSearch>(refForm, initialState, getItemService(), inputSearch(), p);

  component.viewable = true;
  component.editable = true;

  const edit = (e: OnClick, id: string) => {
    e.preventDefault();
    navigate(`${id}`);
  };

  const { list } = state;
  state.filter = {
    ...state.filter,
    shopId: props.shop?.id
  }

  const filter = value(state.filter);
  console.log({ filter });

  const renderReviewStar = () => {
    const starList = Array(5)
      .fill(<i />)
      .map((item, index) => {
        return <i key={index}></i>;
      });
    const classes = Array.from(Array(5).keys())
      .map((i) => `star-${i + 1}`)
      .join(" ");
    return <div className={`rv-star2 ${classes}`}>{starList}</div>;
  };

  var formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })

  return (
    <div className="view-container">
      {/* <header>
        <h2>Items</h2>
        <div className="btn-group">
          {component.view !== "table" && (
            <button
              type="button"
              id="btnTable"
              name="btnTable"
              className="btn-table"
              data-view="table"
              onClick={changeView}
            />
          )}
          {component.view === "table" && (
            <button
              type="button"
              id="btnListView"
              name="btnListView"
              className="btn-list-view"
              data-view="listview"
              onClick={changeView}
            />
          )}
          {component.addable && <Link id="btnNew" className="btn-new" to="add" />}
        </div>
      </header> */}
      <div>
        {/* Search */}
        <form id="itemsForm" name="itemsForm" noValidate={true} ref={refForm as any}>
          <section className="row search-group">
            <Search
              className="col s12 m6 search-input"
              size={component.pageSize}
              sizes={component.pageSizes}
              pageSizeChanged={pageSizeChanged}
              onChange={updateState}
              placeholder={resource.keyword}
              toggle={toggleFilter}
              value={filter.q || ""}
              search={search}
              clear={clearQ}
            />
            <Pagination
              className="col s12 m6"
              total={component.total}
              size={component.pageSize}
              max={component.pageMaxSize}
              page={component.pageIndex}
              onChange={pageChanged}
            />
          </section>
          {/* Search input */}
          <section className="row search-group inline" hidden={component.hideFilter}>
            <label className="col s12 m4 l3">
              Id
              <input
                type="text"
                id="id"
                name="id"
                value={filter.id || ""}
                onChange={updateState}
                maxLength={255}
                placeholder="Id"
              />
            </label>
            <label className="col s12 m4 l3">
              {resource.person_title}
              <input
                type="text"
                id="title"
                name="title"
                value={filter.title || ""}
                onChange={updateState}
                maxLength={255}
                placeholder={resource.person_title}
              />
            </label>
            <label className="col s12 m4 l4 checkbox-section">
              {resource.status}
              <section className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    id="A"
                    name="status"
                    value="A"
                    checked={checked(filter.status, "A")}
                    onChange={updateState}
                  />
                  {resource.active}
                </label>
                <label>
                  <input
                    type="checkbox"
                    id="I"
                    name="status"
                    value="I"
                    checked={checked(filter.status, "I")}
                    onChange={updateState}
                  />
                  {resource.inactive}
                </label>
              </section>
            </label>
            <label className="col s12 m4 l3">
              {resource.description}
              <input
                type="text"
                id="description"
                name="description"
                value={filter.description || ""}
                onChange={updateState}
                maxLength={255}
                placeholder={resource.description}
              />
            </label>
            <label className="col s12 m4 l3">
              Price from
              <input
                type="number"
                id="pricemin"
                name="pricemin"
                value={filter.price?.min || ""}
                onChange={(e: any) => {
                  const value = e.currentTarget.value || "";
                  setState({
                    filter: {
                      ...filter,
                      price: { ...filter.price, min: parseInt(value) },
                    },
                  });
                }}
                maxLength={255}
                placeholder="Price"
              />
            </label>
            <label className="col s12 m4 l4">
              to
              <input
                type="number"
                id="pricemax"
                name="pricemax"
                value={filter.price?.max || ""}
                onChange={(e: any) => {
                  const value = e.currentTarget.value || "";
                  setState({
                    filter: {
                      ...filter,
                      price: { ...filter.price, max: parseInt(value) },
                    },
                  });
                }}
                maxLength={255}
                placeholder="Price"
              />
            </label>
            <label className="col s12 m12 l3">
              Categories
              <Autocomplete
                options={[]}
                multiple
                id="tags-filled"
                freeSolo
                value={categories}
                onChange={(e: any, newValue: string[]) => {
                  if (newValue.length > -1) {
                    setCategories(newValue);
                    setState({ filter: { ...filter, categories: newValue } });
                  }
                }}
                renderTags={(v: readonly string[], getTagProps: any) =>
                  v.map((option: string, i: number) => (
                    <Chip key={i} variant="outlined" label={option} {...getTagProps({ i })} />
                  ))
                }
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    variant="standard"
                    name="categories"
                    color="primary"
                    label={resource.categories}
                    placeholder={resource.categories}
                  />
                )}
              />
            </label>
            <label className="col s12 m4 l3">
              Brand
              <Autocomplete
                options={[]}
                multiple
                id="tags-filled"
                freeSolo
                value={brands}
                onChange={(e: any, newValue: string[]) => {
                  if (newValue.length > -1) {
                    setBrands(newValue);
                    setState({ filter: { ...filter, brand: newValue } });
                  }
                }}
                renderTags={(v: readonly string[], getTagProps: any) =>
                  v.map((option: string, i: number) => (
                    <Chip key={i} variant="outlined" label={option} {...getTagProps({ i })} />
                  ))
                }
                renderInput={(params: any) => (
                  <TextField {...params} variant="standard" name="brands" color="primary" />
                )}
              />
            </label>
          </section>
        </form>
        <SortItem doSearch={doSearch} />
        {/* Items Output */}
        <form className="list-result">
          {component.view === "table" && (
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>{resource.sequence}</th>
                    <th data-field="id">
                      <button type="button" id="sortId" onClick={sort}>
                        Id
                      </button>
                    </th>
                    <th data-field="title">
                      <button type="button" id="sortTitle" onClick={sort}>
                        {resource.person_title}
                      </button>
                    </th>
                    <th data-field="status">
                      <button type="button" id="sortStatus" onClick={sort}>
                        {resource.status}
                      </button>
                    </th>
                    <th data-field="description">
                      <button type="button" id="sortDescription" onClick={sort}>
                        {resource.description}
                      </button>
                    </th>
                    <th data-field="categories">
                      <button type="button" id="sortCategories" onClick={sort}>
                        Categories
                      </button>
                    </th>
                    <th data-field="brand">
                      <button type="button" id="sortBrand" onClick={sort}>
                        Brand
                      </button>
                    </th>
                    <th data-field="price">
                      <button type="button" id="sortPrice" onClick={sort}>
                        Price
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {list &&
                    list.length > 0 &&
                    list.map((item, i) => {
                      return (
                        <tr key={i} onClick={(e: any) => edit(e, item.id)}>
                          <td className="text-right">{(item as any).sequenceNo}</td>
                          <td>{item.id}</td>
                          <td>{item.title}</td>
                          <td>{item.status}</td>
                          <td>{item.description}</td>
                          <td>{item.categories}</td>
                          <td>{item.brand}</td>
                          <td>{item.price}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
          {component.view !== "table" && (
            <ul className="row list-view">
              {list &&
                list.length > 0 &&
                list.map((item, i) => {
                  return (
                    <li key={i} className="col s12 m6 l3 xl3 products" >
                      {isShop ? <div className="card-product">
                        <div className="banner-save"><SaveItem idItem={item.id} /></div>
                        <div className="product-image">
                          <img src={item.imageURL} alt={item.title} />
                        </div>
                        <div className="product-info">
                          <h3>{item.title}</h3>
                          {renderReviewStar()}
                          {/* <p>{item.description}</p> */}
                          {/* <Chip label={item.brand} size="small" /> */}

                          <p className="product-price">{formatter.format(item.price)}</p>
                          <div className="brand">{item.brand}</div>
                          <div className="categories">
                            {item.categories &&
                              item.categories.map((c: any, i: number) => {
                                return <div className="cate" key={i}>{c}</div>
                              })}
                          </div>
                        </div>
                      </div>
                        : <section>
                          <div onClick={(e: any) => edit(e, item.id)}>
                            <h3>
                              <Link to={`/${item.id}`}>{item.title}</Link>
                            </h3>
                            <p>{item.description}</p>
                            <Chip label={item.brand} size="small" />
                            <p>{item.price}</p>
                            {item.categories &&
                              item.categories.map((c: any, i: number) => {
                                return <Chip key={i} label={c} size="small" />;
                              })}
                          </div>
                          <SaveItem idItem={item.id} />
                        </section>}
                    </li>
                  );
                })}
            </ul>
          )}
        </form>
      </div>
    </div >
  );
};
