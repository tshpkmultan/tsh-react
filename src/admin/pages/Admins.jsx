import { useEffect, useState } from "react";
import axios from "axios";

export default function Admins() {
const [showPassword, setShowPassword] = useState(false);
  const [admins, setAdmins] = useState([]);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    role: "",
  });

  /* =========================================
     FETCH ADMINS
  ========================================= */

  useEffect(() => {

    fetchAdmins();

  }, []);

  const fetchAdmins = async () => {

    try {

      const res = await axios.get(
        "https://800junkuae.online/tsh-api/API/admin/get-admins.php"
      );

      setAdmins(res.data.admins);

    } catch (error) {

      console.log(error);
    }
  };

  /* =========================================
     HANDLE CHANGE
  ========================================= */

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* =========================================
     CREATE / UPDATE ADMIN
  ========================================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const form = new FormData();

      form.append("id", formData.id);
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("password", formData.password);
      form.append("role", formData.role);

      // UPDATE
      if (formData.id) {

        await axios.post(
          "https://800junkuae.online/tsh-api/API/admin/update-admin.php",
          form
        );

        alert("Admin Updated Successfully");
      }

      // CREATE
      else {

        await axios.post(
          "https://800junkuae.online/tsh-api/API/admin/create-admin.php",
          form
        );

        alert("Admin Created Successfully");
      }

      fetchAdmins();

      // RESET FORM
      setFormData({
        id: "",
        name: "",
        email: "",
        password: "",
        role: "",
      });

    } catch (error) {

      console.log(error);
    }
  };

  /* =========================================
     DELETE ADMIN
  ========================================= */

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this admin?"
    );

    if (!confirmDelete) return;

    try {

      const form = new FormData();

      form.append("id", id);

      await axios.post(
        "https://800junkuae.online/tsh-api/API/admin/delete-admin.php",
        form
      );

      alert("Admin Deleted Successfully");

      fetchAdmins();

    } catch (error) {

      console.log(error);
    }
  };

  /* =========================================
     EDIT ADMIN
  ========================================= */

  const handleEdit = (admin) => {

    setFormData({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      password: "",
      role: admin.role,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (

    <div>

      {/* TITLE */}
      <div className="mb-10">

        <h1 className="text-5xl font-black text-[#032B38]">
          Admins Management
        </h1>

        <p className="text-slate-500 mt-3 text-lg">
          Manage all system admins from one place.
        </p>

      </div>

      {/* FORM */}
      <div className="bg-white rounded-[30px] shadow-md p-8 mb-10">

        <h2 className="text-3xl font-black text-[#032B38] mb-8">

          {formData.id
            ? "Update Admin"
            : "Create New Admin"}

        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Admin Name"
            value={formData.name}
            onChange={handleChange}
            className="border-2 border-slate-200 rounded-2xl p-5 outline-none"
            required
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={handleChange}
            className="border-2 border-slate-200 rounded-2xl p-5 outline-none"
            required
          />
{/* PASSWORD */}
<div className="relative">

  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
    className="border-2 border-slate-200 rounded-2xl p-5 pr-16 outline-none w-full"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl"
  >

    {showPassword ? "🙈" : "👁️"}

  </button>

</div>

          {/* ROLE */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border-2 border-slate-200 rounded-2xl p-5 outline-none"
            required
          >

            <option value="">
              Select Role
            </option>

            <option value="super_admin">
              Super Admin
            </option>

            <option value="islamic_admin">
              Islamic Admin
            </option>

            <option value="digital_admin">
              Digital Admin
            </option>

            <option value="hospital_admin">
              Hospital Admin
            </option>

          </select>

          {/* BUTTON */}
          <button className="bg-[#032B38] text-white py-5 rounded-2xl font-black text-xl md:col-span-2">

            {formData.id
              ? "Update Admin"
              : "Create Admin"}

          </button>

        </form>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-[30px] shadow-md overflow-hidden">

        <div className="p-8 border-b">

          <h2 className="text-3xl font-black text-[#032B38]">
            All Admins
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead className="bg-slate-100">

              <tr>

                <th className="text-left px-6 py-5 text-xl font-black">
                  Name
                </th>

                <th className="text-left px-6 py-5 text-xl font-black">
                  Email
                </th>

                <th className="text-left px-6 py-5 text-xl font-black">
                  Role
                </th>

                <th className="text-left px-6 py-5 text-xl font-black">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {Array.isArray(admins) &&
  admins.map((admin) => (
  

                <tr
                  key={admin.id}
                  className="border-b hover:bg-slate-50"
                >

                  {/* NAME */}
                  <td className="px-6 py-5 text-lg font-bold">
                    {admin.name}
                  </td>

                  {/* EMAIL */}
                  <td className="px-6 py-5 text-lg">
                    {admin.email}
                  </td>

                  {/* ROLE */}
                  <td className="px-6 py-5 text-lg">
                    {admin.role}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-5">

                    <div className="flex gap-3">

                      {/* EDIT */}
                      <button
                        onClick={() => handleEdit(admin)}
                        className="bg-blue-500 text-white px-5 py-2 rounded-xl font-bold"
                      >
                        Edit
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => handleDelete(admin.id)}
                        className="bg-red-500 text-white px-5 py-2 rounded-xl font-bold"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}