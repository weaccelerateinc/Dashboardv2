"use client"

import { Header } from "@/components/header"
import { BarChart3, Calendar, ChevronDown } from "lucide-react"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
)

// Sample data - replace with your actual data
const orders = [
  {
    id: "ORD-001",
    customerName: "John Smith",
    value: 299.99,
    date: "2024-03-15T10:00:00Z"
  },
  {
    id: "ORD-002",
    customerName: "Sarah Johnson",
    value: 149.99,
    date: "2024-03-15T14:30:00Z"
  },
  {
    id: "ORD-003",
    customerName: "Michael Brown",
    value: 499.99,
    date: "2024-03-14T09:15:00Z"
  },
  {
    id: "ORD-004",
    customerName: "Emily Davis",
    value: 199.99,
    date: "2024-03-14T16:45:00Z"
  },
  {
    id: "ORD-005",
    customerName: "David Wilson",
    value: 399.99,
    date: "2024-03-13T11:20:00Z"
  },
  // Add more sample orders as needed
]

// Sample daily order data for the chart
const dailyOrders = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Orders',
      data: [12, 19, 15, 25, 22, 30, 28],
      backgroundColor: 'rgb(59, 130, 246)',
      borderRadius: 4,
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
}

const presetRanges = [
  { name: "Last 7 days", value: "7d" },
  { name: "Last 30 days", value: "30d" },
  { name: "Last 90 days", value: "90d" },
  { name: "Year to date", value: "ytd" },
  { name: "All time", value: "all" },
]

export default function Metrics() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRange, setSelectedRange] = useState("Last 30 days")
  const [fromDate, setFromDate] = useState<Date>()
  const [toDate, setToDate] = useState<Date>()

  const handlePresetSelect = (rangeName: string) => {
    setSelectedRange(rangeName)
    setIsOpen(false)
  }

  const handleCustomRangeSelect = () => {
    if (fromDate && toDate) {
      const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
      };
      setSelectedRange(`${formatDate(fromDate)} - ${formatDate(toDate)}`)
      setIsOpen(false)
    }
  }

  return (
    <div>
      <Header />
      <div className="mt-14 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Order Metrics</h1>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <button
                className="flex items-center gap-2 px-4 h-9 bg-white border border-gray-200 rounded-lg 
                  hover:bg-gray-50 transition-colors duration-200 text-sm font-medium text-gray-600"
              >
                <Calendar className="h-4 w-4" />
                {selectedRange}
                <ChevronDown className="h-4 w-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <div className="p-2">
                {presetRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => handlePresetSelect(range.name)}
                    className="w-full text-left px-2 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                  >
                    {range.name}
                  </button>
                ))}
              </div>
              <Separator className="my-2" />
              <div className="p-2">
                <p className="px-2 py-1.5 text-sm font-medium text-gray-900">Custom Range</p>
                <div className="flex gap-2 mt-2">
                  <div>
                    <p className="px-2 text-xs text-gray-500 mb-1">From</p>
                    <CalendarComponent
                      mode="single"
                      selected={fromDate}
                      onSelect={setFromDate}
                      className="rounded-md border"
                    />
                  </div>
                  <div>
                    <p className="px-2 text-xs text-gray-500 mb-1">To</p>
                    <CalendarComponent
                      mode="single"
                      selected={toDate}
                      onSelect={setToDate}
                      className="rounded-md border"
                    />
                  </div>
                </div>
                <button
                  onClick={handleCustomRangeSelect}
                  disabled={!fromDate || !toDate}
                  className="w-full mt-2 px-2 py-1.5 text-sm font-medium text-white bg-blue-500 
                    rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Apply Range
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Orders Chart */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
          <h2 className="text-lg font-semibold mb-4">Daily Orders</h2>
          <div className="h-[300px]">
            <Bar options={chartOptions} data={dailyOrders} />
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">Customer Name</th>
                    <th scope="col" className="px-6 py-3">Order Value</th>
                    <th scope="col" className="px-6 py-3">Order ID</th>
                    <th scope="col" className="px-6 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {order.customerName}
                      </td>
                      <td className="px-6 py-4">
                        ${order.value.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        {order.id}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(order.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

