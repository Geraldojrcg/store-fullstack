import { Box, Header, Icon } from "@adminjs/design-system";
import { ApiClient } from "adminjs";
import React, { useEffect, useMemo, useState } from "react";
import { type AxisOptions, Chart } from "react-charts";

import { type DashboardData } from "../handlers/dashboard";

const Dashboard = () => {
  const api = new ApiClient();

  const [data, setData] = useState<DashboardData | null>();

  useEffect(() => {
    api
      .getDashboard<DashboardData>()
      .then((res) => setData(res.data))
      .catch(console.error);
  }, []);

  const chartData = useMemo(
    () => [
      {
        label: "Orders",
        data: data?.orderData ?? [],
      },
    ],
    [data]
  );

  const primaryAxis = useMemo(
    (): AxisOptions<DashboardData["orderData"][number]> => ({
      getValue: (datum) => datum.monthday,
    }),
    [chartData]
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<DashboardData["orderData"][number]>[] => [
      {
        min: 0,
        max: 10,
        getValue: (datum) => datum.count,
      },
    ],
    [chartData]
  );

  return (
    <>
      <div className="m-8">
        <Header>Dashboard</Header>
        <div className="flex flex-row gap-6">
          {data?.resourceCount?.map(({ name, icon, count }) => (
            <Box key={name} className="bg-blue-200 p-8 rounded shadow-lg">
              <div className="flex gap-2 items-center mb-4">
                <Icon icon={icon} />
                <p className="text-base">{name}</p>
              </div>
              <p className="text-xl font-bold">{count}</p>
            </Box>
          ))}
        </div>
      </div>
      {!!data?.orderData?.length && (
        <div className="flex flex-1 flex-col m-8 gap-2 h-auto">
          <Header>Orders per day</Header>
          <div className="flex flex-1 h-12 w-1/2">
            <Chart
              options={{
                data: chartData,
                primaryAxis: primaryAxis,
                secondaryAxes: secondaryAxes,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
