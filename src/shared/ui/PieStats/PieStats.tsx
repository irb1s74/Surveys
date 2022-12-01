import {FC} from "react";
import {Pie, PieChart, Tooltip} from "recharts";

interface PieStatsProps {
    data: { name: string, value: number }[]
}

const PieStats: FC<PieStatsProps> = ({data}) => {
    return (
        <PieChart width={600} height={400}>
            <Pie
                data={data}
                dataKey="value"
                cx={300}
                cy={200}
                outerRadius={60}
                label
                fill="#0F2232"
            />
            <Tooltip/>
        </PieChart>
    );
};

export default PieStats;
