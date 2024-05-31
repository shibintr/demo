import { Card } from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";

import useIsPackage from "src/components/package-or-product/hooks/use-is-package";
import { PATH_DASHBOARD } from "src/routes/paths";
import ProductForm from "../product-form";
import useEditProduct from "./hooks/use-edit-product";

const ProductEdit = () => {
  const { methods, onSubmit } = useEditProduct();
  const isPackage = useIsPackage();

  const title = isPackage
    ? "products.title.package_edit"
    : "products.title.product_edit";

  const subheading = isPackage ? "global.package" : "global.product_other";

  return (
    <div>
      <Page title={title}>
        <HeaderBreadcrumbs
          heading={title}
          links={[
            { name: "global.dashboard", href: PATH_DASHBOARD.root },
            {
              name: subheading,
              href: isPackage
                ? PATH_DASHBOARD.store.packages
                : PATH_DASHBOARD.store.products,
            },
            { name: title },
          ]}
        />
        <Card sx={{ p: 3 }}>
          <ProductForm methods={methods} onSubmit={onSubmit} />
        </Card>
      </Page>
    </div>
  );
};

export default ProductEdit;
