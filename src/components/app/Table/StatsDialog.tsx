// @ts-nocheck

import { useMemo, useState } from "react";
import Dialog from "../Dialog";
import { Chart } from "react-google-charts";
import type { TData } from "src/types/user";

const StatsDialog = ({ creators }: { creators: TData[][] }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<"status" | "gender">(
    "status"
  );

  const flattenedCreators = useMemo(() => creators.flat(), [creators]);

  const getStatusData = () => {
    const statusCount: { [key: string]: { active: number } } & Record<
      string,
      { active: number }
    > = { male: { active: 0 }, female: { active: 0 } } as {
      [key: string]: { active: number };
    } & Record<string, { active: number }>;

    flattenedCreators.forEach((creator) => {
      // @ts-ignore
      statusCount[creator.gender][creator.status]++;
    });

    return {
      chartData: [
        ["Availability for chat", "Value"],
        ["Male", statusCount.male.active],
        ["Female", statusCount.female.active],
      ],
      statusValues: {
        maleActive: statusCount.male.active,
        femaleActive: statusCount.female.active,
        statusColor: ["#98CB82", "#9BDFC4"],
      },
    };
  };

  const getGenderData = () => {
    const genderCount = { male: 0, female: 0 };

    flattenedCreators.forEach((creator) => {
      // @ts-ignore
      genderCount[creator.gender]++;
    });

    return {
      chartData: [
        ["Gender distribution", "Value"],
        ["Male", genderCount.male],
        ["Female", genderCount.female],
      ],
      genderValues: {
        male: genderCount.male,
        female: genderCount.female,
        genderColor: ["#62B2FD", "#9BDFC4"],
      },
    };
  };

  const { chartData, statusValues, genderValues } = useMemo(() => {
    return selectedOption === "status" ? getStatusData() : getGenderData();
  }, [flattenedCreators, selectedOption]) as {
    chartData: (string | number)[][];
    statusValues?: {
      maleActive: number;
      femaleActive: number;
      statusColor: string[];
    };
    genderValues?: {
      male: number;
      female: number;
      genderColor: string[];
    };
  };

  const options = useMemo(() => {
    const baseOptions = { legend: "none" };
    const colors =
      selectedOption === "status"
        ? statusValues?.statusColor
        : genderValues?.genderColor;
    return { ...baseOptions, colors };
  }, [selectedOption, statusValues, genderValues]);

  const getSvgFillColor = (index: number) => {
    const colors =
      selectedOption === "status"
        ? (statusValues as { statusColor: string[] })?.statusColor
        : (genderValues as { genderColor: string[] })?.genderColor;
    return colors?.[index] || "currentColor";
  };

  return (
    <Dialog
      isDialogOpen={isDialogOpen}
      setIsDialogOpen={setIsDialogOpen}
      triggerButton={{
        variant: "outline",
        size: "md",
        label: "View stats",
        icon: "hugeicons:analytics-01",
      }}
      modalTitle="Stats"
    >
      <div className="flex flex-col md:flex-row divide-y md:divide-x md:divide-y-0 divide-gray-200">
        <div className="flex-1 text-center">
          <Chart
            chartType="PieChart"
            data={chartData}
            options={options}
            width={"100%"}
            height={"200px"}
          />
        </div>
        <div className="flex-1 text-start flex flex-col justify-center py-4 md:px-4 md:py-0">
          <select
            value={selectedOption}
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6"
            onChange={(e) =>
              setSelectedOption(e.target.value as "status" | "gender")
            }
          >
            <option value="status">Availability for chat</option>
            <option value="gender">Gender distribution</option>
          </select>
          <div className="flex-1 grid p-2.5">
            <div className="grid gap-1.5 mt-2">
              <span className="inline-flex items-center gap-x-1.5 text-xs font-medium text-gray-900/80">
                <svg
                  className={`h-1.5 w-1.5 `}
                  fill={getSvgFillColor(0)}
                  viewBox="0 0 6 6"
                  aria-hidden="true"
                >
                  <circle cx="3" cy="3" r="3" />
                </svg>
                Female
              </span>
              <div className="text-xl font-semibold text-black">
                {selectedOption === "status"
                  ? (
                      (statusValues?.femaleActive /
                        (statusValues?.femaleActive +
                          statusValues?.maleActive)) *
                      100
                    ).toFixed(1)
                  : (
                      (genderValues?.female /
                        (genderValues?.female + genderValues?.male)) *
                      100
                    ).toFixed(1)}
                %
              </div>
            </div>
            <div className="grid gap-1.5 mt-2">
              <span className="inline-flex items-center gap-x-1.5 text-xs font-medium text-gray-900/80">
                <svg
                  className={`h-1.5 w-1.5 `}
                  fill={getSvgFillColor(1)}
                  viewBox="0 0 6 6"
                  aria-hidden="true"
                >
                  <circle cx="3" cy="3" r="3" />
                </svg>
                Male
              </span>
              <div className="text-xl font-semibold text-black">
                {selectedOption === "status"
                  ? (
                      (statusValues?.maleActive /
                        (statusValues?.femaleActive +
                          statusValues?.maleActive)) *
                      100
                    ).toFixed(1)
                  : (
                      (genderValues?.male /
                        (genderValues?.female + genderValues?.male)) *
                      100
                    ).toFixed(1)}
                %
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default StatsDialog;
