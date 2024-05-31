import { useSnackbar } from "notistack";
import axiosInstance from "src/utils/axios";
import useUpdateForm from "./use-update-form";

const useUpdateBank = () => {
  const methods = useUpdateForm();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (inputData) => {
    const reqData = new FormData();
    Object.entries(inputData).forEach(([k, v]) => reqData.append(k, v));
    reqData.append("_method", "PUT");

    try {
      const { data } = await axiosInstance.post("api/bank-details", reqData);
      console.log(data);
      enqueueSnackbar(data.message);
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    }
  };

  return { methods, onSubmit: methods.handleSubmit(onSubmit) };
};

export default useUpdateBank;
