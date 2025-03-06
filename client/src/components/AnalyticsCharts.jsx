import { useSelector } from "react-redux"
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"

const AnalyticsCharts = () => {
  const { overview, isLoading } = useSelector((state) => state.analytics)

  // Colors for the charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

  // Format data for the pie chart
  const getPieChartData = () => {
    if (!overview.ordersByStatus || overview.ordersByStatus.length === 0) {
      return []
    }

    return overview.ordersByStatus.map((item) => ({
      name: item._id,
      value: item.count,
    }))
  }

  // Format data for the bar chart
  const getBarChartData = () => {
    if (!overview.materialUsage || overview.materialUsage.length === 0) {
      return []
    }

    return overview.materialUsage.map((item) => ({
      name: item.materialName,
      usage: item.totalUsed,
    }))
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading analytics...</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Order Status Distribution */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Order Status Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={getPieChartData()}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {getPieChartData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Material Usage */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Material Consumption</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={getBarChartData()}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="usage" fill="#8884d8" name="Units Used">
                {getBarChartData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsCharts

