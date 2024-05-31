import visitorServer from "src/utils/visitor";

const addVisitor = async (data) => {
  const reqData = new FormData();
  Object.entries(data).forEach(([k, v]) => reqData.append(k, v));
  try {
    const { data, status } = await visitorServer.post("/register", reqData);

    if (status === 200) return { ...data };
  } catch (err) {
    return { err };
  }
};

export default addVisitor;
