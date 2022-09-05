import * as csv from "csvtojson";
import { currency, locale } from "locale-service";
import { phonecodes } from "phonecodes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { alert, confirm } from "ui-alert";
import { loading } from "ui-loading";
import { resources as uiresources, UIService } from "ui-plus";
import { toast } from "ui-toast";
import { storage } from "uione";
import { resources as vresources } from "validation-core";
import { DefaultCsvService, resources } from "web-clients";
import { config } from "./config";
import AboutPage from "./core/about";
import HomePage from "./core/home";
import LayoutComponent from "./core/layout";
import { resources as locales } from "./core/resources";

import { RoleAssignmentForm } from "./admin/role-assignment-form";
import { RoleForm } from "./admin/role-form";
import { RolesForm } from "./admin/roles-form";
import { UserForm } from "./admin/user-form";
import { UsersForm } from "./admin/users-form";
import { ChangePasswordForm } from "./authentication/change-password-form";
import { ForgotPasswordForm } from "./authentication/forgot-password-form";
import { ResetPasswordForm } from "./authentication/reset-password-form";
import { SigninForm } from "./authentication/signin-form";
import { SignupForm } from "./authentication/signup-form";

import { CategoriesForm } from "./backoffice/categories-form";
import { CategoryForm } from "./backoffice/category-form";

import { LocationForm } from "./backoffice/location-form";

import { BLocationForm } from "./backoffice-location/location-form";
import { BLocationsForm } from "./backoffice-location/locations-form";

import { ShopPage } from "./shop/shop-page";
import { ShopsPage } from "./shop/shops-page";

import { MyProfileForm } from "./my-profile/my-profile-form";
import { MySettingsForm } from "./my-profile/my-settings-form";
import { UserPage } from "./profile/user-page";
import { UsersPage } from "./profile/users-page";

// import { BCinemasForm } from "./backoffice/cinemas-form";
// import { BCinemaForm } from "./backoffice/cinema-form";


import { ArticlesForm } from "./admin/articles-form";
import { ArticleForm } from "./article/article";
import { Articles } from "./article/articles";
import { MyArticle } from "./my-articles/my-article";
import { MyArticles } from "./my-articles/my-articles";

import { ItemView } from "./items/item-view";
import { ItemsForm } from "./items/items-form";
import { ItemCategoriesForm } from "./my-items/categories-form";
import { ItemCategoryForm } from "./my-items/category-form";
import { MyItemForm } from "./my-items/my-item-form";
import { MyItemsForm } from "./my-items/my-items-form";



// tslint:disable:ordered-imports
import "./App.css";
import "./assets/css/reset.css";
import "./assets/fontawesome/css/font-awesome-min.css";
import "./assets/fonts/material-icon/css/material-icons.css";
// import "./assets/fonts/Roboto/font.css";
import "./assets/css/alert.css";
import "./assets/css/article.css";
import "./assets/css/button.css";
import "./assets/css/checkbox.css";
import "./assets/css/dark.css";
import "./assets/css/date-picker.css";
import "./assets/css/diff.css";
import "./assets/css/form.css";
import "./assets/css/grid.css";
import "./assets/css/layout.css";
import "./assets/css/list-detail.css";
import "./assets/css/list-view.css";
import "./assets/css/loader.css";
import "./assets/css/main.css";
import "./assets/css/modal.css";
import "./assets/css/multi-select.css";
import "./assets/css/profile.css";
import "./assets/css/radio.css";
import "./assets/css/search.css";
import "./assets/css/solid-container.css";
import "./assets/css/table.css";
import "./assets/css/theme.css";
import { MyItem } from "./items/my-item";
import { MyShop } from "./shop/my-shop";

let isInit = false;
export function init() {
  if (isInit) {
    return;
  }
  isInit = true;
  storage.setConfig(config);
  resources.csv = new DefaultCsvService(csv);
  resources.config = {
    list: "list",
  };
  if (storage.home == null || storage.home === undefined) {
    storage.home = "/admin/users";
  }
  storage.home = "/admin/users";
  // storage.token = getToken;
  storage.moment = true;
  storage.setResources(locales);
  storage.setLoadingService(loading);
  storage.setUIService(new UIService());
  storage.currency = currency;
  storage.locale = locale;
  storage.alert = alert;
  storage.confirm = confirm;
  storage.message = toast;

  const resource = storage.resource();
  vresources.phonecodes = phonecodes;
  // uiresources.date = parseDate;
  uiresources.currency = currency;
  uiresources.resource = resource;
}
function App() {
  init();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="home" element={<HomePage />} />
        <Route path="signin" element={<SigninForm />} />
        <Route path="signup" element={<SignupForm />} />
        <Route path="change-password" element={<ChangePasswordForm />} />
        <Route path="reset-password" element={<ResetPasswordForm />} />
        <Route path="forgot-password" element={<ForgotPasswordForm />} />
        <Route path="about">
          <Route index={true} element={<AboutPage />} />
          <Route path=":number" element={<AboutPage />} />
        </Route>
        <Route path="" element={<LayoutComponent />}>
          <Route index={true} element={<AboutPage />} />
          <Route path=":number" element={<AboutPage />} />
          <Route path="my-profile" element={<MyProfileForm />} />
          <Route path="my-profile/settings" element={<MySettingsForm />} />
          <Route path="profile" element={<UsersPage />} />
          <Route path="profile/:id" element={<UserPage />} />
          <Route path="profile/:id/review" element={<UserPage />} />
          <Route path="profile/:id/appreciation" element={<UserPage />} />

          <Route path="admin/users" element={<UsersForm />} />
          <Route path="admin/users/add" element={<UserForm />} />
          <Route path="admin/users/edit/:id" element={<UserForm />} />
          <Route path="admin/roles" element={<RolesForm />} />
          <Route path="admin/roles/add" element={<RoleForm />} />
          <Route path="admin/roles/edit/:id" element={<RoleForm />} />
          <Route path="admin/roles/assign/:id" element={<RoleAssignmentForm />} />

          <Route path="backoffice/categories" element={<CategoriesForm />} />
          <Route path="backoffice/categories/edit/:id" element={<CategoryForm />} />
          <Route path="backoffice/categories/add" element={<CategoryForm />} />

          <Route path="backoffice/locations" element={<BLocationsForm />} />
          <Route path="backoffice/locations/edit/:id" element={<BLocationForm />} />
          <Route path="backoffice/locations/add" element={<BLocationForm />} />

          <Route path="locations" element={<ShopsPage />} />
          {/* wishlist */}
          <Route path="my-location" element={<MyShop />} />
          {/* -------- */}
          <Route path="locations/add" element={<LocationForm />} />
          <Route path="locations/edit/:id" element={<LocationForm />} />
          <Route path="locations/:id" element={<ShopPage />} />
          <Route path="locations/:id/review" element={<ShopPage />} />
          <Route path="locations/:id/photo" element={<ShopPage />} />

          <Route path="backoffice/articles" element={<ArticlesForm />} />

          <Route path="my-articles" element={<MyArticles />} />
          <Route path="my-articles/add" element={<MyArticle />} />
          <Route path="my-articles/edit/:id" element={<MyArticle />} />
          <Route path="articles" element={<Articles />} />
          <Route path="articles/edit/:id" element={<ArticleForm />} />
          
          <Route path="my-items/categories" element={<ItemCategoriesForm />} />
          <Route path="my-item/categories/add" element={<ItemCategoryForm />} />
          <Route path="my-itesm/categories/edit/:id" element={<ItemCategoryForm />} />
          <Route path="my-items" element={<MyItemsForm />} />
          <Route path="my-items/add" element={<MyItemForm />} />
          <Route path="my-items/edit/:id/upload" element={<MyItemForm />} />
          <Route path="my-items/edit/:id" element={<MyItemForm />} />
          <Route path="items" element={<ItemsForm />} />
          <Route path="my-item" element={<MyItem />} />
          <Route path="items/:id" element={<ItemView />} />
        </Route>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
  /*
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
  */
}
export default App;
