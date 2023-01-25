import {
  ResponsiveNetwork,
  InputNode,
  InputLink,
  ComputedNode,
  ComputedLink,
} from "@nivo/network";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export interface Node extends ComputedNode<InputNode> {
  height: number;
}

export interface Link extends InputLink {
  source: string;
  target: string;
  distance: number;
}

type IVisualization = {
  data: {
    nodes: Node[];
    links: Link[];
  };
};

const Visualization: React.FC<IVisualization> = ({ data }) => (
  <ResponsiveNetwork
    data={data}
    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    linkDistance={function (e) {
      return e.distance;
    }}
    centeringStrength={0.3}
    repulsivity={6}
    nodeSize={function (n) {
      return n.size;
    }}
    activeNodeSize={function (n) {
      return 1.5 * n.size;
    }}
    nodeColor={function (e) {
      return e.color;
    }}
    nodeBorderWidth={1}
    nodeBorderColor={{
      from: "color",
      modifiers: [["darker", 0.8]],
    }}
    linkThickness={function (n) {
      return 2 + 2 * n.target.data.height;
    }}
    linkBlendMode="multiply"
    motionConfig="wobbly"
  />
);

export default Visualization;
