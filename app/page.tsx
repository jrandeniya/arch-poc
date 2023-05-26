"use client";

import { ArchPlan, ArchVisualizer } from "@/components";

export default function Home() {
  return (
    <main className="grid grid-cols-3 gap-3 min-h-screen bg-white p-6">
      <div className="relative bg-slate-200 col-span-2 rounded-lg shadow-lg p-6">
        <ArchVisualizer />
      </div>
      <div className="bg-slate-100 rounded-lg shadow-lg p-6">
        <p className="text-xs my-1 text-slate-600">
          <strong>Resources</strong> are provider entities which can contain
          configuration, rules etc.
        </p>
        <p className="text-xs my-1 text-slate-600">
          <strong>Links</strong> can contain relationship context, variables,
          metadata etc.
        </p>
        <div className=" bg-slate-300 my-4 rounded h-[1px]"></div>
        <ArchPlan />
      </div>
    </main>
  );
}
