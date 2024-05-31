import { useEffect, useState } from "react";
import axiosInstance from "src/utils/axios";

const useFields = () => {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get("api/registration-settings");
        setFields(data?.data || []);
        // setFields(data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return fields;
};

export default useFields;
