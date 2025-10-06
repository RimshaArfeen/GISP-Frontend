import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [studentData, setStudentData] = useState([]);

  // Fetch Student Data
  const getStudentData = async () => {
    try {
      const response = await fetch("${window.location.origin}/adminPg");
      if (!response.ok) {
        throw new Error("Error while fetching data");
      }
      const result = await response.json();
      setStudentData(result.studentData || []);
    } catch (error) {
      console.error("Couldn't fetch data:", error);
    }
  };

  // Update Status
  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`api/adminPg/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Error updating status");
      }

      const updatedStudent = await response.json();

      // Optimistically update UI
      setStudentData((prevData) =>
        prevData.map((student) =>
          student._id === id ? { ...student, status } : student
        )
      );
    } catch (error) {
      console.error("Couldn't update status:", error);
    }
  };

  // Fetch Data on Mount
  useEffect(() => {
    getStudentData();
  }, []);

  return (
    <section className="text-custom body-font py-28">
      {studentData.length > 0 ? (
        <div className="w-full px-5 flex flex-wrap -mx-4 -my-8">
          {studentData.map((student) => (
            <div key={student._id} className="py-8 px-4 w-full md:w-1/2 lg:w-1/3 mx-auto">
              <div className="h-full flex flex-col border-2 border-gray-200 p-6 rounded-lg shadow-md bg-white">
                <h2 className=" w-fit text-indigo-500 text-xs font-medium tracking-widest mb-2 uppercase">
                  Student Information
                <div className=" w-full h-[2px] rounded-full my-2 bg-amber-600"></div>
                </h2>
                <div className="space-y-2 text-sm text-custom mb-4">
                  <p className="flex justify-between flex-col md:flex-row">
                    <span className="font-medium text-gray-900">Name:</span>
                    <span className=" text-custom">{student.name || "N/A"}</span>
                  </p>
                  <p className="flex justify-between flex-col md:flex-row">
                    <span className="font-medium text-gray-900">Father's Name:</span>
                    <span className=" text-custom">{student.Fathersname || "N/A"}</span>
                  </p>
                  <p className="flex justify-between flex-col md:flex-row">
                    <span className="font-medium text-gray-900">Email:</span>
                    <span className=" text-custom">{student.email || "N/A"}</span>
                  </p>
                  <p className="flex justify-between flex-col md:flex-row">
                    <span className="font-medium text-gray-900">Percentage:</span>
                    <span className=" text-custom">{student.percentage || "N/A"} %</span>
                  </p>
                  <p className="flex flex-col">
                    <span className="font-medium text-gray-900">Choosed Faculty:</span>
                    <span  className=" ml-auto">{student.lowEligibilityField || student.mediumEligibilityField || student.highEligibilityField || "N/A"} </span>
                  </p>
                  <p className="flex justify-between flex-col md:flex-row">
                    <span className="font-medium text-gray-900">Country:</span>
                    <span className=" text-custom">{student.country || "N/A"}</span>
                  </p>
                  <p className="flex justify-between flex-col md:flex-row">
                    <span className="font-medium text-gray-900">Status:</span>
                    <span className={`font-semibold ${student.status === "Approved" ? "text-green-600" : "text-red-600"}`}>
                      {student.status || "Pending"}
                    </span>
                  </p>
                </div>

                <div className="mt-6 flex space-x-4">
                  <button
                    onClick={() => updateStatus(student._id, "Approved")}
                    className={` w-full md:w-1/2 uppercase font-bold py-2 px-4 rounded transition-all ${
                      student.status === "Approved" || student.status === "Rejected"
                        ? "bg-gray-400 text-custom cursor-not-allowed"
                        : "bg-green-700 hover:bg-green-600 text-white"
                    }`}
                  >
                    {student.status === "Approved" ? (
                      "Approved"
                    ): "Approve"
                  }
                  </button>
                  <button
                    onClick={() => updateStatus(student._id, "Rejected")}
                    disabled = {student.status === "Approved" || student.status === "Rejected" }
                    className={` w-full md:w-1/2 uppercase font-bold py-2 px-4 rounded transition-all ${
                      student.status === "Approved" || student.status === "Rejected"
                        ? "bg-gray-400 text-custom cursor-not-allowed"
                        : "bg-red-700 hover:bg-red-600 text-white"
                    }`}
                  >
                    {student.status === "Rejected" ? (
                      "Rejected"
                    ): "Reject"
                  }
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full mx-auto my-auto text-3xl text-center">
          No applications here
        </div>
      )}
    </section>
  );
};

export default AdminDashboard;
