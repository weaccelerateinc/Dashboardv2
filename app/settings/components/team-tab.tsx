import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample team data
const teamMembers = [
  {
    name: "John Smith",
    email: "john@example.com",
    role: "Admin",
    lastActive: "2024-03-10T15:30:00Z"
  },
  {
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "Developer",
    lastActive: "2024-03-10T14:45:00Z"
  },
  {
    name: "Michael Brown",
    email: "michael@example.com",
    role: "Viewer",
    lastActive: "2024-03-09T11:20:00Z"
  },
];

export function TeamTab() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Team Management</CardTitle>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium
            hover:bg-blue-600 transition-colors duration-200"
        >
          Add Member
        </button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Role</th>
                <th scope="col" className="px-6 py-3">Last Active</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member) => (
                <tr 
                  key={member.email}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {member.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {member.email}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${member.role === 'Admin' 
                        ? 'bg-blue-100 text-blue-800'
                        : member.role === 'Developer'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                      }`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(member.lastActive).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-sm text-gray-600 hover:text-gray-900">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
} 