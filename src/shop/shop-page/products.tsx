import { useLocation } from "react-router-dom";


export const Products = () => {
  const shopPath = useLocation();

  if (shopPath.pathname.includes("products")) {
    return (
      <div>Products</div>
    )
  }
  return null;

}