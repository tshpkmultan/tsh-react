export default function Rejected() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-red-600">
          Enrollment Rejected
        </h1>

        <p className="mt-4 text-gray-600">
          Your enrollment request has been rejected.
          Please contact the administrator.
        </p>
      </div>
    </div>
  );
}