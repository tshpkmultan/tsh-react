import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
export default function Appointments() {

  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);
const [selectedAppointment, setSelectedAppointment] = useState(null);

const [showModal, setShowModal] = useState(false);
/* =========================================
   EDIT APPOINTMENT
========================================= */

const [showEditModal, setShowEditModal] = useState(false);

const [editData, setEditData] = useState({

    id: "",

    doctor_id: "",

    appointment_date: "",

    appointment_slot: "",

    appointment_type: "",

    status: "",

    payment_status: "",

    payment_amount: "",

    admin_notes: "",

    doctor_notes: "",

    meet_link: "",

    payment_receipt: null,

    reports: []

});
/* =========================================
   OPEN EDIT MODAL
========================================= */

const openEditModal = (appointment) => {

    setEditData({

        id: appointment.id,

        doctor_id: appointment.doctor_id,

        appointment_date: appointment.appointment_date,

        appointment_slot: appointment.appointment_slot,

        appointment_type: appointment.appointment_type,

        status: appointment.status,

        payment_status: appointment.payment_status,

        payment_amount: appointment.payment_amount,

        admin_notes: appointment.admin_notes || "",

        doctor_notes: appointment.doctor_notes || "",

        meet_link: appointment.meet_link || "",

        payment_receipt: null,

        reports: []

    });

    setShowEditModal(true);

};

const closeEditModal = () => {

    setShowEditModal(false);

};
/* =========================================
   HANDLE CHANGE
========================================= */

const handleEditChange = (e) => {

    const { name, value } = e.target;

    setEditData((prev) => ({

        ...prev,

        [name]: value

    }));

};
/* =========================================
   PAYMENT RECEIPT
========================================= */

const handleReceipt = (e) => {

    setEditData((prev) => ({

        ...prev,

        payment_receipt: e.target.files[0]

    }));

};

/* =========================================
   MEDICAL REPORTS
========================================= */

const handleReports = (e) => {

    setEditData((prev) => ({

        ...prev,

        reports: Array.from(e.target.files)

    }));

};
  /* =========================================
     GET APPOINTMENTS
  ========================================= */

  useEffect(() => {

    fetchAppointments();

  }, []);

  const fetchAppointments = async () => {

    try {

      const res = await axios.get(
        "https://800junkuae.online/tsh-api/API/admin/patient/get_appointments.php"
      );

      if (res.data.status === "success") {

        setAppointments(res.data.data);
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };
/* =========================================
   DELETE APPOINTMENT
========================================= */

const deleteAppointment = async (id) => {

    const result = await Swal.fire({

        title: "Delete Appointment?",

        text: "This action cannot be undone.",

        icon: "warning",

        showCancelButton: true,

        confirmButtonColor: "#dc2626",

        cancelButtonColor: "#6b7280",

        confirmButtonText: "Yes, Delete",

        cancelButtonText: "Cancel"

    });

    if (!result.isConfirmed) {

        return;

    }

    try {

        const formData = new FormData();

        formData.append("id", id);

        const res = await axios.post(

            "https://800junkuae.online/tsh-api/API/patient/delete_appointment.php",

            formData

        );

        if (res.data.status === "success") {

            Swal.fire({

                icon: "success",

                title: "Deleted!",

                text: "Appointment deleted successfully.",

                timer: 1800,

                showConfirmButton: false

            });

            fetchAppointments();

        } else {

            Swal.fire({

                icon: "error",

                title: "Error",

                text: res.data.message

            });

        }

    } catch (error) {

        console.log(error);

        Swal.fire({

            icon: "error",

            title: "Server Error",

            text: "Unable to delete appointment."

        });

    }

};
/* =========================================
   VIEW APPOINTMENT
========================================= */

const openViewModal = (appointment) => {

    setSelectedAppointment(appointment);

    setShowModal(true);

};

const closeViewModal = () => {

    setShowModal(false);

    setSelectedAppointment(null);

};
/* =========================================
   UPDATE APPOINTMENT
========================================= */

const updateAppointment = async (

    appointmentId,

    status,

    paymentStatus

) => {

    try {

        const res = await axios.post(

            "https://800junkuae.online/tsh-api/API/admin/patient/update_appointment_status.php",

            {

                appointment_id: appointmentId,

                status,

                payment_status: paymentStatus

            }

        );

        if (res.data.status === "success") {

            successAlert(res.data.message);

            fetchAppointments();

        } else {

            successAlert(res.data.message);

        }

    } catch (error) {

        console.log(error);

        errorAlert("Something went wrong.");

    }

};
/* =========================================
   SAVE APPOINTMENT
========================================= */

const saveAppointment = async () => {

    try {

        const formData = new FormData();

        formData.append("id", editData.id);

        formData.append("doctor_id", editData.doctor_id);

        formData.append("appointment_date", editData.appointment_date);

        formData.append("appointment_slot", editData.appointment_slot);

        formData.append("appointment_type", editData.appointment_type);

        formData.append("status", editData.status);

        formData.append("payment_status", editData.payment_status);

        formData.append("payment_amount", editData.payment_amount);

        formData.append("admin_notes", editData.admin_notes);

        formData.append("doctor_notes", editData.doctor_notes);

        formData.append("meet_link", editData.meet_link);

        if (editData.payment_receipt) {

            formData.append(
                "payment_receipt",
                editData.payment_receipt
            );

        }

        editData.reports.forEach((file) => {

            formData.append(
                "reports[]",
                file
            );

        });

        const res = await axios.post(

            "https://800junkuae.online/tsh-api/API/admin/patient/update_appointment.php",

            formData,

            {

                headers: {

                    "Content-Type": "multipart/form-data"

                }

            }

        );

        if (res.data.status === "success") {

            successAlert(res.data.message);

            closeEditModal();

            fetchAppointments();

        } else {
successAlert(res.data.message);

        }

    } catch (err) {

        console.log(err);

        errorAlert("Update Failed");

    }

};
/* =========================================
   SUCCESS ALERT
========================================= */

const successAlert = (message) => {

    Swal.fire({

        icon: "success",

        title: "Success",

        text: message,

        confirmButtonColor: "#032B38",

        timer: 2000,

        showConfirmButton: false

    });

};

/* =========================================
   ERROR ALERT
========================================= */

const errorAlert = (message) => {

    Swal.fire({

        icon: "error",

        title: "Oops...",

        text: message,

        confirmButtonColor: "#dc2626"

    });

};

/* =========================================
   WARNING ALERT
========================================= */

const warningAlert = (message) => {

    Swal.fire({

        icon: "warning",

        title: "Warning",

        text: message,

        confirmButtonColor: "#f59e0b"

    });

};
  return (

   <div className="w-full p-4 md:p-8">

      {/* TITLE */}
      <div className="flex items-center justify-between mb-10">

        <h1 className="text-2xl md:text-5xl font-black text-[#032B38]">
          Appointments Management
        </h1>

        <div className="bg-[#032B38] text-white px-6 py-3 rounded-2xl font-bold">
          Total: {appointments.length}
        </div>

      </div>

      {/* LOADING */}
      {loading ? (

        <div className="text-2xl font-bold">
          Loading...
        </div>

      ) : (
<div className="w-full overflow-hidden">

  <div className="overflow-x-auto rounded-3xl shadow-lg bg-white">

    <table className="w-full whitespace-nowrap">

            <thead className="bg-[#032B38] text-white">

<tr>

<th className="p-5">ID</th>

<th className="p-5">Patient</th>

<th className="p-5">Doctor</th>

<th className="p-5">Phone</th>

<th className="p-5">Disease</th>

<th className="p-5">Appointment</th>

<th className="p-5">Fee</th>

<th className="p-5">Payment</th>

<th className="p-5">Receipt</th>

<th className="p-5">Reports</th>

<th className="p-5">Type</th>

<th className="p-5">Status</th>

<th className="p-5 text-center">

Actions

</th>

</tr>

</thead>

           <tbody>

{appointments.map((item)=>(

<tr
key={item.id}
className="border-b hover:bg-gray-50"
>

<td className="p-5 font-bold">

#{item.id}

</td>

<td className="p-5">

{item.full_name}

</td>

<td className="p-5">

{item.doctor_name}

</td>

<td className="p-5">

{item.phone}

</td>

<td className="p-5">

{item.disease}

</td>

<td className="p-5">

<div>

{item.appointment_date}

</div>

<div className="text-sm text-gray-500">

{item.appointment_slot}

</div>

</td>

<td className="p-5">

Rs. {item.payment_amount}

</td>

<td className="p-5">

<span className={`px-3 py-2 rounded-xl text-white

${

item.payment_status==="Approved"

?

"bg-green-600"

:

item.payment_status==="Rejected"

?

"bg-red-600"

:

"bg-yellow-500"

}

`}>

{item.payment_status}

</span>

</td>

<td className="p-5">

{

item.payment_receipt

?

<a

href={`https://800junkuae.online/tsh-api/${item.payment_receipt}`}

target="_blank"

rel="noopener noreferrer"

className="bg-blue-600 text-white px-4 py-2 rounded-lg"

>

View

</a>

:

<span>No Receipt</span>

}

</td>

<td className="p-5">

{

item.reports?.length>0

?

item.reports.map((report,index)=>(

<a

key={index}

href={`https://800junkuae.online/tsh-api/${report.report_file}`}

target="_blank"

rel="noopener noreferrer"

className="block bg-indigo-600 text-white px-3 py-2 rounded-lg mb-2"

>

Report {index+1}

</a>

))

:

<span>No Reports</span>

}

</td>

<td className="p-5">

{item.appointment_type}

</td>

<td className="p-5">

<span className={`px-3 py-2 rounded-xl text-white

${

item.status==="Approved"

?

"bg-green-600"

:

item.status==="Rejected"

?

"bg-red-600"

:

item.status==="Completed"

?

"bg-blue-600"

:

"bg-yellow-500"

}

`}>

{item.status}

</span>

</td>

<td className="p-5">

<div className="flex flex-wrap gap-2 justify-center">

{/* VIEW */}

<button
className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold shadow-md transition-all duration-300 hover:scale-105"
onClick={() => openViewModal(item)}
>
👁 View
</button>

{/* APPROVE */}

<button
className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition-all duration-300 hover:scale-105"
onClick={() =>
updateAppointment(
item.id,
"Approved",
"Verified"
)
}
>
✓ Approve
</button>

{/* REJECT */}

<button
className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md transition-all duration-300 hover:scale-105"
onClick={() =>
updateAppointment(
item.id,
"Rejected",
"Rejected"
)
}
>
✕ Reject
</button>

{/* COMPLETE */}

<button
className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition-all duration-300 hover:scale-105"
onClick={() =>
updateAppointment(
item.id,
"Completed",
"Verified"
)
}
>
✔ Complete
</button>

{/* DELETE */}

<button
className="px-4 py-2 rounded-xl bg-gray-700 hover:bg-black text-white font-semibold shadow-md transition-all duration-300 hover:scale-105"
onClick={() => deleteAppointment(item.id)}
>
🗑 Delete
</button>

</div>

</td>

</tr>

))}

</tbody>
          </table>
</div>
        </div>

      )}
      {/* =========================================
   EDIT APPOINTMENT MODAL
========================================= */}

{showEditModal && (

<div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-6">

<div className="bg-white rounded-3xl w-full max-w-6xl max-h-[92vh] overflow-y-auto shadow-2xl">

{/* Header */}

<div className="sticky top-0 bg-white border-b px-8 py-5 flex justify-between items-center rounded-t-3xl">

<h2 className="text-3xl font-black text-[#032B38]">

✏ Edit Appointment

</h2>

<button

onClick={closeEditModal}

className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-bold transition-all"

>

✕

</button>

</div>

<div className="p-8">

<div className="grid md:grid-cols-2 gap-6">

{/* Appointment Date */}

<div>

<label className="font-bold text-slate-600">

Appointment Date

</label>

<input

type="date"

name="appointment_date"

value={editData.appointment_date}

onChange={handleEditChange}

className="w-full mt-2 border rounded-xl p-4"

/>

</div>

{/* Appointment Time */}

<div>

<label className="font-bold text-slate-600">

Appointment Time

</label>

<input

type="text"

name="appointment_slot"

value={editData.appointment_slot}

onChange={handleEditChange}

className="w-full mt-2 border rounded-xl p-4"

/>

</div>

{/* Appointment Type */}

<div>

<label className="font-bold">

Appointment Type

</label>

<select

name="appointment_type"

value={editData.appointment_type}

onChange={handleEditChange}

className="w-full mt-2 border rounded-xl p-4"

>

<option value="First Visit">

First Visit

</option>

<option value="Follow Up">

Follow Up

</option>

</select>

</div>

{/* Appointment Status */}

<div>

<label className="font-bold">

Appointment Status

</label>

<select

name="status"

value={editData.status}

onChange={handleEditChange}

className="w-full mt-2 border rounded-xl p-4"

>

<option value="Pending">

Pending

</option>

<option value="Approved">

Approved

</option>

<option value="Rejected">

Rejected

</option>

<option value="Completed">

Completed

</option>

</select>

</div>

{/* Payment Status */}

<div>

<label className="font-bold">

Payment Status

</label>

<select

name="payment_status"

value={editData.payment_status}

onChange={handleEditChange}

className="w-full mt-2 border rounded-xl p-4"

>

<option value="Pending">

Pending

</option>

<option value="Verified">

Verified

</option>

<option value="Rejected">

Rejected

</option>

</select>

</div>

{/* Fee */}

<div>

<label className="font-bold">

Consultation Fee

</label>

<input

type="number"

name="payment_amount"

value={editData.payment_amount}

onChange={handleEditChange}

className="w-full mt-2 border rounded-xl p-4"

/>

</div>

{/* Google Meet */}

<div className="md:col-span-2">

<label className="font-bold">

Google Meet Link

</label>

<input

type="text"

name="meet_link"

value={editData.meet_link}

onChange={handleEditChange}

placeholder="https://meet.google.com/..."

className="w-full mt-2 border rounded-xl p-4"

/>

</div>

{/* Admin Notes */}

<div className="md:col-span-2">

<label className="font-bold">

Admin Notes

</label>

<textarea

rows={4}

name="admin_notes"

value={editData.admin_notes}

onChange={handleEditChange}

className="w-full mt-2 border rounded-xl p-4"

/>

</div>

{/* Doctor Notes */}

<div className="md:col-span-2">

<label className="font-bold">

Doctor Notes

</label>

<textarea

rows={4}

name="doctor_notes"

value={editData.doctor_notes}

onChange={handleEditChange}

className="w-full mt-2 border rounded-xl p-4"

/>

</div>

{/* Payment Receipt */}

<div className="md:col-span-2">

<label className="font-bold">

Replace Payment Receipt

</label>

<input

type="file"

onChange={handleReceipt}

className="w-full mt-2 border rounded-xl p-4"

/>

</div>

{/* Medical Reports */}

<div className="md:col-span-2">

<label className="font-bold">

Upload Medical Reports

</label>

<input

type="file"

multiple

onChange={handleReports}

className="w-full mt-2 border rounded-xl p-4"

/>

</div>

</div>

{/* Footer */}

<div className="flex justify-end gap-4 mt-10">

<button

onClick={closeEditModal}

className="px-8 py-4 rounded-xl bg-gray-500 text-white font-bold"

>

Cancel

</button>

<button

onClick={saveAppointment}

className="px-8 py-4 rounded-xl bg-[#032B38] text-white font-bold"

>

💾 Save Changes

</button>

</div>

</div>

</div>

</div>

)}
{showModal && selectedAppointment && (

<div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6">

<div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-7xl h-[96vh] sm:max-h-[92vh] overflow-y-auto shadow-2xl">

{/* Header */}

<div className="sticky top-0 bg-white border-b px-4 sm:px-8 py-4 sm:py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 rounded-t-2xl sm:rounded-t-3xl">
<div>

<h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#032B38]">

Patient Appointment Details

</h2>

<p className="text-slate-500">

Appointment #{selectedAppointment.id}

</p>

</div>

<div className="flex flex-wrap gap-3 w-full sm:w-auto">

<button
onClick={() => {
    closeViewModal();
    openEditModal(selectedAppointment)
}}
className="flex-1 sm:flex-none bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-xl font-bold transition-all"
>
✏ Edit
</button>

<button
onClick={closeViewModal}
className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-bold transition-all"
>
✕ Close
</button>

</div>

</div>

<div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">

{/* Patient */}

<div className="bg-slate-50 rounded-2xl p-4 sm:p-6">

<h3 className="text-xl sm:text-2xl font-bold text-[#032B38] mb-5">

👤 Patient Information

</h3>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">

<div><strong>Name</strong><br />{selectedAppointment.full_name}</div>

<div><strong>Father Name</strong><br />{selectedAppointment.father_name}</div>

<div><strong>Age</strong><br />{selectedAppointment.age}</div>

<div><strong>Gender</strong><br />{selectedAppointment.gender}</div>

<div><strong>Blood Group</strong><br />{selectedAppointment.blood_group}</div>

<div><strong>Disease</strong><br />{selectedAppointment.disease}</div>

<div><strong>Phone</strong><br />{selectedAppointment.phone}</div>

<div><strong>WhatsApp</strong><br />{selectedAppointment.whatsapp}</div>

<div><strong>Email</strong><br />{selectedAppointment.email}</div>

<div><strong>City</strong><br />{selectedAppointment.city}</div>

<div><strong>Country</strong><br />{selectedAppointment.country}</div>

<div><strong>Address</strong><br />{selectedAppointment.address}</div>

</div>

<div className="mt-5">

<strong>Medical History</strong>

<div className="mt-2 bg-white p-4 rounded-xl border">

{selectedAppointment.medical_history || "No history available"}

</div>

</div>

</div>

{/* Doctor */}

<div className="bg-blue-50 rounded-2xl p-6">

<h3 className="text-xl sm:text-2xl font-bold text-[#032B38] mb-5">

🩺 Doctor Information

</h3>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">

<div><strong>Doctor</strong><br />{selectedAppointment.doctor_name}</div>

<div><strong>Specialization</strong><br />{selectedAppointment.specialization}</div>

<div><strong>Hospital</strong><br />{selectedAppointment.hospital}</div>

</div>

</div>

{/* Appointment */}

<div className="bg-green-50 rounded-2xl p-6">

<h3 className="text-xl sm:text-2xl font-bold text-[#032B38] mb-5">

📅 Appointment

</h3>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">

<div><strong>Date</strong><br />{selectedAppointment.appointment_date}</div>

<div><strong>Time</strong><br />{selectedAppointment.appointment_slot}</div>

<div><strong>Type</strong><br />{selectedAppointment.appointment_type}</div>

<div><strong>Status</strong><br />{selectedAppointment.status}</div>

</div>

</div>

{/* Payment */}

<div className="bg-yellow-50 rounded-2xl p-6">

<h3 className="text-xl sm:text-2xl font-bold text-[#032B38] mb-5">

💳 Payment Information

</h3>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">

<div>

<strong>Amount</strong>

<br />

Rs. {selectedAppointment.payment_amount}

</div>

<div>

<strong>Status</strong>

<br />

{selectedAppointment.payment_status}

</div>

<div>

<strong>Receipt</strong>

<br />

{

selectedAppointment.payment_receipt ?

<a

href={`https://800junkuae.online/tsh-api/${selectedAppointment.payment_receipt}`}

target="_blank"

rel="noopener noreferrer"

className="text-blue-600 underline"

>

View Receipt

</a>

:

"No Receipt"

}

</div>

</div>

</div>

{/* Reports */}

<div className="bg-purple-50 rounded-2xl p-6">

<h3 className="text-xl sm:text-2xl font-bold text-[#032B38] mb-5">

📄 Medical Reports

</h3>

{

selectedAppointment.reports?.length>0 ?

<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

{

selectedAppointment.reports.map((report,index)=>(

<a

key={index}

href={`https://800junkuae.online/tsh-api/${report.report_file}`}

target="_blank"

rel="noopener noreferrer"

className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-5 py-4 text-center font-bold transition-all"
>

View Report {index+1}

</a>

))

}

</div>

:

<div className="text-red-500">

No Medical Reports Uploaded

</div>

}

</div>

</div>

</div>

</div>

)}
    </div>
  );
}