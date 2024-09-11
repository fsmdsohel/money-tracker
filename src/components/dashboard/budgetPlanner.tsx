import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import DisplayGoal from "./displayGoal";

export type Goal = {
  name: string;
  targetAmount: number;
  monthlySavings: number;
  monthsToSave: number;
  savedSoFar: number;
  startDate: { month: number; year: number };
  finishDate?: { month: number; year: number };
  id: number;
};

export default function BudgetPlanner() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savingsOption, setSavingsOption] = useState("monthly"); // 'monthly' or 'time'
  const [newGoal, setNewGoal] = useState<{
    name: string;
    targetAmount: string;
    monthlySavings: string;
    monthsToSave: string;
    startMonth: string;
    startYear: string;
    id: number;
  }>({
    name: "",
    targetAmount: "",
    monthlySavings: "",
    monthsToSave: "",
    startMonth: "",
    startYear: "",
    id: 0,
  });

  // Get current month and year
  const currentMonth = new Date().getMonth(); // 0-based index (0 for January, 1 for February, etc.)
  const currentYear = new Date().getFullYear();

  // Month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Set default values for months and years
  const months = monthNames.map((name, index) => ({
    value: (index + 1).toString(),
    label: name,
  }));

  const years = Array.from({ length: 20 }, (_, i) => currentYear + i);

  useEffect(() => {
    // Set default start month and year
    setNewGoal((prev) => ({
      ...prev,
      startMonth: (currentMonth + 1).toString(), // months are 1-based in the UI
      startYear: currentYear.toString(),
    }));
  }, [currentMonth, currentYear]);

  const addGoal = () => {
    const targetAmount = Number(newGoal.targetAmount);
    const monthlySavings = Number(newGoal.monthlySavings);
    const monthsToSave = Number(newGoal.monthsToSave);
    const startMonth = Number(newGoal.startMonth);
    const startYear = Number(newGoal.startYear);

    if (
      targetAmount &&
      (monthlySavings || newGoal.monthsToSave) &&
      newGoal.name.trim() &&
      startMonth &&
      startYear
    ) {
      const finishDate = calculateFinishDate(
        startMonth,
        startYear,
        monthsToSave,
        monthlySavings,
        targetAmount
      );

      const nGoal: Goal = {
        name: newGoal.name,
        targetAmount,
        monthlySavings,
        monthsToSave,
        savedSoFar: 0,
        startDate: { month: startMonth, year: startYear },
        finishDate,
        id: Date.now(),
      };
      setGoals([...goals, nGoal]);
      setNewGoal({
        name: "",
        targetAmount: "",
        monthlySavings: "",
        monthsToSave: "",
        startMonth: (currentMonth + 1).toString(), // months are 1-based in the UI
        startYear: currentYear.toString(),
        id: 0,
      });
      setIsModalOpen(false);
    }
  };

  const calculateFinishDate = (
    startMonth: number,
    startYear: number,
    monthsToSave: number,
    monthlySavings: number,
    targetAmount: number
  ) => {
    if (monthsToSave > 0) {
      const totalMonths = startMonth + monthsToSave - 1;
      const finishYear = startYear + Math.floor(totalMonths / 12);
      const finishMonth = (totalMonths % 12) + 1;

      return { month: finishMonth, year: finishYear };
    } else if (monthlySavings > 0) {
      const totalMonths = Math.ceil(targetAmount / monthlySavings);
      const finishYear = startYear + Math.floor(totalMonths / 12);
      const finishMonth = (totalMonths % 12) + 1;

      return { month: finishMonth, year: finishYear };
    }
    return undefined;
  };

  const updateSavings = (goalId: number, amountToAdd: number) => {
    if (!amountToAdd) return;
    setGoals(
      goals.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              savedSoFar: goal.savedSoFar + amountToAdd,
            }
          : goal
      )
    );
  };

  const calculateTimeRemaining = (goal: Goal) => {
    const remainingAmount = goal.targetAmount - goal.savedSoFar;
    if (remainingAmount <= 0) {
      return "Goal Achieved!";
    } else if (goal.monthlySavings > 0) {
      const monthsNeeded = Math.ceil(remainingAmount / goal.monthlySavings);
      return `${monthsNeeded} months left`;
    } else if (goal.monthsToSave > 0) {
      const monthlySavings = goal.targetAmount / goal.monthsToSave;
      const actualMonthlySavings = goal.savedSoFar / goal.monthsToSave;
      if (actualMonthlySavings < monthlySavings) {
        const additionalMonths = Math.ceil(
          (goal.targetAmount - goal.savedSoFar) / monthlySavings
        );
        return `${additionalMonths} more months needed`;
      }
      return `${Math.ceil(
        (goal.targetAmount - goal.savedSoFar) / monthlySavings
      )} months left`;
    } else {
      return "Invalid savings plan";
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Budget Planner</h1>

      <Button onClick={() => setIsModalOpen(true)} className="mb-6">
        Add New Goal
      </Button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Add New Goal</h2>

            <div className="mb-4">
              <Label htmlFor="goal-name">Goal Name</Label>
              <Input
                id="goal-name"
                type="text"
                value={newGoal.name}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, name: e.target.value })
                }
                placeholder="e.g. Buy a Solar System"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="target-amount">Total Amount to Save</Label>
              <Input
                id="target-amount"
                type="number"
                value={newGoal.targetAmount}
                onChange={(e) =>
                  setNewGoal({
                    ...newGoal,
                    targetAmount: e.target.value,
                  })
                }
                placeholder="e.g. 10000"
              />
            </div>

            <div className="mb-4">
              <Label>Select Savings Type</Label>
              <Select
                onValueChange={(value) => {
                  setSavingsOption(value);
                  setNewGoal((prev) => ({
                    ...prev,
                    monthlySavings:
                      value === "monthly" ? prev.monthlySavings : "",
                    monthsToSave: value === "time" ? prev.monthsToSave : "",
                  }));
                }}
                defaultValue={savingsOption}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select savings type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly Savings</SelectItem>
                  <SelectItem value="time">Time Period</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {savingsOption === "monthly" ? (
              <>
                <div className="mb-4">
                  <Label htmlFor="monthly-savings">Monthly Savings Goal</Label>
                  <Input
                    id="monthly-savings"
                    type="number"
                    value={newGoal.monthlySavings}
                    onChange={(e) =>
                      setNewGoal({
                        ...newGoal,
                        monthlySavings: e.target.value,
                      })
                    }
                    placeholder="e.g. 500"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <Label htmlFor="months-to-save">
                    Time Period (in months)
                  </Label>
                  <Input
                    id="months-to-save"
                    type="number"
                    value={newGoal.monthsToSave}
                    onChange={(e) =>
                      setNewGoal({
                        ...newGoal,
                        monthsToSave: e.target.value,
                      })
                    }
                    placeholder="e.g. 12"
                  />
                </div>
              </>
            )}

            <div className="mb-4">
              <Label htmlFor="start-month">Start Month</Label>
              <Select
                onValueChange={(value) =>
                  setNewGoal({
                    ...newGoal,
                    startMonth: value,
                  })
                }
                value={newGoal.startMonth}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4">
              <Label htmlFor="start-year">Start Year</Label>
              <Select
                onValueChange={(value) =>
                  setNewGoal({
                    ...newGoal,
                    startYear: value,
                  })
                }
                value={newGoal.startYear}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4">
              <Button onClick={addGoal}>Add Goal</Button>
              <Button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="ml-2"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Display Goals */}
      <div className="space-y-4">
        {goals.map((goal) => (
          <DisplayGoal
            key={goal.id}
            goal={goal}
            monthNames={monthNames}
            updateSavings={updateSavings}
            calculateTimeRemaining={calculateTimeRemaining}
          />
        ))}
      </div>
    </div>
  );
}
