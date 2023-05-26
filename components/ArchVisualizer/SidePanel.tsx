import { DragEvent } from "react";

export const SidePanel = () => {
  const onDragStart = (
    event: DragEvent<HTMLDivElement>,
    node: "input" | "output",
    label: string
  ) => {
    event.dataTransfer.setData("application/reactflow", node);
    event.dataTransfer.setData("application/label", label);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="absolute top-2 left-2 flex gap-3">
      <div
        className="text-center rounded  px-4 py-2 bg-indigo-600 text-white font-semibold shadow-xl"
        onDragStart={(event) => onDragStart(event, "input", "Lambda")}
        draggable
      >
        Lambda
      </div>
      <div
        className="text-center rounded  px-4 py-2 bg-indigo-600 text-white font-semibold shadow-xl"
        onDragStart={(event) => onDragStart(event, "output", "DynamoDB")}
        draggable
      >
        DynamoDB
      </div>
    </div>
  );
};
