import React from 'react';

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your application settings</p>
        </div>

        {/* Settings Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">General Settings</h2>
          <p className="text-gray-600">Settings page content will be added here.</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
