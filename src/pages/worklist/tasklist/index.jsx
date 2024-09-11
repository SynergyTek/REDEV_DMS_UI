import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from "~";

const columnDefs = [
    {
        field: 'OwnerUserName',
        header: 'Owner User Name'
    },
    {
        field: 'AssigneeDisplayName',
        header: 'Assignee Display Name'
    },
    {
        field: 'NoteSubject',
        header: 'Note Subject'
    },
    {
        field: 'TemplateName',
        header: 'Template Name'
    },
    {
        field: 'TaskSubject',
        header: 'Task Subject'
    },
    {
        field: 'TaskNo',
        header: 'Task Number'
    },
    {
        field: 'TaskStatusName',
        header: 'Task Status Name'
    },
    {
        field: 'DisplayStartDate',
        header: 'Start Date'
    },
    {
        field: 'DisplayDueDate',
        header: 'Due Date'
    },
    {
        field: 'DisplayActualStartDate',
        header: 'Actual Start Date'
    },
    {
        field: 'DisplayActualEndDate',
        header: 'Actual End Date'
    }
];



function TaskList() {

    const [inProgressTaskData, setInProgressTaskData] = useState([]);
    const [completedTaskData, setCompletedTaskData] = useState([]);
    const [activeTab, setActiveTab] = useState('inProgress');
    const [selectedServiceIds, setSelectedServiceIds] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const inProgressResponse = await axios.get('/dmsapi/dms/query/ReadTaskDataInProgressDMS?portalName=DMS&userId=45bba746-3309-49b7-9c03-b5793369d73c');
            const completedResponse = await axios.get('/dmsapi/dms/query/ReadTaskDataCompletedDMS?portalName=DMS&userId=45bba746-3309-49b7-9c03-b5793369d73c');
            setInProgressTaskData(inProgressResponse.data);
            setCompletedTaskData(completedResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="w-full mt-2">
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
                        <Table data={inProgressTaskData} columns={columnDefs} />
                    </div>
                )}
                {activeTab === 'completed' && (
                    <div
                        id="tabs-completed"
                        role="tabpanel"
                        className="transition-opacity duration-300 ease-in-out opacity-100">
                        <Table data={completedTaskData} columns={columnDefs} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default TaskList;

