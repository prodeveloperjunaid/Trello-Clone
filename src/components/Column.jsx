import React from "react";

const Column = ({ title, children }) => {
  return (
    <div className="bg-[#f4f4f4] p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default Column;