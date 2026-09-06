import { Children, cloneElement, isValidElement, useLayoutEffect, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { Panel, PanelHeader } from "@/components/common";

const axis = { stroke: "var(--color-muted-foreground)", fontSize: 12 };
const tooltipStyle = {
  contentStyle: {
    borderRadius: 8,
    border: "1px solid var(--color-border)",
    background: "var(--color-card)",
    fontSize: 12,
  },
};

export function ChartCard({ title, description, action, children, height = 280 }) {
  const [size, setSize] = useState(null);
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const update = () => {
      const rect = el.getBoundingClientRect();
      setSize({
        width: Math.max(1, Math.floor(rect.width)),
        height: Math.max(1, Math.floor(rect.height)),
      });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <Panel>
      <PanelHeader
        title={title}
        {...(description ? { description } : {})}
        {...(action ? { action } : {})}
      />
      <div ref={ref} className="relative w-full p-4" style={{ height }}>
        {size ? (
          <div style={{ width: size.width, height: size.height }}>
            {Children.map(children, (child) =>
              isValidElement(child)
                ? cloneElement(child, { width: size.width, height: size.height })
                : child,
            )}
          </div>
        ) : null}
      </div>
    </Panel>
  );
}

export function SimpleBarChart({ data, xKey, yKey, colorBy, width = 500, height = 280 }) {
  return (
    <BarChart
      data={data}
      width={width}
      height={height}
      margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
    >
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
      <XAxis
        dataKey={xKey}
        tick={axis}
        tickLine={false}
        axisLine={false}
        interval={0}
        angle={-12}
        textAnchor="end"
        height={54}
      />
      <YAxis tick={axis} tickLine={false} axisLine={false} />
      <Tooltip {...tooltipStyle} cursor={{ fill: "var(--color-muted)" }} />
      <Bar dataKey={yKey} radius={[6, 6, 0, 0]}>
        {data.map((d, i) => (
          <Cell key={i} fill={colorBy ? colorBy(Number(d[yKey])) : "var(--color-chart-1)"} />
        ))}
      </Bar>
    </BarChart>
  );
}

export function SimpleLineChart({ data, xKey, yKey, width = 500, height = 280 }) {
  return (
    <LineChart
      data={data}
      width={width}
      height={height}
      margin={{ top: 8, right: 12, left: -18, bottom: 0 }}
    >
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
      <XAxis dataKey={xKey} tick={axis} tickLine={false} axisLine={false} />
      <YAxis tick={axis} tickLine={false} axisLine={false} domain={[0, 10]} />
      <Tooltip {...tooltipStyle} />
      <Line
        type="monotone"
        dataKey={yKey}
        stroke="var(--color-chart-1)"
        strokeWidth={2.5}
        dot={{ r: 4 }}
      />
    </LineChart>
  );
}

const pieColors = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

export function SimplePieChart({ data, width = 500, height = 280 }) {
  return (
    <PieChart width={width} height={height}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        innerRadius={55}
        outerRadius={90}
        paddingAngle={2}
      >
        {data.map((_, i) => (
          <Cell key={i} fill={pieColors[i % pieColors.length]} />
        ))}
      </Pie>
      <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 12 }} />
      <Tooltip {...tooltipStyle} />
    </PieChart>
  );
}
