import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import Translate from "src/components/translate";

const PerformersCard = ({ title, subTitle, children }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
      }}
    >
      <CardHeader title={
        <Typography variant="subtitle2" sx={{mt:"-5px"}}>
        <Translate>{title}</Translate>
      </Typography>
      }  />
    

      <CardContent>
        <Stack mb={2} direction="row" justifyContent="space-between">
          <Typography variant="subtitle3" sx={{fontWeight:"300", fontSize:"14px"}}>
            User
          </Typography>
          <Typography variant="subtitle3" sx={{fontWeight:"300", fontSize:"14px"}}>
            {subTitle}
          </Typography>
        </Stack>
        <Stack spacing={1.2}>{children}</Stack>
      </CardContent>
    </Card>
  );
};

export default PerformersCard;
