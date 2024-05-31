import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import { useMemo, useState } from "react";
import axiosInstance from "src/utils/axios";
import Actions from "./components/actions";
import Add from "./components/add";
import ConfigSettings from "./components/config";
import Custom from "./components/custom";
import Delete from "./components/delete";
import Edit from "./components/edit";
import Mandatory from "./components/mandatory";
import useMembershipSettings from "./hooks/use-membership-settings";

const MembershipSettings = () => {
  const {
    dataStatus,
    methods,
    mandatoryArray,
    customArray,
    update,
    fetchMembershipPackages,
  } = useMembershipSettings();

  const { getValues } = methods;

  const handleChange =
    (type = "mandatory", index) =>
    async (e) => {
      const { name, checked } = e.target;
      const temp = getValues(`${type}.${index}`);
      temp[name] = Number(checked);
      update(index, type, temp);
    };

  const [openAction, setOpenAction] = useState({ anchorEl: null, id: null });
  const handleActionOpen = (id) => (e) =>
    setOpenAction({ anchorEl: e.currentTarget, id });
  const handleActionClose = () => setOpenAction({ anchorEl: null, id: null });

  const [editId, setEditId] = useState(null);
  const handleOpenEdit = () => {
    setEditId(openAction.id);
    handleActionClose();
  };
  const handleCloseEdit = () => {
    setEditId(null);
  };

  const [openAdd, setOpenAdd] = useState(false);

  const handleOpenAdd = () => {
    setOpenAdd(true);
    handleActionClose();
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const [deleteId, setDeleteId] = useState(null);
  const handleOpenDelete = () => {
    setDeleteId(openAction.id);
    handleActionClose();
  };

  const handleCloseDelete = () => {
    setDeleteId(null);
  };

  const [custom, mandatory] = useMemo(() => {
    if (mandatoryArray.fields?.length > 0) {
      return [
        mandatoryArray.fields?.filter(({ type }) => type === "custom"),
        mandatoryArray.fields?.filter(({ type }) => type !== "custom"),
      ];
    }

    return [[], []];
  }, [mandatoryArray.fields]);

  const { enqueueSnackbar } = useSnackbar();

  const move =
    (type = "custom") =>
    async (dragIndex, dropIndex) => {
      const temp = type === "custom" ? [...custom] : [...mandatory];
      const dragged = temp[dragIndex];
      temp[dragIndex] = temp[dropIndex];
      temp[dropIndex] = dragged;
      const newSortOrder = temp.map(({ pk }, i) => ({ id: pk, sort_order: i }));

      try {
        const reqData = new FormData();
        reqData.append("_method", "PUT");
        reqData.append("sort_order", JSON.stringify(newSortOrder));
        const { data } = await axiosInstance.post(
          "api/admin/membership/sort-order",
          reqData
        );

        if (data.status) {
          fetchMembershipPackages();
          enqueueSnackbar(data.message);
        }
      } catch (err) {
        enqueueSnackbar(err.message, { variant: "error" });
        console.log(err);
      }
    };

  return (
    <Box sx={{ marginTop: 3 }}>
      <ConfigSettings reload={fetchMembershipPackages} />
      <Mandatory
        move={move("mandatory")}
        dataStatus={dataStatus}
        handleChange={handleChange}
        fields={mandatoryArray.fields}
      />

      <Custom
        move={move("custom")}
        dataStatus={dataStatus}
        handleChange={handleChange}
        openAction={handleActionOpen}
        fields={customArray.fields}
        handleOpenAdd={handleOpenAdd}
      />
      <Actions
        onClose={handleActionClose}
        open={openAction.anchorEl}
        openEdit={handleOpenEdit}
        handleOpenDelete={handleOpenDelete}
      />

      <Edit
        id={editId}
        onClose={handleCloseEdit}
        reload={fetchMembershipPackages}
      />

      <Add
        open={openAdd}
        onClose={handleCloseAdd}
        reload={fetchMembershipPackages}
      />

      <Delete
        id={deleteId}
        onClose={handleCloseDelete}
        reload={fetchMembershipPackages}
      />
    </Box>
  );
};

export default MembershipSettings;
