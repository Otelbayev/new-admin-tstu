import { Collapse } from "antd";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const { Panel } = Collapse;

const TreeNode = ({ node }) => {
  const { i18n } = useTranslation();

  const handleNaviage = (node) => {
    return `/${i18n.language}/department/${node.id}`;
  };

  if (node.children.length > 0) {
    return (
      <Collapse
        className="my-1"
        expandIconPosition="right"
        defaultActiveKey={["1"]}
      >
        <Panel header={node.title} key={node.id}>
          <div style={{ marginLeft: 20 }}>
            {node.children.map((child) => (
              <TreeNode key={child.id} node={child} />
            ))}
          </div>
        </Panel>
      </Collapse>
    );
  }

  return (
    <NavLink
      to={handleNaviage(node)}
      className="border d-block p-3 my-1 display-5 rounded"
    >
      {node.title}
    </NavLink>
  );
};

export default TreeNode;
