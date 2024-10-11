import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const description = "Gráfico de juros compostos";

const chartConfig = {
  balance: {
    label: "Saldo",
    color: "hsl(var(--chart-3))",
  },
  invested: {
    label: "Investido",
    color: "hsl(var(--chart-1))",
  },
};

const timePoints = [
  { label: "6 meses", value: 6 },
  { label: "1 ano", value: 12 },
  { label: "2 anos", value: 24 },
  { label: "3 anos", value: 36 },
  { label: "5 anos", value: 60 },
  { label: "10 anos", value: 120 },
  { label: "15 anos", value: 180 },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const calculateCompoundInterest = (
  initialAmount: number,
  monthlyContribution: number,
  annualRate: number
) => {
  const data: { month: string; balance: number; invested: number }[] = [];
  let balance = initialAmount;
  let invested = initialAmount;
  const monthlyRate = (1 + annualRate / 100) ** (1 / 12) - 1;

  for (let monthCount = 0; monthCount < timePoints[timePoints.length - 1].value; monthCount++) {

    balance = balance * (1 + monthlyRate) + monthlyContribution;
    invested += monthlyContribution;

    if (timePoints.some((point) => point.value === monthCount + 1)) {
      const label = timePoints.find((point) => point.value === monthCount + 1)?.label || `${monthCount + 1} months`;
      data.push({
        month: label,
        balance,
        invested,
      });
    }
  }

  return data;
};


export function App() {
  const [initialValue, setInitialValue] = useState(0);
  const [monthlyValue, setMonthlyValue] = useState(1000);
  const [annualRate, setAnnualRate] = useState(10.4);

  const chartData = calculateCompoundInterest(initialValue, monthlyValue, annualRate);
  const maxBalance = Math.max(...chartData.map((d) => d.balance));

  return (
    <div className="h-screen w-full p-6 flex items-center justify-center">
      <Card className="p-2 w-1/2 bg-background  shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Gráfico de Juros Compostos</CardTitle>
          <CardDescription className="text-gray-600">
            Crie um gráfico de juros compostos
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor="initialValue" className="text-sm font-medium text-gray-700">
                Valor Inicial
              </Label>
              <Input
                id="initialValue"
                type="number"
                placeholder="Valor Inicial"
                value={initialValue}
                onChange={(e) => setInitialValue(parseFloat(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="monthlyValue" className="text-sm font-medium text-gray-700">
                Valor Mensal
              </Label>
              <Input
                id="monthlyValue"
                type="number"
                placeholder="Valor Mensal"
                value={monthlyValue}
                onChange={(e) => setMonthlyValue(parseFloat(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="annualRate" className="text-sm font-medium text-gray-700">
                Taxa Anual (%)
              </Label>
              <Input
                id="annualRate"
                type="number"
                placeholder="Taxa Anual (%)"
                value={annualRate}
                onChange={(e) => setAnnualRate(parseFloat(e.target.value))}
              />
            </div>
          </div>

          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 10,
                bottom: 10,
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#ccc" />

              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={[0, maxBalance * 1.1]}
                tickFormatter={formatCurrency}
              />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />

              <Area
                dataKey="balance"
                type="linear"
                fill={chartConfig.balance.color}
                fillOpacity={0.4}
                stroke={chartConfig.balance.color}
              />

              <Area
                dataKey="invested"
                type="linear"
                fill={chartConfig.invested.color}
                fillOpacity={0.4}
                stroke={chartConfig.invested.color}
              />
              
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
