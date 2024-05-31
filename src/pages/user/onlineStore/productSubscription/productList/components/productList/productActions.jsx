import HideForPackage from "../../../../../../../components/package-or-product/hide-for-package";
import useBuyNow from "../../../details/hooks/useBuyNow";
import useAddToCart from "../../../hooks/useAddToCart";
import useSubscriptions from "../../hooks/useSubscriptions";
import ActionButtons from "./actionButton";
import Subscriptions from "./subscriptions";

const ProductActions = ({ product }) => {
  const { name, product_prices, id, is_package } = product;
  const { price, onChange } = useSubscriptions(product_prices);
  const addToCart = useAddToCart();
  const buyNow = useBuyNow();
  const payload = { price: price.price, product_id: id, price_id: price.id };
  const onAddToCart = () => {
    addToCart(payload);
  };

  const onBuyNow = () => {
    buyNow(payload);
  };

  return (
    <>
      <Subscriptions
        price={price.price}
        onChange={onChange}
        prices={product_prices}
        is_package={is_package}
        onBuyNow={onBuyNow}
      />
      <HideForPackage>
        <ActionButtons
          name={name}
          id={id}
          addToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />
      </HideForPackage>
    </>
  );
};

export default ProductActions;
