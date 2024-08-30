import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useEffect } from "react";

type Data = {
  category: string;
  amount: number;
};

const data: Data[] = [
  {
    category: "Salary",
    amount: 110000,
  },
];

function formatToCurrency(value: number) {
  return `৳${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
}

export default function IncomeTable() {
  return (
    <Table>
      <TableCaption>Overview of your incomes.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">Categories</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.category}>
            <TableCell>{item.category}</TableCell>
            <TableCell>{formatToCurrency(item.amount)}</TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell colSpan={4}>
            <span className="text-sm text-gray-500">+ New</span>
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total Income</TableCell>
          <TableCell className="text-right">
            {formatToCurrency(data.reduce((acc, item) => acc + item.amount, 0))}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

type TableGraphProps = {
  data: [number, number];
};

const TableGraph = ({ data }: TableGraphProps) => {
  const options = {
    chart: {
      type: "bar",
      height: 18,
      width: 120,
      spacing: [0, 0, 0, 0],
    },
    title: {
      text: "",
      align: "left",
    },
    xAxis: {
      visible: false,
    },
    yAxis: {
      min: 0,
      max: 100,
      title: {
        text: "Percent",
      },
      visible: false,
    },
    tooltip: {
      enabled: false,
    },
    plotOptions: {
      series: {
        stacking: "percent",
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: "Remaining Budget",
        data: [data[1] - data[0] > 0 ? data[1] - data[0] : 0],
        color: "#90ed7d",
      },
      {
        name: "Expenses",
        data: [data[0]],
        color: "#f45b5b",
      },
    ],
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
