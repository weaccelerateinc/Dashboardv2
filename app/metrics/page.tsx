"use client"

import { Header } from "@/components/header"
import { BarChart3, Users, UserX, ShoppingCart, Calendar, ChevronDown } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
);

// Sample data - replace with your actual metrics
const metrics = {
  totalImpressions: {
    total: "1.2M",
    daily: [980000, 1100000, 1250000, 1300000, 1150000, 1200000, 1400000]
  },
  verifiedUsers: {
    total: "45.2K",
    daily: [41000, 42000, 43500, 44000, 44500, 45000, 45200]
  },
  unverifiedUsers: "12.8K",
  totalOrders: "89.3K",
  twoFactorTriggers: "56.7K",
  twoFactorCompletions: "52.1K",
  twoFactorFailures: "4.6K",
  manualCardEntries: "12.4K",
  cardsDisplayed: "234.5K",
  avgCardsPerUser: "3.2",
  cvvVerifications: "78.9K",
  cvvVerificationFailures: "3.2K"
}

const presetRanges = [
  { name: "Last 7 days", value: "7d" },
  { name: "Last 30 days", value: "30d" },
  { name: "Last 90 days", value: "90d" },
  { name: "Year to date", value: "ytd" },
  { name: "All time", value: "all" },
]

const last7Days = Array.from({length: 7}, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (6 - i));
  return d.toLocaleDateString('en-US', { weekday: 'short' });
});

// Chart configuration
const getChartOptions = (color: string) => ({
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
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 10,
        },
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
    },
  },
});

const getChartData = (data: number[], color: string) => ({
  labels: last7Days,
  datasets: [
    {
      data: data,
      backgroundColor: color,
      borderRadius: 4,
      borderSkipped: false,
    },
  ],
});

// Example of updated metric card component
function MetricCard({ 
  title, 
  total, 
  dailyData, 
  icon: Icon, 
  color, 
  bgColor 
}: {
  title: string;
  total: string;
  dailyData: number[];
  icon: any;
  color: string;
  bgColor: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">{total}</h3>
        </div>
        <div className={`p-3 ${bgColor} rounded-lg`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
      <div className="h-32 mt-4">
        <Bar
          options={getChartOptions(color)}
          data={getChartData(dailyData, color.replace('text-', 'rgb(var(--'))}
          height={128}
        />
      </div>
    </div>
  );
}

export default function Metrics() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRange, setSelectedRange] = useState("Last 30 days")
  const [fromDate, setFromDate] = useState<Date>()
  const [toDate, setToDate] = useState<Date>()
  const [isCustomRange, setIsCustomRange] = useState(false)

  const handlePresetSelect = (rangeName: string) => {
    setSelectedRange(rangeName)
    setIsCustomRange(false)
    setIsOpen(false)
  }

  const handleCustomRangeSelect = () => {
    if (fromDate && toDate) {
      setSelectedRange(`${format(fromDate, 'MMM d, yyyy')} - ${format(toDate, 'MMM d, yyyy')}`)
      setIsCustomRange(true)
      setIsOpen(false)
    }
  }

  return (
    <div>
      <Header />
      <div className="mt-14 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Metrics</h1>
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
        <div className="grid grid-cols-1 gap-4">
          {/* Awareness Stage */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <MetricCard
                title="Total Impressions"
                total={metrics.totalImpressions.total}
                dailyData={metrics.totalImpressions.daily}
                icon={BarChart3}
                color="text-blue-500"
                bgColor="bg-blue-50"
              />
            </div>
            <MetricCard
              title="Verified Users"
              total={metrics.verifiedUsers.total}
              dailyData={metrics.verifiedUsers.daily}
              icon={Users}
              color="text-green-500"
              bgColor="bg-green-50"
            />
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Unverified Users</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2">{metrics.unverifiedUsers}</h3>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <UserX className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
              <div className="mt-4">
                <div className="h-2 bg-yellow-100 rounded-full">
                  <div className="h-2 bg-yellow-500 rounded-full w-[25%]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Authentication Stage */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">2FA Triggers</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2">{metrics.twoFactorTriggers}</h3>
                </div>
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <Users className="h-6 w-6 text-indigo-500" />
                </div>
              </div>
              <div className="mt-4">
                <div className="h-2 bg-indigo-100 rounded-full">
                  <div className="h-2 bg-indigo-500 rounded-full w-[60%]"></div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">2FA Completions</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2">{metrics.twoFactorCompletions}</h3>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <Users className="h-6 w-6 text-emerald-500" />
                </div>
              </div>
              <div className="mt-4">
                <div className="h-2 bg-emerald-100 rounded-full">
                  <div className="h-2 bg-emerald-500 rounded-full w-[55%]"></div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">2FA Failures</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2">{metrics.twoFactorFailures}</h3>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <UserX className="h-6 w-6 text-red-500" />
                </div>
              </div>
              <div className="mt-4">
                <div className="h-2 bg-red-100 rounded-full">
                  <div className="h-2 bg-red-500 rounded-full w-[5%]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card Management Stage */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Cards Displayed</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2">{metrics.cardsDisplayed}</h3>
                </div>
                <div className="p-3 bg-cyan-50 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-cyan-500" />
                </div>
              </div>
              <div className="mt-4">
                <div className="h-2 bg-cyan-100 rounded-full">
                  <div className="h-2 bg-cyan-500 rounded-full w-[50%]"></div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Cards Per User</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2">{metrics.avgCardsPerUser}</h3>
                </div>
                <div className="p-3 bg-pink-50 rounded-lg">
                  <Users className="h-6 w-6 text-pink-500" />
                </div>
              </div>
              <div className="mt-4">
                <div className="h-2 bg-pink-100 rounded-full">
                  <div className="h-2 bg-pink-500 rounded-full w-[30%]"></div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Manual Card Entries</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2">{metrics.manualCardEntries}</h3>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <ShoppingCart className="h-6 w-6 text-orange-500" />
                </div>
              </div>
              <div className="mt-4">
                <div className="h-2 bg-orange-100 rounded-full">
                  <div className="h-2 bg-orange-500 rounded-full w-[20%]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Stage */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">CVV Verifications</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2">{metrics.cvvVerifications}</h3>
                </div>
                <div className="p-3 bg-teal-50 rounded-lg">
                  <ShoppingCart className="h-6 w-6 text-teal-500" />
                </div>
              </div>
              <div className="mt-4">
                <div className="h-2 bg-teal-100 rounded-full">
                  <div className="h-2 bg-teal-500 rounded-full w-[40%]"></div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">CVV Verification Failures</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2">{metrics.cvvVerificationFailures}</h3>
                </div>
                <div className="p-3 bg-rose-50 rounded-lg">
                  <UserX className="h-6 w-6 text-rose-500" />
                </div>
              </div>
              <div className="mt-4">
                <div className="h-2 bg-rose-100 rounded-full">
                  <div className="h-2 bg-rose-500 rounded-full w-[10%]"></div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2">{metrics.totalOrders}</h3>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <ShoppingCart className="h-6 w-6 text-purple-500" />
                </div>
              </div>
              <div className="mt-4">
                <div className="h-2 bg-purple-100 rounded-full">
                  <div className="h-2 bg-purple-500 rounded-full w-[35%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

