import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from "~"; 

var gridColumns = [
  // { header: "Select", field: "select" },
  { header: "Service No", field: "ServiceNo", },
  { header: "Document Name", field: "NoteSubject", },
  { header: "Workflow Name",   field: "ServiceSubject", },
  { header: "Document Type", field: "TemplateName"},
  { header: "Status", field: "ServiceStatusName" },
  { header: "Owner User", field: "OwnerUser" },
  { header: "Start Date", field: "StartDate" },
  { header: "Due Date", field: "DueDate"},
  { header: "Created Date", field: "CreatedDate"},
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
      const inProgressResponse = await axios.get('/dmsapi/dms/query/GetInProgressServiceData?portalName=DMS&userId=45bba746-3309-49b7-9c03-b5793369d73c'); 
      const completedResponse = await axios.get('/dmsapi/dms/query/GetCompletedServiceData?portalName=DMS&userId=45bba746-3309-49b7-9c03-b5793369d73c');
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
            <Table data={inProgressData} columns={gridColumns}/>
          </div>
        )}
        {activeTab === 'completed' && (
          <div
            id="tabs-completed"
            role="tabpanel"
            className="transition-opacity duration-300 ease-in-out opacity-100">
            <Table data={completedData} columns={gridColumns}/>
          </div>
        )}
      </div>
    </div>
  );
}

export default ServiceList;

