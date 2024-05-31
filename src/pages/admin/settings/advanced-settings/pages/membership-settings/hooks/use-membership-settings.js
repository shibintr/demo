import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import axiosInstance from "src/utils/axios";

const serializeData = (list = []) =>
  list?.map(
    ({ id, type, input_label, input_type, status, required, unique }) => {
      return {
        pk: id,
        input_label,
        input_type,
        type,
        status: status || 0,
        required: required || 0,
        unique: unique || 0,
      };
    }
  );

const useMembershipSettings = () => {
  const methods = useForm({ defaultValues: { mandatory: [], custom: [] } });
  const { enqueueSnackbar } = useSnackbar();
  const mandatoryArray = useFieldArray({
    control: methods.control,
    name: "mandatory",
  });

  const customArray = useFieldArray({
    control: methods.control,
    name: "custom",
  });
  const [dataStatus, setDataStatus] = useState({
    loading: false,
    error: false,
  });
  const fetchMembershipPackages = async () => {
    setDataStatus((prevState) => ({ ...prevState, loading: true }));
    try {
      const { data } = await axiosInstance.get(
        "api/admin/registration-settings"
      );

      const serializedData = serializeData(data?.data);

      customArray.replace(
        serializedData?.filter(({ type }) => type === "custom")
      );
      mandatoryArray.replace(
        serializedData?.filter(({ type }) => type !== "custom")
      );
      setDataStatus(() => ({
        loading: false,
        error: false,
      }));
    } catch (err) {
      setDataStatus(() => ({
        loading: false,
        error: true,
      }));
      console.log(err);
    }
  };
  useEffect(() => {
    fetchMembershipPackages();
  }, []);

  const update = async (index, type, inputData) => {
    const reqData = new FormData();
    Object.entries({ ...inputData, _method: "PUT" }).forEach(([k, v]) =>
      reqData.append(k, v)
    );

    try {
      const { data } = await axiosInstance.post(
        `api/admin/registration-settings/${inputData.pk}`,
        reqData
      );
      if (type === "mandatory") {
        mandatoryArray.update(index, inputData);
      } else {
        customArray.update(index, inputData);
      }
      enqueueSnackbar(data.message);
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    }
  };

  return {
    dataStatus,
    methods,
    mandatoryArray,
    customArray,
    update: update,
    fetchMembershipPackages,
  };
};

export default useMembershipSettings;
