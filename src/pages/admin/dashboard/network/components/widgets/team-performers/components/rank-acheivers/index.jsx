import Scrollbar from "src/components/Scrollbar";
import DataHandlerList from "src/components/data-handler/list";
import Map from "src/components/map";
import useGetTeamPerformance from "../../hooks/use-get-team-performance";
import PerformersCard from "../performers-card";
import PerformersCardItem from "../performers-card-item";

const RankAchievers = () => {
  const state = useGetTeamPerformance("api/admin/dashboard/top-rank-achievers");
  const { data, ...dataProps } = state;

  return (
    <PerformersCard title="Rank Achievers" subTitle="Current Rank">
      <DataHandlerList dataProps={dataProps}>
        <Scrollbar
          sx={{
            height: "300px",
          }}
        >
          <Map
            list={data}
            render={({ email, username, rank, user_profile }) => {
              return (
                <PerformersCardItem
                  email={email}
                  uname={username}
                  img={user_profile?.profile_image}
                >
                  {rank?.rank_name}
                </PerformersCardItem>
              );
            }}
          />
        </Scrollbar>
      </DataHandlerList>
    </PerformersCard>
  );
};

export default RankAchievers;
