import { Box, Button, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import Ternary from "src/components/ternary";
import Translate from "src/components/translate";
import { Currency } from "src/components/with-prefix";

const CardBody = ({ category_name, product_prices, is_package }) => {
  return (
    <Box>
      
        <Typography
          variant="subtitle2"
          sx={{ mb: 1, mt:1.5,  display: "block", color: "text.secondary", fontWeight:"300", fontSize:"14px" }}
        >
          <Translate>products.title.category_name</Translate> : {category_name}
        </Typography>

        <Box
          sx={{
            mt: { xs: 1, sm: 0 },
          }}
        >
          {product_prices.map((price, i) => (
            <Button
              key={i}
              size="small"
              color="inherit"
              variant="outlined"
              sx={{ mr: 1, mt: 1 }}
            >
              <Currency>{price.price}</Currency>
              <Ternary
                when={is_package === 0}
                then={`(${price.validity} month)`}
              />
            </Button>
          ))}
        </Box>
      
    </Box>
  );
};

CardBody.propTypes = {
  category_name: PropTypes.string.isRequired,
  product_prices: PropTypes.array.isRequired,
};

export default CardBody;
