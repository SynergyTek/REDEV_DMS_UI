import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from "~"; 


const services = {
  InProgress: [
    { ServiceNo: 'S-23-07-2024-3', NoteSubject: '24', ServiceSubject: '24 - Approval Request', TemplateName: 'General Document', ServiceStatusName: 'Overdue', OwnerUser: 'Administrator', StartDate: '23-07-2024', DueDate: '24-07-2024', CreatedDate: '23-07-2024 08:34:04' },
    { ServiceNo: 'S-23-07-2024-3', NoteSubject: '24', ServiceSubject: '24 - Approval Request', TemplateName: 'General Document', ServiceStatusName: 'Overdue', OwnerUser: 'Administrator', StartDate: '23-07-2024', DueDate: '24-07-2024', CreatedDate: '23-07-2024 08:34:04' },
    { ServiceNo: 'S-23-07-2024-3', NoteSubject: '24', ServiceSubject: '24 - Approval Request', TemplateName: 'General Document', ServiceStatusName: 'Overdue', OwnerUser: 'Administrator', StartDate: '23-07-2024', DueDate: '24-07-2024', CreatedDate: '23-07-2024 08:34:04' },
    { ServiceNo: 'S-23-07-2024-3', NoteSubject: '24', ServiceSubject: '24 - Approval Request', TemplateName: 'General Document', ServiceStatusName: 'Overdue', OwnerUser: 'Administrator', StartDate: '23-07-2024', DueDate: '24-07-2024', CreatedDate: '23-07-2024 08:34:04' },
    // Add more rows as per your data...
  ],
  Completed: [
    { ServiceNo: 'S-05-08-2024-1', NoteSubject: 'sample.pdf', ServiceSubject: 'sample.pdf - Approval Request', TemplateName: 'General Document', ServiceStatusName: 'Completed', OwnerUser: 'Administrator', StartDate: '05-08-2024', DueDate: '06-08-2024', CreatedDate: '05-08-2024 11:34:40' },
    { ServiceNo: 'S-05-08-2024-1', NoteSubject: 'sample.pdf', ServiceSubject: 'sample.pdf - Approval Request', TemplateName: 'General Document', ServiceStatusName: 'Completed', OwnerUser: 'Administrator', StartDate: '05-08-2024', DueDate: '06-08-2024', CreatedDate: '05-08-2024 11:34:40' },
    { ServiceNo: 'S-05-08-2024-1', NoteSubject: 'sample.pdf', ServiceSubject: 'sample.pdf - Approval Request', TemplateName: 'General Document', ServiceStatusName: 'Completed', OwnerUser: 'Administrator', StartDate: '05-08-2024', DueDate: '06-08-2024', CreatedDate: '05-08-2024 11:34:40' },
    { ServiceNo: 'S-05-08-2024-1', NoteSubject: 'sample.pdf', ServiceSubject: 'sample.pdf - Approval Request', TemplateName: 'General Document', ServiceStatusName: 'Completed', OwnerUser: 'Administrator', StartDate: '05-08-2024', DueDate: '06-08-2024', CreatedDate: '05-08-2024 11:34:40' },
    { ServiceNo: 'S-05-08-2024-1', NoteSubject: 'sample.pdf', ServiceSubject: 'sample.pdf - Approval Request', TemplateName: 'General Document', ServiceStatusName: 'Completed', OwnerUser: 'Administrator', StartDate: '05-08-2024', DueDate: '06-08-2024', CreatedDate: '05-08-2024 11:34:40' },
    // Add more rows as per your data...
  ]
};

var gridColumns = [
  { header: "Select", field: "select", template: "<input type='checkbox' class='select-checkbox' data-id='#= ServiceId #' />", width: 50 },
 
  { 
      header: "Service No", 
      field: "ServiceNo", 
      width: 180, 
      template: function (dataItem) {
          var statusClass = "";
          if (dataItem.ServiceStatusCode === "SERVICE_STATUS_INPROGRESS") {
              statusClass = "inprogress";
          } else if (dataItem.ServiceStatusCode === "SERVICE_STATUS_OVERDUE") {
              statusClass = "overdue";
          }
          return `<span class="chip ${statusClass}">${dataItem.ServiceNo}</span>`;
      }
  },
  { 
      header: "Document Name", 
      field: "NoteSubject", 
      width: 250, 
      template: function (dataItem) {
          return `<span class="clickable" onclick="openDocument('${dataItem.NoteId}', '${dataItem.NoteTemplateCode}', '${dataItem.PortalId}')">${dataItem.NoteSubject}</span>`;
      }
  },
  { 
      header: "Workflow Name", 
      field: "ServiceSubject", 
      width: 300, 
      wrapText: true, 
      autoHeight: true, 
      template: function (dataItem) {
          return `<span class="clickable" onclick="openService('${dataItem.ServiceId}', '${dataItem.TemplateCode}', '${dataItem.PortalId}')">${dataItem.ServiceSubject}</span>`;
      }
  },
  { header: "Document Type", field: "TemplateName", width: 250 },
  { header: "Status", field: "ServiceStatusName", width: 120 },
  { header: "Owner User", field: "OwnerUser", width: 150 },
  { header: "Start Date", field: "StartDate", format: "{0:dd-MM-yyyy}", width: 140 },
  { header: "Due Date", field: "DueDate", format: "{0:dd-MM-yyyy}", width: 140 },
  { header: "Created Date", field: "CreatedDate", format: "{0:dd-MM-yyyy HH:mm:ss}", width: 180 },
];



function ServiceList() {
  const [activeTab, setActiveTab] = useState('inProgress');

  const [inProgressData, setInProgressData] = useState([]);
  const [completedData, setCompletedData] = useState([]);
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const inProgressResponse = await axios.get('/api/inprogress'); // replace with your API endpoint
      const completedResponse = await axios.get('/api/completed'); // replace with your API endpoint
      setInProgressData(inProgressResponse.data);
      setCompletedData(completedResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

 

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full">
      <ul className="flex dark:border-gray-700 mb-5" role="tablist">
        <li role="presentation">
          <Button
            mode={activeTab === 'inProgress' ? 'primary' : 'secondary'}
            text="In Progress"
            onClick={() => handleTabChange('inProgress')}
          />
        </li>
        <li role="presentation" className="ml-3">
          <Button
            mode={activeTab === 'completed' ? 'primary' : 'secondary'}
            text="Completed"
            onClick={() => handleTabChange('completed')}
          />
        </li>
      </ul>

      {/* Tabs content */}
      <div className="tab-content mb-6">
        {activeTab === 'inProgress' && (
          <div
            id="tabs-in-progress"
            role="tabpanel"
            className="transition-opacity duration-300 ease-in-out opacity-100">
            <Table data={services.InProgress} columns={gridColumns}/>
          </div>
        )}
        {activeTab === 'completed' && (
          <div
            id="tabs-completed"
            role="tabpanel"
            className="transition-opacity duration-300 ease-in-out opacity-100">
            <Table data={services.Completed} columns={gridColumns}/>
          </div>
        )}
      </div>
    </div>
  );
}

export default ServiceList;

