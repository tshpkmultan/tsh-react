import { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckDouble } from "react-icons/fa";
import GoogleTranslate from "../../components/GoogleTranslate";

const Attendance = () => {

    const API = "https://800junkuae.online/tsh-api/API";

   const trainer = JSON.parse(
    localStorage.getItem("trainer")
);

    const [attendanceLocked, setAttendanceLocked] = useState(false);

    const [batches, setBatches] = useState([]);

    const [students, setStudents] = useState([]);

    const [individualStudents, setIndividualStudents] = useState([]);

    const [individualAttendance, setIndividualAttendance] = useState(null);

    const [batchId, setBatchId] = useState("");

    const [selectedStudent, setSelectedStudent] = useState("");

    const [date, setDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    useEffect(() => {

        fetchBatches();

        fetchIndividualStudents();

    }, []);

    /*
    ===========================================
    Fetch Digital Batches
    ===========================================
    */

    const fetchBatches = async () => {

        try {

            const res = await axios.get(

                `${API}/admin/digital_batches/list.php`,

                {

                    params: {

                        trainer_id: trainer._id

                    }

                }

            );

            if (res.data.success) {

                setBatches(res.data.batches || []);

            } else {

                setBatches([]);

            }

        } catch (error) {

            console.log(error);

            setBatches([]);

        }

    };

    /*
    ===========================================
    Fetch Batch Students
    ===========================================
    */

    const fetchStudents = async (batch_id) => {

        try {

            const res = await axios.get(

                `${API}/admin/digital_attendance/get_students.php`,

                {

                    params: {

                        batch_id,

                        trainer_id: trainer.id

                    }

                }

            );

            const data = (res.data.students || []).map(student => ({

                ...student,

                status: "present"

            }));

            setStudents(data);

        } catch (error) {

            console.log(error);

            setStudents([]);

        }

    };

    /*
    ===========================================
    Fetch Individual Students
    ===========================================
    */

    const fetchIndividualStudents = async () => {

        try {

            const res = await axios.get(

                `${API}/admin/digital_attendance/get_individual_students.php`,

                {

                    params: {

                        trainer_id: trainer.id

                    }

                }

            );

            if (res.data.success) {

                setIndividualStudents(
                    res.data.students || []
                );

            } else {

                setIndividualStudents([]);

            }

        } catch (error) {

            console.log(error);

            setIndividualStudents([]);

        }

    };

    /*
    ===========================================
    Check Batch Attendance
    ===========================================
    */

    const checkAttendanceStatus = async (

        batch_id,

        attendance_date

    ) => {

        try {

            const res = await axios.get(

                `${API}/admin/digital_attendance/check.php`,

                {

                    params: {

                        batch_id,

                        attendance_date

                    }

                }

            );

            setAttendanceLocked(

                res.data.submitted || false

            );

        } catch (error) {

            console.log(error);

            setAttendanceLocked(false);

        }

    };

    /*
    ===========================================
    Check Individual Attendance
    ===========================================
    */

    const checkIndividualAttendance = async (

        studentId,

        attendanceDate

    ) => {

        try {

            const res = await axios.get(

                `${API}/admin/digital_attendance/check_individual.php`,

                {

                    params: {

                        student_id: studentId,

                        attendance_date: attendanceDate

                    }

                }

            );

            setAttendanceLocked(

                res.data.submitted || false

            );

        } catch (error) {

            console.log(error);

            setAttendanceLocked(false);

        }

    };

    /*
    ===========================================
    Update Batch Status
    ===========================================
    */

    const updateStatus = (index, status) => {

        if (selectedStudent) {

            setIndividualAttendance(prev => ({

                ...prev,

                status

            }));

            return;

        }

        const updated = [...students];

        updated[index].status = status;

        setStudents(updated);

    };

    /*
    ===========================================
    Update Individual Status
    ===========================================
    */

    const updateIndividualStatus = (status) => {

        setIndividualAttendance({

            ...individualAttendance,

            status

        });

    };

    /*
    ===========================================
    Save Attendance
    ===========================================
    */

    const saveAttendance = async () => {

        try {

            if (selectedStudent && !batchId) {

                const res = await axios.post(

                    `${API}/admin/digital_attendance/save_individual.php`,

                    {

                        student_id: selectedStudent,

                        attendance_date: date,

                        status: individualAttendance.status

                    }

                );

                alert(res.data.message);

                return;

            }

            if (!batchId) {

                alert("Please Select Batch");

                return;

            }

            const res = await axios.post(

                `${API}/admin/digital_attendance/save.php`,

                {

                    batch_id: batchId,

                    attendance_date: date,

                    students

                }

            );

            alert(res.data.message);

        } catch (error) {

            console.log(error);

            alert("Failed To Save Attendance");

        }

    };

    const displayedStudents = batchId

        ? students

        : individualAttendance

        ? [individualAttendance]

        : [];
        return (

<div className="bg-gray-100 min-h-screen p-4 md:p-8">

<div className="flex justify-end mb-6">
    <GoogleTranslate />
</div>

<div className="bg-white rounded-3xl shadow overflow-hidden">

{/* ===================== HEADER ===================== */}

<div className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white p-8">

<h1 className="text-3xl font-bold">
Digital Attendance
</h1>

<p className="mt-2 text-blue-100">
Manage Batch & Individual Student Attendance
</p>

</div>

{/* ===================== FILTERS ===================== */}

<div className="p-6">

<div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">

{/* Batch */}

<div>

<label className="block font-semibold mb-2">

Select Batch

</label>

<select

value={batchId}

onChange={(e)=>{

const selectedBatch=e.target.value;

setBatchId(selectedBatch);

setSelectedStudent("");

setIndividualAttendance(null);

if(selectedBatch){

fetchStudents(selectedBatch);

checkAttendanceStatus(

selectedBatch,

date

);

}else{

setStudents([]);

setAttendanceLocked(false);

}

}}

className="w-full border rounded-xl p-3"

>

<option value="">

Select Batch

</option>

{

batches.map(batch=>(

<option

key={batch.id}

value={batch.id}

>

{batch.batch_name}

</option>

))

}

</select>

</div>

{/* Individual Student */}

<div>

<label className="block font-semibold mb-2">

Individual Student

</label>

<select

value={selectedStudent}

onChange={(e)=>{

const id=e.target.value;

setSelectedStudent(id);

setBatchId("");

setStudents([]);

if(id===""){

setIndividualAttendance(null);

setAttendanceLocked(false);

return;

}

const student =
individualStudents.find(
item => item.user_id.toString() === id
);

if(student){

setIndividualAttendance({

...student,

status:"present"

});

}

checkIndividualAttendance(

id,

date

);

}}

className="w-full border rounded-xl p-3"

>

<option value="">

Select Student

</option>

{

individualStudents.map(student=>(

<option
key={student.user_id}
value={student.user_id}
>

{student.full_name}

</option>

))

}

</select>

</div>

{/* Date */}

<div>

<label className="block font-semibold mb-2">

Attendance Date

</label>

<input

type="date"

value={date}

onChange={(e)=>{

const selectedDate=e.target.value;

setDate(selectedDate);

if(batchId){

checkAttendanceStatus(

batchId,

selectedDate

);

}

if(selectedStudent){

checkIndividualAttendance(

selectedStudent,

selectedDate

);

}

}}

className="w-full border rounded-xl p-3"

/>

</div>

{/* Save */}

<div className="flex items-end">

<button

onClick={saveAttendance}

disabled={attendanceLocked}

className={`

w-full

py-3

rounded-xl

font-bold

flex

items-center

justify-center

gap-3

transition

${attendanceLocked

?

"bg-gray-400 text-white cursor-not-allowed"

:

"bg-green-600 hover:bg-green-700 text-white"

}

`}

>

<FaCheckDouble/>

{

attendanceLocked

?

"Attendance Submitted"

:

"Save Attendance"

}

</button>

</div>

</div>

</div>

{/* ===================== TABLE HEADER ===================== */}

<div className="overflow-x-auto">

<table className="w-full">

<thead>

<tr className="bg-slate-800 text-white">

<th className="p-4 text-left">

#

</th>

<th className="p-4 text-left">

Student Name

</th>

<th className="p-4 text-center">

Attendance

</th>

</tr>

</thead>

<tbody>{displayedStudents.length === 0 ? (

<tr>

<td
colSpan="3"
className="text-center py-16 text-gray-500 text-lg"
>

No Students Found

</td>

</tr>

) : (

displayedStudents.map((student,index)=>(

<tr
key={student.id}
className="border-b hover:bg-gray-50 transition"
>

{/* ID */}

<td className="p-5 font-semibold">

{index+1}

</td>

{/* Student Name */}

<td className="p-5">

<div>

<h3 className="font-bold text-lg">

{student.full_name}

</h3>

<p className="text-sm text-gray-500">

{student.email}

</p>

</div>

</td>

{/* Attendance */}

<td className="p-5">

<div className="flex flex-wrap justify-center gap-4">

{/* Present */}

<label className="cursor-pointer">

<input

type="radio"

className="hidden"

name={`attendance-${student.id}`}

checked={
batchId
? student.status==="present"
: individualAttendance?.status==="present"
}

disabled={attendanceLocked}

onChange={()=>{

if(batchId){

updateStatus(index,"present");

}else{

updateIndividualStatus("present");

}

}}

/>

<div

className={`

px-6

py-3

rounded-xl

border

font-semibold

transition

${
(batchId
? student.status==="present"
: individualAttendance?.status==="present")

?

"bg-green-100 border-green-600 text-green-700"

:

"border-gray-300"

}

`}

>

Present

</div>

</label>

{/* Absent */}

<label className="cursor-pointer">

<input

type="radio"

className="hidden"

name={`attendance-${student.id}`}

checked={
batchId
? student.status==="absent"
: individualAttendance?.status==="absent"
}

disabled={attendanceLocked}

onChange={()=>{

if(batchId){

updateStatus(index,"absent");

}else{

updateIndividualStatus("absent");

}

}}

/>

<div

className={`

px-6

py-3

rounded-xl

border

font-semibold

transition

${
(batchId
? student.status==="absent"
: individualAttendance?.status==="absent")

?

"bg-red-100 border-red-600 text-red-700"

:

"border-gray-300"

}

`}

>

Absent

</div>

</label>

{/* Late */}

<label className="cursor-pointer">

<input

type="radio"

className="hidden"

name={`attendance-${student.id}`}

checked={
batchId
? student.status==="late"
: individualAttendance?.status==="late"
}

disabled={attendanceLocked}

onChange={()=>{

if(batchId){

updateStatus(index,"late");

}else{

updateIndividualStatus("late");

}

}}

/>

<div

className={`

px-6

py-3

rounded-xl

border

font-semibold

transition

${
(batchId
? student.status==="late"
: individualAttendance?.status==="late")

?

"bg-yellow-100 border-yellow-500 text-yellow-700"

:

"border-gray-300"

}

`}

>

Late

</div>

</label>

</div>

</td>

</tr>

))

)}

</tbody>

</table>

</div>

</div>

</div>

);

};

export default Attendance;