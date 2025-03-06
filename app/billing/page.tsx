import { Header } from "@/components/header"
import { Search, Filter } from "lucide-react"

// Sample invoice data
const invoices = [
  {
    id: "INV-001",
    amount: "$250.00",
    status: "Paid",
    date: "2024-01-15T10:00:00Z"
  },
  {
    id: "INV-002",
    amount: "$180.00",
    status: "Pending",
    date: "2024-01-14T15:30:00Z"
  },
  {
    id: "INV-003",
    amount: "$420.00",
    status: "Paid",
    date: "2024-01-13T09:15:00Z"
  },
]

export default function Billing() {
  return (
    <div>
      <Header />
      <div className="mt-14 p-6">
        <h1 className="text-3xl font-bold mb-6">Billing</h1>
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search invoices..."
              className="w-full pl-10 h-9 px-4 bg-gray-50 border border-gray-200 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                text-sm transition-all duration-200"
            />
          </div>
          <button
            className="flex items-center gap-2 px-4 h-9 bg-white border border-gray-200 rounded-lg 
              hover:bg-gray-50 transition-colors duration-200 text-sm font-medium text-gray-600"
          >
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Invoice ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr 
                    key={invoice.id} 
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {invoice.id}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {invoice.amount}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${invoice.status === 'Paid' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(invoice.date).toLocaleDateString('en-US', {
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
        
        <div className="mt-6 flex justify-end">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
              transition-colors duration-200 font-medium"
          >
            Make a Payment
          </button>
        </div>
      </div>
    </div>
  )
}

