const Results = () => {
  const results = [
    {
      id: 1,
      student: "Ali Raza",
      course: "Web Development",
      marks: 88,
    },
    {
      id: 2,
      student: "Ahmed Khan",
      course: "Graphic Design",
      marks: 92,
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Results</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th>ID</th>
              <th>Student</th>
              <th>Course</th>
              <th>Marks</th>
            </tr>
          </thead>

          <tbody>
            {results.map((result) => (
              <tr key={result.id} className="border-b">
                <td className="py-3">{result.id}</td>
                <td>{result.student}</td>
                <td>{result.course}</td>
                <td>{result.marks}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Results;