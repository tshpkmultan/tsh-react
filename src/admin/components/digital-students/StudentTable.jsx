import {
  Eye,
  Pencil,
  Trash2,
  RefreshCw,
} from "lucide-react";

const BASE_URL = "https://800junkuae.online/tsh-api/";

const StudentTable = ({
  students,
  loading,
  onView,
  onEdit,
  onStatus,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl p-10 text-center shadow">
        Loading students...
      </div>
    );
  }

  if (!students.length) {
    return (
      <div className="bg-white rounded-xl p-10 text-center shadow text-gray-500">
        No Students Found
      </div>
    );
  }

  const badgeColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-5 py-4 text-left">
                Profile
              </th>

              <th className="px-5 py-4 text-left">
                Student
              </th>

              <th className="px-5 py-4 text-left">
                Trainer
              </th>

              <th className="px-5 py-4 text-left">
                Course
              </th>

              <th className="px-5 py-4 text-left">
                Batch
              </th>

              <th className="px-5 py-4 text-left">
                Phone
              </th>

              <th className="px-5 py-4 text-center">
                Status
              </th>

              <th className="px-5 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {students.map((student) => (

              <tr
                key={student.id}
                className="border-t hover:bg-gray-50"
              >

                {/* Profile */}

                <td className="px-5 py-3">

                  <img
                    src={
                      student.profile_image
                        ? `${BASE_URL}/${student.profile_image}`
                        : "https://ui-avatars.com/api/?name=" +
                          encodeURIComponent(student.full_name)
                    }
                    alt=""
                    className="w-12 h-12 rounded-full border object-cover"
                  />

                </td>

                {/* Name */}

                <td className="px-5 py-3">

                  <h3 className="font-semibold">
                    {student.full_name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {student.email}
                  </p>

                </td>

                {/* Trainer */}

                <td className="px-5 py-3">

                  {student.trainer_name || "-"}

                </td>

                {/* Course */}

                <td className="px-5 py-3">

                  {student.course_name || "-"}

                </td>

                {/* Batch */}

                <td className="px-5 py-3">

                  {student.batch_name || "-"}

                </td>

                {/* Phone */}

                <td className="px-5 py-3">

                  {student.phone}

                </td>

                {/* Status */}

                <td className="px-5 py-3 text-center">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeColor(
                      student.status
                    )}`}
                  >
                    {student.status}
                  </span>

                </td>

                {/* Actions */}

                <td className="px-5 py-3">

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => onView(student)}
                      className="p-2 rounded bg-blue-100 hover:bg-blue-200"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => onEdit(student)}
                      className="p-2 rounded bg-green-100 hover:bg-green-200"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onStatus(student)}
                      className="p-2 rounded bg-yellow-100 hover:bg-yellow-200"
                    >
                      <RefreshCw size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(student)}
                      className="p-2 rounded bg-red-100 hover:bg-red-200"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default StudentTable;