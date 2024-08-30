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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import ExpenseEdit from "./expenseEdit";
import ExpenseNew from "./expenseNew";

type Data = {
  category: string;
  budget: number;
  expenses: number;
};

const data: Data[] = [
  {
    category: "Groceries",
    budget: 500,
    expenses: 55,
  },
  {
    category: "Utilities",
    budget: 300,
    expenses: 200,
  },
  {
    category: "Rent",
    budget: 1000,
    expenses: 800,
  },
  {
    category: "Insurance",
    budget: 200,
    expenses: 100,
  },
  {
    category: "Transport",
    budget: 200,
    expenses: 150,
  },
  {
    category: "Entertainment",
    budget: 100,
    expenses: 50,
  },
  {
    category: "Miscellaneous",
    budget: 200,
    expenses: 100,
  },
];

function formatToCurrency(value: number) {
  return `৳${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
}

export default function ExpensesTable() {
  const [modalData, setModalData] = useState<Data | null>(null);
  return (
    <Dialog>
      <Table>
        <TableCaption>Overview of your budget and expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Categories</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Expenses</TableHead>
            <TableHead className="text-right">Graph</TableHead>
            <TableHead className="w-[40px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <DialogTrigger asChild key={item.category}>
              <TableRow
                className="cursor-pointer"
                onClick={() => {
                  // console.log("Clicked on row");
                  setModalData(item);
                }}
              >
                <TableCell>{item.category}</TableCell>
                <TableCell>{formatToCurrency(item.budget)}</TableCell>
                <TableCell>
                  <div
                    className={`
                    ${
                      item.expenses > item.budget
                        ? "bg-red-500"
                        : "bg-green-500"
                    } text-white rounded-md px-2 py-1 text-center
                  `}
                  >
                    <span className="text-xs font-medium">
                      {formatToCurrency(item.expenses)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-2">
                  <div className="flex justify-end items-center">
                    <TableGraph data={[item.expenses, item.budget]} />
                  </div>
                </TableCell>
                <TableCell
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <ExpenseEdit data={item} />
                </TableCell>
              </TableRow>
            </DialogTrigger>
          ))}
          <TableRow>
            <TableCell colSpan={4}>
              <ExpenseNew />
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total Budget</TableCell>
            <TableCell className="text-right">
              {formatToCurrency(
                data.reduce((acc, item) => acc + item.budget, 0)
              )}
            </TableCell>
            <TableCell>Total Expenses</TableCell>
            <TableCell className="text-right">
              {formatToCurrency(
                data.reduce((acc, item) => acc + item.expenses, 0)
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {modalData ? `${modalData.category}` : "Add new category"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Label
            </Label>
            <Input
              id="category"
              className="col-span-3"
              placeholder="Name of items ex: (vagitables etc)"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="budget" className="text-right">
              Expense
            </Label>
            <Input
              id="budget"
              className="col-span-3"
              placeholder="Amount of money spent"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => setModalData(null)}>
            {modalData ? "Expense" : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
