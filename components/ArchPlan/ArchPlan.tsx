import { useFlowStore } from "@/store";
import { useMemo } from "react";
import { Edge, Node } from "reactflow";
import { shallow } from "zustand/shallow";

const flatten = (nodes: Array<Node>, edges: Array<Edge>) => {
  const resources = nodes.map((n) => ({ id: n.id, type: n.data.resource }));

  const links = edges.map((n) => ({
    source: n.source,
    target: n.target,
  }));

  return { resources, links };
};

export const ArchPlan = () => {
  const { nodes, edges } = useFlowStore(
    (state) => ({
      nodes: state.nodes,
      edges: state.edges,
    }),
    shallow
  );

  const flat = useMemo(() => flatten(nodes, edges), [nodes, edges]);

  return <pre className="text-xs">{JSON.stringify(flat, null, 2)}</pre>;
};
