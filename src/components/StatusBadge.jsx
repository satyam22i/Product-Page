import React from 'react';

const StatusBadge = ({ status }) => {
  const styles = {
    Draft: "bg-gray-100 text-gray-600",
    Submitted: "bg-blue-50 text-blue-600",
    Published: "bg-emerald-50 text-emerald-600",
  };

  return (
    <span className={`px-3 py-1.5 rounded-md text-xs font-semibold ${styles[status] || styles.Draft}`}>
      {status}
    </span>
  );
};

export default StatusBadge;