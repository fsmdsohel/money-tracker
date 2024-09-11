import React, { useState } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Goal } from "./budgetPlanner";

interface DisplayGoalProps {
  goal: Goal;
  monthNames: string[];
  updateSavings: (id: number, amount: number) => void;
  calculateTimeRemaining: (goal: Goal) => string;
}

const DisplayGoal = ({
  goal,
  monthNames,
  updateSavings,
  calculateTimeRemaining,
}: DisplayGoalProps) => {
  const [tempSavings, setTempSavings] = useState<number | string>("");
  return (
    <Card key={goal.id} className="p-4">
      <h2 className="text-xl font-semibold">{goal.name}</h2>
      <p>Total Amount: {goal.targetAmount} BDT</p>
      <p>Saved So Far: {goal.savedSoFar} BDT</p>
      {goal.monthlySavings > 0 && (
        <p>Plan to save every month: {goal.monthlySavings} BDT</p>
      )}
      {goal.monthsToSave > 0 && (
        <p>
          Need to save every month:{" "}
          {((goal.targetAmount - goal.savedSoFar) / goal.monthsToSave).toFixed(
            2
          )}{" "}
          BDT
        </p>
      )}
      <p>
        Start Date: {monthNames[goal.startDate.month - 1]}/{goal.startDate.year}
      </p>
      <p>
        Finish Date:{" "}
        {goal.finishDate
          ? `${monthNames[goal.finishDate.month - 1]}/${goal.finishDate.year}`
          : "Not Calculated"}
      </p>
      <p>Time Remaining: {calculateTimeRemaining(goal)}</p>

      <div className="mt-4 flex space-x-2">
        <Input
          type="number"
          placeholder="Amount to Add"
          value={tempSavings}
          onChange={(e) => setTempSavings(e.target.value)}
          className="flex-1"
        />
        <Button
          onClick={() => {
            setTempSavings("");
            updateSavings(goal.id, Number(tempSavings));
          }}
        >
          Add Savings
        </Button>
      </div>
    </Card>
  );
};

export default DisplayGoal;
