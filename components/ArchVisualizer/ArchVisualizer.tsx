import { DragEvent, useCallback, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  ReactFlowInstance,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import { shallow } from "zustand/shallow";

import { useFlowStore } from "@/store";
import { nanoid } from "nanoid";
import { SidePanel } from "./SidePanel";

export const ArchVisualizer = () => {
  const wrapper = useRef<HTMLDivElement | null>(null);

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useFlowStore(
      (state) => ({
        nodes: state.nodes,
        edges: state.edges,
        onNodesChange: state.onNodesChange,
        onEdgesChange: state.onEdgesChange,
        onConnect: state.onConnect,
      }),
      shallow
    );

  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!wrapper.current) return;
      if (!reactFlowInstance) return;

      const bounds = wrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      const label = event.dataTransfer.getData("application/label");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const node = {
        id: nanoid(5),
        type,
        position,
        data: { label, resource: label.toLowerCase() },
      };

      onNodesChange([{ type: "add", item: node }]);
    },
    [reactFlowInstance, onNodesChange]
  );

  return (
    <ReactFlowProvider>
      <div className="relative h-full w-full">
        <div ref={wrapper} className="h-full w-full">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <Controls />
            <Background />
          </ReactFlow>
        </div>
        <SidePanel />
      </div>
    </ReactFlowProvider>
  );
};
