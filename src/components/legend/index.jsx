import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import LegendItem from "./legendItem";
import Styles from "./style.module.css";

import axiosInstance from "src/utils/axios";
import transformData from "src/utils/transformData";

const fetchUserData = async (username) => {
  const reqData = new FormData();
  reqData.append("username", username);
  try {
    const { status, data } = await (
      await axiosInstance.post(`api/user-info`, reqData)
    ).data;

    if (status) {
      return transformData(data);
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};
const Legend = ({ username, legends }) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchData = async (uname) => {
      const data = await fetchUserData(uname);
      if (data) {
        setUserInfo(data);
      } else {
        setUserInfo({});
      }
    };

    if (username) {
      fetchData(username);
    }
  }, [username]);

  return (
    <Grid item xs={12} md={2} className={Styles.rightCard}>
      {legends.map(({ icon, title, key }, i) => {
        return (
          <LegendItem
            key={i}
            icon={icon}
            title={translate(title)}
            content={userInfo[key]}
          />
        );
      })}
    </Grid>
  );
};

export default Legend;
