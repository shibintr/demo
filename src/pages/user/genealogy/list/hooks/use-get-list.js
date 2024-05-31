import { useEffect } from "react";
import useDataHandler from "src/components/data-handler/hooks/use-data-handler";
import usePagination from "src/components/pagination/usePagination";
import axiosInstance from "src/utils/axios";

const useGetList = () => {
  const [state, actions] = useDataHandler();
  const { count, onChange, page, seed } = usePagination();

  const fetchData = async (page = 1) => {
    actions.loading();
    try {
      const { data } = await axiosInstance.get("api/user/genealogy-list", {
        params: {
          page,
        },
      });
      const { status, data: list } = data;
      if (status) {
        const { last_page, from, data: treeList } = list;
        seed(last_page, from);
        actions.success(treeList);
      } else {
        actions.success([]);
      }
    } catch (err) {
      console.log(err);
      actions.error();
    }
  };
  useEffect(() => {
    fetchData(page);
  }, [page]);

  return { state, count, onChange, page };
};

export default useGetList;
