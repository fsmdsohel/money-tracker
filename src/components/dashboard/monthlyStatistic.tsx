import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MonthlyStatistic = () => {
  return (
    <Card className="flex flex-col">
      <CardHeader className=" pb-0">
        <CardTitle>Monthly Statistic</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="mt-4">
          Total income: 110000 <br />
          total expenses: 31000 <br />
          extra:{" "}
          <span className="bg-red-400 text-white py-[2px] px-2 rounded-sm">
            -1000
          </span>{" "}
          {/* <br />
          prev debt:{" "}
          <span className="bg-red-400 text-white py-[2px] px-2 rounded-sm">
            -1000
          </span>{" "} */}
          <br />
          prev saved:{" "}
          <span className="bg-green-400 text-white py-[2px] px-2 rounded-sm">
            1000
          </span>
        </div>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
};

export default MonthlyStatistic;
