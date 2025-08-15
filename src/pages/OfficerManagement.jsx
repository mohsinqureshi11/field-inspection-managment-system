import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { officerAPI } from "../api/axios.js";

const OfficerManagement = () => {
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const navigate = useNavigate();

  // Fetch officers from backend
  useEffect(() => {
    fetchOfficers();
  }, []);

  const fetchOfficers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await officerAPI.getAllOfficers();
      if (res.success) {
        setOfficers(res.data);
      } else {
        setError("Failed to fetch officers");
      }
    } catch (error) {
      console.error("Failed to fetch officers", error);
      setError("Failed to fetch officers");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOfficer = async (officerId, officerName) => {
    if (!window.confirm(`Are you sure you want to delete officer "${officerName}"?`)) {
      return;
    }

    try {
      setDeleteLoading(officerId);
      // TODO: Add delete API call here when backend is ready
      // const res = await officerAPI.deleteOfficer(officerId);
      
      // For now, just remove from local state
      setOfficers(prev => prev.filter(officer => officer._id !== officerId));
      
      // Show success message
      alert(`Officer "${officerName}" deleted successfully!`);
    } catch (error) {
      console.error("Failed to delete officer", error);
      alert("Failed to delete officer. Please try again.");
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleAddNewOfficer = () => {
    navigate('/onboarding');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading officers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchOfficers}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Officer Management</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage all officers in the system</p>
        </div>

        {/* Officer Management Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Officer List</h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  View and manage all officers
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium rounded-full">
                  {officers.length} Officers
                </span>
                <button
                  onClick={fetchOfficers}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
                  title="Refresh"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Officers List */}
          <div className="p-4 sm:p-6">
            {officers.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <div className="text-gray-400 text-4xl sm:text-6xl mb-4">👥</div>
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No Officers Found</h3>
                <p className="text-sm sm:text-base text-gray-600">There are no officers in the system yet.</p>
              </div>
            ) : (
              <div className="grid gap-3 sm:gap-4">
                {officers.map((officer, index) => (
                  <div
                    key={officer._id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-0">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-lg">
                          {officer.userName ? officer.userName.charAt(0).toUpperCase() : "O"}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate">
                          {officer.userName || "Unknown Officer"}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">
                          ID: {officer._id}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Added: {new Date().toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleDeleteOfficer(officer._id, officer.userName)}
                        disabled={deleteLoading === officer._id}
                        className="px-3 sm:px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed transition flex items-center space-x-1 sm:space-x-2 text-sm"
                      >
                        {deleteLoading === officer._id ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                            <span>Deleting...</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span>Delete</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">System Information</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between">
                <span className="text-sm sm:text-base text-gray-600">Total Officers:</span>
                <span className="font-medium">{officers.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm sm:text-base text-gray-600">System Status:</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs sm:text-sm rounded-full">Active</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Quick Actions</h3>
            <div className="space-y-2 sm:space-y-3">
              <button 
                onClick={handleAddNewOfficer}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
              >
                Add New Officer
              </button>
              <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-sm sm:text-base">
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficerManagement;
