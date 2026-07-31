import { useEffect, useState } from "react";

const DoctorManagement = () => {

  const [allUsers, setAllUsers] = useState([]);

  const [accounts, setAccounts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState(null);

  const [loginEmail, setLoginEmail] = useState("");

  const [loginPassword, setLoginPassword] = useState("");

  const [editId, setEditId] = useState(null);
const [showModal, setShowModal] = useState(false);
const [availableUsers, setAvailableUsers] = useState([]);
const [selectedStaff, setSelectedStaff] = useState(null);
const [newLogin, setNewLogin] = useState({
  name: "",
  role_type: "",
  login_email: "",
  login_password: "",
});
  /* =========================================
     FETCH USERS
  ========================================= */

  const fetchUsers = async () => {

  try {

    // DOCTORS
    const doctorsRes = await fetch(
      "https://800junkuae.online/tsh-api/API/doctors/get_doctors.php"
    );

    const doctorsText = await doctorsRes.text();

    console.log("Doctors API:", doctorsText);

    const doctorsData = JSON.parse(doctorsText);

    // TEACHERS
    const islamicRes = await fetch(
      "https://800junkuae.online/tsh-api/API/islamic/get_teachers.php"
    );

    const islamicText = await islamicRes.text();

    console.log("Teachers API:", islamicText);

    const islamicData = JSON.parse(islamicText);

    // TRAINERS
    const digitalRes = await fetch(
      "https://800junkuae.online/tsh-api/API/digital/get_trainers.php"
    );

    const digitalText = await digitalRes.text();

    console.log("Trainers API:", digitalText);

    const digitalData = JSON.parse(digitalText);

    const doctors = (doctorsData.data || []).map(
      (item) => ({
        id: item.id,
        name: item.name,
        role_type: "doctor",
      })
    );

    const islamic = (islamicData.teachers || []).map(
      (item) => ({
        id: item.id,
        name: item.name,
        role_type: "islamic_teacher",
      })
    );

    const digital = (digitalData.trainers || []).map(
      (item) => ({
        id: item.id,
        name: item.name,
        role_type: "digital_trainer",
      })
    );

    const merged = [
      ...doctors,
      ...islamic,
      ...digital,
    ];

    console.log("Merged Users:", merged);

    setAllUsers(merged);

  } catch (error) {

    console.error("Fetch Users Error:", error);

  } finally {

    setLoading(false);

  }
};
  /* =========================================
     FETCH LOGIN ACCOUNTS
  ========================================= */

  const fetchAccounts = async () => {

    try {

      const response = await fetch(
        "https://800junkuae.online/tsh-api/API/auth/manage-login.php"
      );

      const data = await response.json();

      setAccounts(
        data.accounts || []
      );

    } catch (error) {
console.log("Accounts:", data.accounts);
      console.log(error);
    }
  };

  /* =========================================
     CREATE / UPDATE LOGIN
  ========================================= */

  const createLogin = async () => {

    if (!selectedUser) {

      alert("Select User");

      return;
    }

    if (
      !loginEmail ||
      !loginPassword
    ) {

      alert("Fill all fields");

      return;
    }

    /* CHECK EXISTING LOGIN */

    const alreadyExists =
      accounts.find(

        (item) =>

          item.role_id ==
            selectedUser.id &&

          item.role_type ==
            selectedUser.role_type
      );

    if (
      alreadyExists &&
      !editId
    ) {

      alert(
        "This user already has login"
      );

      return;
    }

    try {

      const response = await fetch(

        "https://800junkuae.online/tsh-api/API/auth/manage-login.php",

        {
          method:
            editId
              ? "PUT"
              : "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            id: editId,

            role_type:
              selectedUser.role_type,

            role_id:
              selectedUser.id,

            name:
              selectedUser.name,

            login_email:
              loginEmail,

            login_password:
              loginPassword,
          }),
        }
      );

      const data =
        await response.json();

      alert(data.message);

      fetchAccounts();

      setLoginEmail("");

      setLoginPassword("");

      setSelectedUser(null);

      setEditId(null);

    } catch (error) {

      console.log(error);
    }
  };

  /* =========================================
     DELETE ACCOUNT
  ========================================= */

  const deleteAccount = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this account?"
      );

    if (!confirmDelete) return;

    try {

      const response = await fetch(

        "https://800junkuae.online/tsh-api/API/auth/manage-login.php",

        {
          method: "DELETE",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            id,
          }),
        }
      );

      const data =
        await response.json();

      alert(data.message);

      fetchAccounts();

    } catch (error) {

      console.log(error);
    }
  };

  /* =========================================
     EDIT ACCOUNT
  ========================================= */

 const editAccount = (item) => {

  setShowModal(true);

  setEditId(item.id);

  const staff = {
    id: item.role_id,
    name: item.name,
    role_type: item.role_type,
  };

  setSelectedStaff(staff);

  setNewLogin({
    role_type: item.role_type,
    login_email: item.login_email,
    login_password: "",
  });

};

  /* =========================================
     LOAD DATA
  ========================================= */

  useEffect(() => {

    fetchUsers();

    fetchAccounts();

  }, []);
const createModalLogin = async () => {

  if (!selectedStaff) {
    alert("Select Staff Member");
    return;
  }

  if (
    !newLogin.login_email ||
    !newLogin.login_password
  ) {
    alert("Fill all fields");
    return;
  }

  try {

    const response = await fetch(
      "https://800junkuae.online/tsh-api/API/auth/manage-login.php",
      {
        method: editId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
  id: editId,
  role_id: selectedStaff.id,
  role_type: selectedStaff.role_type,
  name: selectedStaff.name,
  login_email: newLogin.login_email,
  login_password: newLogin.login_password,
}),
      }
    );

    const data = await response.json();

    alert(data.message);

    fetchAccounts();

    setShowModal(false);

    setSelectedStaff(null);

    setAvailableUsers([]);
setEditId(null);
    setNewLogin({
      role_type: "",
      login_email: "",
      login_password: "",
    });

  } catch (error) {

    console.log(error);

  }
};
  return (

    <div className="p-5 md:p-10 bg-[#F4F7FE] min-h-screen">

      {/* PAGE TITLE */}
      <div className="mb-10 flex justify-between items-center">

  <div>
    <h1 className="text-4xl md:text-5xl font-black text-[#082C3B]">
      Login Management
    </h1>

    <p className="text-gray-500 mt-2">
      Manage login credentials for all staff
    </p>
  </div>

  <button
    onClick={() => setShowModal(true)}
    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-bold"
  >
    + Add New Login
  </button>

</div>

      {/* LOADING */}
      {loading ? (

        <div className="text-2xl font-bold">

          Loading...

        </div>

      ) : (

        <div className="grid lg:grid-cols-2 gap-8">

          {/* STAFF LIST */}
          <div className="bg-white rounded-3xl p-6 shadow">

            <h2 className="text-2xl font-bold mb-6">

              All Staff

            </h2>

            <div className="space-y-4 max-h-[650px] overflow-y-auto">

              {allUsers.map((user) => (

                <div
                  key={`${user.role_type}-${user.id}`}

                  onClick={() =>
                    setSelectedUser(user)
                  }

                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    selectedUser?.id === user.id
                      ? "bg-[#082C3B] text-white border-[#082C3B]"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >

                  <h3 className="text-xl font-bold">

                    {user.name}

                  </h3>

                  <p className="mt-1 text-sm">

                    {user.role_type}

                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* CREATE LOGIN */}
          <div className="bg-white rounded-3xl p-6 shadow">

            <h2 className="text-2xl font-bold mb-6">

              {editId
                ? "Edit Login"
                : "Create Login"}

            </h2>

            {!selectedUser ? (

              <div className="text-gray-500">

                Select any staff member

              </div>

            ) : (

              <>

                {/* USER INFO */}
                <div className="mb-6">

                  <h3 className="text-2xl font-black">

                    {selectedUser.name}

                  </h3>

                  <p className="text-gray-500 mt-1">

                    {selectedUser.role_type}

                  </p>

                </div>

                {/* EMAIL */}
                <div className="mb-5">

                  <label className="font-semibold block mb-2">

                    Login Email

                  </label>

                  <input
                    type="email"

                    value={loginEmail}

                    onChange={(e) =>
                      setLoginEmail(
                        e.target.value
                      )
                    }

                    className="w-full border rounded-2xl p-4 outline-none"

                    placeholder="Enter Email"
                  />

                </div>

                {/* PASSWORD */}
                <div className="mb-6">

                  <label className="font-semibold block mb-2">

                    Password

                  </label>

                  <input
                    type="password"

                    value={loginPassword}

                    onChange={(e) =>
                      setLoginPassword(
                        e.target.value
                      )
                    }

                    className="w-full border rounded-2xl p-4 outline-none"

                    placeholder="Enter Password"
                  />

                </div>

                {/* BUTTON */}
                <button
                  onClick={createLogin}

                  className="w-full bg-[#082C3B] hover:bg-[#0B3B50] text-white py-4 rounded-2xl font-bold text-lg transition-all"
                >

                  {editId
                    ? "Update Login"
                    : "Create Login"}

                </button>

              </>

            )}

          </div>

        </div>

      )}

      {/* LOGIN ACCOUNTS */}
      <div className="bg-white rounded-3xl p-6 shadow mt-10 overflow-x-auto">

        <h2 className="text-2xl font-bold mb-6">

          Login Accounts

        </h2>

        <table className="w-full min-w-[900px]">

          <thead>

            <tr className="border-b bg-gray-50">

              <th className="text-left p-4">
                Name
              </th>

              <th className="text-left p-4">
                Role
              </th>

              <th className="text-left p-4">
                Email
              </th>

              <th className="text-left p-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {accounts.map((item) => (

              <tr
                key={item.id}
                className="border-b"
              >

                <td className="p-4">
                  {item.name}
                </td>

                <td className="p-4">
                  {item.role_type}
                </td>

                <td className="p-4">
                  {item.login_email}
                </td>

                <td className="p-4 flex gap-3">

                  {/* EDIT */}
                  <button
                    onClick={() =>
                      editAccount(item)
                    }

                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
                  >

                    Edit

                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() =>
                      deleteAccount(item.id)
                    }

                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                  >

                    Delete

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
{showModal && (
<div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">

  <div className="bg-white w-full max-w-3xl rounded-[32px] shadow-2xl overflow-hidden">

    {/* Header */}
    <div className="bg-gradient-to-r from-[#082C3B] to-[#0B3B50] px-6 md:px-8 py-5 flex justify-between items-center">

      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Add Staff Login
        </h2>

        <p className="text-blue-100 text-sm mt-1">
          Create secure login credentials for staff members
        </p>
      </div>

      <button
        onClick={() => setShowModal(false)}
        className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white text-xl flex items-center justify-center"
      >
        ✕
      </button>

    </div>

    {/* Body */}
    <div className="p-6 md:p-8 max-h-[75vh] overflow-y-auto">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Role */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Role
          </label>

          <select
            value={newLogin.role_type}
            onChange={(e) => {

              const role = e.target.value;

              setSelectedStaff(null);

              setNewLogin({
                ...newLogin,
                role_type: role,
              });

              const filteredUsers = allUsers.filter((user) => {

                if (user.role_type !== role) return false;

                const hasLogin = accounts.some(
                  (acc) =>
                    String(acc.role_id) === String(user.id) &&
                    String(acc.role_type) === String(user.role_type)
                );

                return !hasLogin;

              });

              setAvailableUsers(filteredUsers);

            }}
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#082C3B]"
          >
            <option value="">
              Select Role
            </option>

            <option value="doctor">
              Doctor
            </option>

            <option value="islamic_teacher">
              Islamic Teacher
            </option>

            <option value="digital_trainer">
              Digital Trainer
            </option>
          </select>
        </div>

        {/* Staff */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Staff Member
          </label>

          <select
            value={selectedStaff?.id || ""}
            onChange={(e) => {

              const staff = availableUsers.find(
                (u) => String(u.id) === String(e.target.value)
              );

              setSelectedStaff(staff);

            }}
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#082C3B]"
          >
            <option value="">
              Select Staff Member
            </option>

            {availableUsers.map((user) => (
              <option
                key={`${user.role_type}-${user.id}`}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Login Email
          </label>

          <input
            type="email"
            value={newLogin.login_email}
            onChange={(e) =>
              setNewLogin({
                ...newLogin,
                login_email: e.target.value,
              })
            }
            placeholder="staff@example.com"
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#082C3B]"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Password
          </label>

          <input
            type="password"
            value={newLogin.login_password}
            onChange={(e) =>
              setNewLogin({
                ...newLogin,
                login_password: e.target.value,
              })
            }
            placeholder="Enter secure password"
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#082C3B]"
          />
        </div>

      </div>

      {/* Selected Staff Preview */}
      {selectedStaff && (

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-5">

          <h4 className="font-bold text-[#082C3B] mb-2">
            Selected Staff
          </h4>

          <p className="text-gray-700">
            <strong>Name:</strong> {selectedStaff.name}
          </p>

          <p className="text-gray-700 mt-1">
            <strong>Role:</strong>{" "}
            {selectedStaff.role_type.replace("_", " ")}
          </p>

        </div>

      )}

      {/* Footer Buttons */}
      <div className="flex flex-col md:flex-row gap-4 mt-8">

        <button
          onClick={() => setShowModal(false)}
          className="w-full md:w-auto px-8 py-3 rounded-2xl border border-gray-300 font-semibold hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          onClick={createModalLogin}
          className="flex-1 bg-gradient-to-r from-[#082C3B] to-[#0B3B50] hover:opacity-90 text-white py-3 rounded-2xl font-bold text-lg shadow-lg"
        >
          {editId ? "Update Login" : "Create Login Account"}
        </button>

      </div>

    </div>

  </div>

</div>

)}
    </div>
  );
};

export default DoctorManagement;