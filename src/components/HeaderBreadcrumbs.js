import isString from "lodash/isString";
import PropTypes from "prop-types";
// @mui
import { Box, Link, Typography } from "@mui/material";
//
import Breadcrumbs from "./Breadcrumbs";
import Translate from "./translate";

// ----------------------------------------------------------------------

HeaderBreadcrumbs.propTypes = {
  links: PropTypes.array,
  action: PropTypes.node,
  heading: PropTypes.string.isRequired,
  moreLink: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  sx: PropTypes.object,
};

export default function HeaderBreadcrumbs({
  links,
  action,
  heading,
  moreLink = "" || [],
  sx,
  ...other
}) {
  return (
    <Box sx={{ mb:3, ...sx }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            <Translate>{heading}</Translate>
          </Typography>
          <Breadcrumbs links={links} {...other} />
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
      </Box>

      <Box sx={{ mt: 2 }}>
        {isString(moreLink) ? (
          <Link href={moreLink} target="_blank" rel="noopener" variant="body2">
            {moreLink}
          </Link>
        ) : (
          moreLink.map((href) => (
            <Link
              noWrap
              key={href}
              href={href}
              variant="body2"
              target="_blank"
              rel="noopener"
              sx={{ display: "table" }}
            >
              {href}
            </Link>
          ))
        )}
      </Box>
    </Box>
  );
}
