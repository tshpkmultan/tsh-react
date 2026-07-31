import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaMosque,
  FaLaptopCode,
  FaHospital,
  FaSearch,
  FaPlus,
} from "react-icons/fa";
import Swal from "sweetalert2";
const BASE_URL = "https://800junkuae.online/tsh-api/API";

export default function Users() {
const [selectedUser, setSelectedUser] = useState(null);

const [showViewModal, setShowViewModal] = useState(false);

const [showEditModal, setShowEditModal] = useState(false);

const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([]);

  const [stats, setStats] = useState({
    total_users: 0,
    islamic_users: 0,
    digital_users: 0,
    health_users: 0,
  });

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("all");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    total_pages: 1,
  });

  useEffect(() => {
    loadUsers();
  }, [page, category]);

  const loadUsers = async (searchText = search) => {

    try {

      setLoading(true);

      const response = await fetch(

        `${BASE_URL}/admin/users/users.php?action=list&page=${page}&category=${category}&search=${encodeURIComponent(searchText)}`

      );

      const data = await response.json();

      if (data.success) {

        setUsers(data.users);

        setStats(data.stats);

        setPagination(data.pagination);

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };
const viewUser = async (id) => {

  try {

    const response = await fetch(
      `${BASE_URL}/admin/users/users.php?action=view&id=${id}`
    );

    const data = await response.json();

    if (data.success) {

      setSelectedUser(data.user);

      setShowViewModal(true);

    }

  } catch (error) {

    console.log(error);

  }

};

const [editForm, setEditForm] = useState({
  id: "",
  name: "",
  username: "",
  category: "",
  password: "",
});
const [showAddModal, setShowAddModal] = useState(false);

const [addForm, setAddForm] = useState({
  name: "",
  username: "",
  category: "islamic",
  password: "",
});


const editUser = (user) => {

  setEditForm({

    id: user.id,

    name: user.name,

    username: user.username,

    category: user.category,

    password: "",

  });

  setShowEditModal(true);

};
const updateUser = async () => {

  try {

    const formData = new FormData();

    formData.append("action", "update");
    formData.append("id", editForm.id);
    formData.append("name", editForm.name);
    formData.append("username", editForm.username);
    formData.append("category", editForm.category);
    formData.append("password", editForm.password);

    const response = await fetch(
      `${BASE_URL}/admin/users/users.php`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.success) {

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: data.message,
        confirmButtonColor: "#032B38",
      });

     setShowEditModal(false);

setSearch("");

setPage(1);

loadUsers("");

    } else {

      Swal.fire({
        icon: "error",
        title: "Error",
        text: data.message,
        confirmButtonColor: "#dc2626",
      });

    }

  } catch (error) {

    console.log(error);

    Swal.fire({
      icon: "error",
      title: "Server Error",
      text: "Something went wrong.",
    });

  }

};
const createUser = async () => {

  try {

    const formData = new FormData();

    formData.append("action", "create");
    formData.append("name", addForm.name);
    formData.append("username", addForm.username);
    formData.append("category", addForm.category);
    formData.append("password", addForm.password);

    const response = await fetch(
      `${BASE_URL}/admin/users/users.php`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.success) {

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: data.message,
        confirmButtonColor: "#032B38",
      });

      setShowAddModal(false);

      setAddForm({
        name: "",
        username: "",
        category: "islamic",
        password: "",
      });

      loadUsers("");

    } else {

      Swal.fire({
        icon: "error",
        title: "Error",
        text: data.message,
      });

    }

  } catch (error) {

    console.log(error);

    Swal.fire({
      icon: "error",
      title: "Server Error",
      text: "Something went wrong.",
    });

  }

};
const resetPassword = (user) => {
  console.log("Reset Password", user);
};

const deleteUser = async (id) => {

  const result = await Swal.fire({
    title: "Delete User?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Delete",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#dc2626",
  });

  if (!result.isConfirmed) return;

  try {

    const formData = new FormData();

    formData.append("action", "delete");
    formData.append("id", id);

    const response = await fetch(
      `${BASE_URL}/admin/users/users.php`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.success) {

      await Swal.fire({
        icon: "success",
        title: "Deleted",
        text: data.message,
        confirmButtonColor: "#032B38",
      });

      loadUsers("");

    } else {

      Swal.fire({
        icon: "error",
        title: "Error",
        text: data.message,
      });

    }

  } catch (error) {

    console.log(error);

    Swal.fire({
      icon: "error",
      title: "Server Error",
      text: "Something went wrong.",
    });

  }

};
  const cards = [

    {
      title: "Total Users",
      value: stats.total_users,
      color: "from-blue-500 to-cyan-500",
      icon: <FaUsers size={26} />,
    },

    {
      title: "Islamic",
      value: stats.islamic_users,
      color: "from-green-500 to-emerald-600",
      icon: <FaMosque size={26} />,
    },

    {
      title: "Digital",
      value: stats.digital_users,
      color: "from-purple-500 to-pink-500",
      icon: <FaLaptopCode size={26} />,
    },

    {
      title: "Health",
      value: stats.health_users,
      color: "from-red-500 to-orange-500",
      icon: <FaHospital size={26} />,
    },

  ];

  if (loading) {

    return (

      <div className="flex justify-center items-center h-[70vh]">

        <div className="w-16 h-16 rounded-full border-4 border-[#032B38] border-t-transparent animate-spin"></div>

      </div>

    );

  }

  return (

    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between gap-5">

        <div>

          <h1 className="text-5xl font-black text-[#032B38]">
            Users Management
          </h1>

          <p className="text-slate-500 mt-2">
            Manage all Islamic, Digital & Health users
          </p>

        </div>

        <button
  onClick={() => {
    setAddForm({
      name: "",
      username: "",
      category: "islamic",
      password: "",
    });

    setShowAddModal(true);
  }}
  className="flex items-center gap-3 bg-[#032B38] text-white px-6 py-4 rounded-2xl hover:bg-[#05485d]"
>
  <FaPlus />
  Add User
</button>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card, index) => (

          <div
            key={index}
            className={`bg-gradient-to-r ${card.color} rounded-3xl p-7 shadow-xl text-white`}
          >

            <div className="flex justify-between">

              <div>

                <p className="text-white/80">
                  {card.title}
                </p>

                <h2 className="text-5xl font-black mt-4">
                  {card.value}
                </h2>

              </div>

              <div className="bg-white/20 p-5 rounded-2xl">

                {card.icon}

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Search & Filter */}

      <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col lg:flex-row gap-5">

        <div className="relative flex-1">

          <FaSearch className="absolute left-4 top-4 text-slate-400" />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            onKeyDown={(e)=>{

              if(e.key==="Enter"){

                setPage(1);

                loadUsers(e.target.value);

              }

            }}
            className="w-full bg-slate-100 rounded-xl py-3 pl-12 pr-4 outline-none"
          />

        </div>

        <select
          value={category}
          onChange={(e)=>{

            setCategory(e.target.value);

            setPage(1);

          }}
          className="bg-slate-100 rounded-xl px-5 py-3 outline-none"
        >

          <option value="all">All Users</option>

          <option value="islamic">Islamic</option>

          <option value="digital">Digital</option>

          <option value="health">Health</option>

        </select>

      </div>
            {/* Users Table */}

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-[#032B38] text-white">

              <tr>

                <th className="px-6 py-4 text-left">#</th>

                <th className="px-6 py-4 text-left">Name</th>

                <th className="px-6 py-4 text-left">Email</th>

                <th className="px-6 py-4 text-left">Category</th>

                <th className="px-6 py-4 text-left">Created</th>

                <th className="px-6 py-4 text-center">Actions</th>

              </tr>

            </thead>

            <tbody>

              {users.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-12 text-slate-500"
                  >

                    No Users Found

                  </td>

                </tr>

              ) : (

                users.map((user, index) => (

                  <tr
                    key={user.id}
                    className="border-b hover:bg-slate-50 transition"
                  >

                    <td className="px-6 py-4 font-semibold">

                      {(pagination.page - 1) * pagination.limit + index + 1}

                    </td>

                    <td className="px-6 py-4">

                      <div>

                        <h3 className="font-bold text-[#032B38]">

                          {user.name}

                        </h3>

                      </div>

                    </td>

                    <td className="px-6 py-4">

                      {user.username}

                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold
                        ${
                          user.category === "islamic"
                            ? "bg-green-100 text-green-700"
                            : user.category === "digital"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >

                        {user.category}

                      </span>

                    </td>

                    <td className="px-6 py-4">

                      {new Date(user.created_at).toLocaleDateString()}

                    </td>

                    <td className="px-6 py-4">

                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() => viewUser(user.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm"
                        >
                          View
                        </button>

                        <button
                          onClick={() => editUser(user)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => resetPassword(user)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-sm"
                        >
                          Password
                        </button>

                        <button
                          onClick={() => deleteUser(user.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>
            {/* Pagination */}

      <div className="flex justify-between items-center mt-8">

        <p className="text-slate-500">

          Showing Page {pagination.page} of {pagination.total_pages}

        </p>

        <div className="flex gap-3">

          <button
            disabled={pagination.page === 1}
            onClick={() => setPage(page - 1)}
            className="px-5 py-2 rounded-xl bg-slate-200 disabled:opacity-50"
          >
            Previous
          </button>

          <button
            disabled={pagination.page >= pagination.total_pages}
            onClick={() => setPage(page + 1)}
            className="px-5 py-2 rounded-xl bg-[#032B38] text-white disabled:opacity-50"
          >
            Next
          </button>

        </div>

      </div>
{/* ===========================
      VIEW USER MODAL
=========================== */}

{showViewModal && selectedUser && (

<div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-6">

<div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl">

<div className="flex justify-between items-center border-b p-6">

<h2 className="text-3xl font-black text-[#032B38]">

User Details

</h2>

<button
onClick={()=>setShowViewModal(false)}
className="text-3xl"
>

×

</button>

</div>

<div className="p-8 space-y-5">

<div className="grid grid-cols-2 gap-6">

<div>

<p className="text-slate-500">

ID

</p>

<h3 className="font-bold">

{selectedUser.id}

</h3>

</div>

<div>

<p className="text-slate-500">

Name

</p>

<h3 className="font-bold">

{selectedUser.name}

</h3>

</div>

<div>

<p className="text-slate-500">

Email

</p>

<h3 className="font-bold">

{selectedUser.username}

</h3>

</div>

<div>

<p className="text-slate-500">

Category

</p>

<span
className={`px-4 py-2 rounded-full text-sm font-bold
${
selectedUser.category==="islamic"
?"bg-green-100 text-green-700"
:selectedUser.category==="digital"
?"bg-purple-100 text-purple-700"
:"bg-red-100 text-red-700"
}`}
>

{selectedUser.category}

</span>

</div>

<div>

<p className="text-slate-500">

Created

</p>

<h3 className="font-bold">

{new Date(selectedUser.created_at).toLocaleString()}

</h3>

</div>

</div>

<div className="flex justify-end">

<button

onClick={()=>setShowViewModal(false)}

className="bg-[#032B38] text-white px-8 py-3 rounded-xl"

>

Close

</button>

</div>

</div>

</div>

</div>

)}

{showEditModal && (

<div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-6">

<div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl">

<div className="flex justify-between items-center border-b p-6">

<h2 className="text-3xl font-black">

Edit User

</h2>

<button

onClick={()=>setShowEditModal(false)}

className="text-3xl"

>

×

</button>

</div>

<div className="p-8 space-y-6">

<div>

<label className="font-semibold">

Name

</label>

<input

value={editForm.name}

onChange={(e)=>

setEditForm({

...editForm,

name:e.target.value

})

}

className="w-full border rounded-xl p-3 mt-2"

/>

</div>

<div>

<label className="font-semibold">

Email

</label>

<input

value={editForm.username}

onChange={(e)=>

setEditForm({

...editForm,

username:e.target.value

})

}

className="w-full border rounded-xl p-3 mt-2"

/>

</div>

<div>

<label className="font-semibold">

Category

</label>

<select

value={editForm.category}

onChange={(e)=>

setEditForm({

...editForm,

category:e.target.value

})

}

className="w-full border rounded-xl p-3 mt-2"

>

<option value="islamic">

Islamic

</option>

<option value="digital">

Digital

</option>

<option value="health">

Health

</option>

</select>

</div>

<div>

<label className="font-semibold">

Password

</label>

<input

type="password"

placeholder="Leave empty to keep current password"

value={editForm.password}

onChange={(e)=>

setEditForm({

...editForm,

password:e.target.value

})

}

className="w-full border rounded-xl p-3 mt-2"

/>

</div>

<div className="flex justify-end gap-4">

<button

onClick={()=>setShowEditModal(false)}

className="bg-slate-300 px-6 py-3 rounded-xl"

>

Cancel

</button>

<button

onClick={updateUser}

className="bg-[#032B38] text-white px-6 py-3 rounded-xl"

>

Update User

</button>

</div>

</div>

</div>

</div>

)}
{showAddModal && (

<div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-6">

<div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl">

<div className="flex justify-between items-center border-b p-6">

<h2 className="text-3xl font-black">
Add User
</h2>

<button
onClick={() => setShowAddModal(false)}
className="text-3xl"
>
×
</button>

</div>

<div className="p-8 space-y-6">

<div>

<label className="font-semibold">
Name
</label>

<input
value={addForm.name}
onChange={(e)=>
setAddForm({
...addForm,
name:e.target.value
})
}
className="w-full border rounded-xl p-3 mt-2"
/>

</div>

<div>

<label className="font-semibold">
Email
</label>

<input
value={addForm.username}
onChange={(e)=>
setAddForm({
...addForm,
username:e.target.value
})
}
className="w-full border rounded-xl p-3 mt-2"
/>

</div>

<div>

<label className="font-semibold">
Category
</label>

<select
value={addForm.category}
onChange={(e)=>
setAddForm({
...addForm,
category:e.target.value
})
}
className="w-full border rounded-xl p-3 mt-2"
>

<option value="islamic">Islamic</option>

<option value="digital">Digital</option>

<option value="health">Health</option>

</select>

</div>

<div>

<label className="font-semibold">
Password
</label>

<input
type="password"
value={addForm.password}
onChange={(e)=>
setAddForm({
...addForm,
password:e.target.value
})
}
className="w-full border rounded-xl p-3 mt-2"
/>

</div>

<div className="flex justify-end gap-4">

<button
onClick={() => setShowAddModal(false)}
className="bg-slate-300 px-6 py-3 rounded-xl"
>
Cancel
</button>

<button
onClick={createUser}
className="bg-[#032B38] text-white px-6 py-3 rounded-xl"
>
Create User
</button>

</div>

</div>

</div>

</div>

)}
    </div>

  );

}