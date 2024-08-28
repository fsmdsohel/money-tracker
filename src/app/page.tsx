"use client";

import { Bar, BarChart } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import Link from "next/link";
import MainTable from "@/components/dashboard/mainTable";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function Component() {
  return (
    <div className="max-w-[1260px] w-[100%] mx-auto p-3">
      <Link href="/dashboard">Dashboard</Link>
      <div className="w-[600px] max-w-[100%] overflow-x-auto overflow">
        <MainTable />
      </div>
    </div>
  );
}
