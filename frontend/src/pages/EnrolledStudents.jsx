import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";


  const EnrollmentTable = () => {
    const location=useLocation();
    const enrolledStudents=location.state.value;
    console.log("enrolledStudents",enrolledStudents);
    return (
        <>
        <Navbar/>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Enrolled Students</h1>
  
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-2 px-4 border">Student Name</th>
                <th className="py-2 px-4 border">Course Name</th>
              </tr>
            </thead>
            <tbody>
              {enrolledStudents.length > 0 ? (
                enrolledStudents.map((enrollment, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border">{enrollment.userName}</td>
                    <td className="py-2 px-4 border">{enrollment.courseName}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="py-2 px-4 border text-center">No enrollments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      </>
    );
  };
  
  export default EnrollmentTable;