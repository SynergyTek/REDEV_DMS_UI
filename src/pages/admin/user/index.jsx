
import { Table, Button} from "../../../components/";

const User = () => {
    return (
        <div>
            <Button className="mb-3"
                onClick={() => { alert("To be Added...")}}
                primary
                text="Create"
            />

            <Table
                actions={[
                    {
                      label: "View",
                      //icon: faEye,
                      onClick: (active) => {
                        router.push(
                          {
                            pathname: `/form/${active.name}`,
                            query: {
                              templateId: active.id,
                            },
                          },
                          `/form/${active.name}`,
                        );
                      },
                    },
                    {
                      label: "Edit",
                      // icon: faPencil,
                      onClick: (active) => {
                        router.push(`/template/manage/${active.id}`);
                      },
                    },
                    {
                      label: "Delete",
                      // icon: faTrash,
                      onClick: (active) => {
                        console.log("Delete");
                      },
                    },
                  ]}
                columns={[
                    {
                        field: 'id',
                        header: 'Actions'
                    },
                    {
                        field: 'Name',
                        header: 'Name'
                    },
                    {
                        field: 'Email',
                        header: 'Email'
                    },
                    {
                        field: 'JobTitle',
                        header: 'Job Title'
                    },
                    {
                        field: 'DepartmentName',
                        header: 'Department Name'
                    },
                    {
                        field: 'Status',
                        header: 'Status'
                    }
                ]}
                
                data={[
                    {
                        id: '1',
                        Name: 'John Doe',
                        Email: 'john.doe@example.com',
                        JobTitle: 'IT',
                        DepartmentName: 'Technology',
                        Status: 'Active'
                    },
                    {
                        id: '2',
                        Name: 'Jane Smith',
                        Email: 'jane.smith@example.com',
                        JobTitle: 'Civil Engineer',
                        DepartmentName: 'Construction',
                        Status: 'Active'
                    },
                    {
                        id: '3',
                        Name: 'Mike Johnson',
                        Email: 'mike.johnson@example.com',
                        JobTitle: 'HR Manager',
                        DepartmentName: 'Human Resources',
                        Status: 'Active'
                    },
                    {
                        id: '4',
                        Name: 'Emily Davis',
                        Email: 'emily.davis@example.com',
                        JobTitle: 'Sales Executive',
                        DepartmentName: 'Sales',
                        Status: 'Pending'
                    },
                    {
                        id: '5',
                        Name: 'William Brown',
                        Email: 'william.brown@example.com',
                        JobTitle: 'Mechanical Engineer',
                        DepartmentName: 'Engineering',
                        Status: 'Active'
                    },
                    {
                        id: '6',
                        Name: 'Olivia Miller',
                        Email: 'olivia.miller@example.com',
                        JobTitle: 'Software Developer',
                        DepartmentName: 'IT',
                        Status: 'Active'
                    },
                    {
                        id: '7',
                        Name: 'David Wilson',
                        Email: 'david.wilson@example.com',
                        JobTitle: 'Data Analyst',
                        DepartmentName: 'Data Science',
                        Status: 'Active'
                    },
                    {
                        id: '8',
                        Name: 'Sophia Moore',
                        Email: 'sophia.moore@example.com',
                        JobTitle: 'Project Manager',
                        DepartmentName: 'Operations',
                        Status: 'Pending'
                    },
                    {
                        id: '9',
                        Name: 'James Taylor',
                        Email: 'james.taylor@example.com',
                        JobTitle: 'Network Engineer',
                        DepartmentName: 'Networking',
                        Status: 'Active'
                    },
                    {
                        id: '10',
                        Name: 'Isabella Anderson',
                        Email: 'isabella.anderson@example.com',
                        JobTitle: 'Financial Analyst',
                        DepartmentName: 'Finance',
                        Status: 'Active'
                    },
                    {
                        id: '11',
                        Name: 'Michael Thomas',
                        Email: 'michael.thomas@example.com',
                        JobTitle: 'Bank Manager',
                        DepartmentName: 'Banking',
                        Status: 'Active'
                    },
                    {
                        id: '12',
                        Name: 'Emma Jackson',
                        Email: 'emma.jackson@example.com',
                        JobTitle: 'Consultant',
                        DepartmentName: 'Consulting',
                        Status: 'Pending'
                    },
                    {
                        id: '13',
                        Name: 'Alexander White',
                        Email: 'alexander.white@example.com',
                        JobTitle: 'Logistics Manager',
                        DepartmentName: 'Logistics',
                        Status: 'Active'
                    },
                    {
                        id: '14',
                        Name: 'Mia Harris',
                        Email: 'mia.harris@example.com',
                        JobTitle: 'Trader',
                        DepartmentName: 'Trading',
                        Status: 'Active'
                    },
                    {
                        id: '15',
                        Name: 'Daniel Clark',
                        Email: 'daniel.clark@example.com',
                        JobTitle: 'Customer Service',
                        DepartmentName: 'Support',
                        Status: 'Active'
                    },
                    {
                        id: '16',
                        Name: 'Amelia Lewis',
                        Email: 'amelia.lewis@example.com',
                        JobTitle: 'Cloud Architect',
                        DepartmentName: 'Cloud',
                        Status: 'Pending'
                    },
                    {
                        id: '17',
                        Name: 'Lucas Young',
                        Email: 'lucas.young@example.com',
                        JobTitle: 'Inventory Manager',
                        DepartmentName: 'Warehouse',
                        Status: 'Active'
                    },
                    {
                        id: '18',
                        Name: 'Charlotte King',
                        Email: 'charlotte.king@example.com',
                        JobTitle: 'Marketing Head',
                        DepartmentName: 'Marketing',
                        Status: 'Active'
                    },
                    {
                        id: '19',
                        Name: 'Henry Scott',
                        Email: 'henry.scott@example.com',
                        JobTitle: 'Product Designer',
                        DepartmentName: 'Design',
                        Status: 'Active'
                    },
                    {
                        id: '20',
                        Name: 'Ava Green',
                        Email: 'ava.green@example.com',
                        JobTitle: 'Actuary',
                        DepartmentName: 'Insurance',
                        Status: 'Pending'
                    }
                ]}
                
                primary
                text="Button"
            />
        </div>
    )
}

export default User;
