import { Header } from "@/components/header"
import { Search, Filter } from "lucide-react"

// Sample data - replace with your actual data source
const customers = [
  {
    id: "CST-001",
    name: "John Smith",
    status: "Active",
    createdAt: "2024-01-15T10:00:00Z"
  },
  {
    id: "CST-002",
    name: "Sarah Johnson",
    status: "Inactive",
    createdAt: "2024-01-14T15:30:00Z"
  },
  {
    id: "CST-003",
    name: "Michael Brown",
    status: "Active",
    createdAt: "2024-01-13T09:15:00Z"
  },
  // Add more sample data as needed
]

export default function CustomerProfile() {
  return (
    <div>
      <Header />
      <div className="mt-14 p-6">
        <h1 className="text-3xl font-bold mb-6">Customer Profile</h1>
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search customers..."
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
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Created at
                  </th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr 
                    key={customer.id} 
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {customer.id}
                    </td>
                    <td className="px-6 py-4">
                      {customer.name}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${customer.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'}`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(customer.createdAt).toLocaleDateString('en-US', {
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
  )
}

