import { useState } from "react";

const useAddUser = () => {
  const [openAdd, setOpenAdd] = useState({ status: false, data: null });

  const handleOpenAdd = (placement_id, leg) =>
    setOpenAdd({ status: true, placement_id, leg });

  const handleCloseAdd = () => setOpenAdd({ status: false, data: null });

  return { openAdd, handleCloseAdd, handleOpenAdd };
};

export default useAddUser;
