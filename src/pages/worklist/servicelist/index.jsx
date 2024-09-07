import { Button, Table } from "~";
import React, { useState } from 'react';
import { useRouter } from "next/router";

const services = {
  inProgress: [
    { serviceNo: 'S-23-07-2024-3', documentName: '24', workflowName: '24 - Approval Request', documentType: 'General Document', status: 'Overdue', ownerUser: 'Administrator', startDate: '23-07-2024', dueDate: '24-07-2024', createdDate: '23-07-2024 08:34:04' },
    // Add more rows as per your data...
  ],
  completed: [
    { serviceNo: 'S-05-08-2024-1', documentName: 'sample.pdf', workflowName: 'sample.pdf - Approval Request', documentType: 'General Document', status: 'Completed', ownerUser: 'Administrator', startDate: '05-08-2024', dueDate: '06-08-2024', createdDate: '05-08-2024 11:34:40' },
    // Add more rows as per your data...
  ]
};

function ServiceTabs() {
  const [activeTab, setActiveTab] = useState('inProgress');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="service-tabs-container">
      <div className="tabs">
        <Button
          mode={activeTab === 'inProgress' ? 'primary' : 'secondary'}
          text="In Progress"
          onClick={() => handleTabChange('inProgress')}
        />
        <Button
          mode={activeTab === 'completed' ? 'primary' : 'secondary'}
          text="Completed"
          onClick={() => handleTabChange('completed')}
        />
      </div>

      <div className="tab-content">
        {activeTab === 'inProgress' && <ServiceTable data={services.inProgress} />}
        {activeTab === 'completed' && <ServiceTable data={services.completed} />}
      </div>
    </div>
  );
}

function ServiceTable({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Select</th>
          <th>Service No</th>
          <th>Document Name</th>
          <th>Workflow Name</th>
          <th>Document Type</th>
          <th>Status</th>
          <th>Owner User</th>
          <th>Start Date</th>
          <th>Due Date</th>
          <th>Created Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td><input type="checkbox" /></td>
            <td>{row.serviceNo}</td>
            <td>{row.documentName}</td>
            <td>{row.workflowName}</td>
            <td>{row.documentType}</td>
            <td>{row.status}</td>
            <td>{row.ownerUser}</td>
            <td>{row.startDate}</td>
            <td>{row.dueDate}</td>
            <td>{row.createdDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ServiceTabs;
