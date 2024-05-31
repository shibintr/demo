import { Tree, TreeNode } from "react-organizational-chart";
import Account from "./components/account";
import AddNew from "./components/addNew";

const chooseComponent = (parent) =>
  parent
    ? TreeNode
    : (props) => (
        <Tree
          {...props}
          lineWidth="2px"
          lineColor="#bbc"
          lineBorderRadius="12px"
        >
          {props.children}
        </Tree>
      );

const Node = ({ node, parent, onClick, openAdd }) => {
  const T = chooseComponent(parent);

  const {
    children,
    className,
    id,
    name,
    leg,
    profile_pic,
    rank_name,
    pv,
    join_date,
  } = node;
  const label =
    className === "vacant" ? (
      <AddNew
        onClick={() => {
          const { id } = parent;
          openAdd(id, leg);
        }}
      />
    ) : (
      <Account
        profile={profile_pic}
        join_date={join_date}
        rank_name={rank_name}
        pv={pv}
        name={name}
        onClick={() => {
          if (id) onClick(node);
        }}
      />
    );

  return (
    <T label={label}>
      {children?.map((account, i) => {
        return (
          <Node
            key={i}
            onClick={onClick}
            node={account}
            parent={node}
            openAdd={openAdd}
          />
        );
      })}
    </T>
  );
};

export default Node;
