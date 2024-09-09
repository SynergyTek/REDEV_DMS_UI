import { useState, useEffect } from 'react';
import { Button, Table, Loader } from "~";
import axios from 'axios';
import { useRouter } from "next/router";
import {
	faPencil,
	faTrash,
} from "@awesome.me/kit-9b926a9ec0/icons/classic/regular";

const Workspace = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = '45bba746-3309-49b7-9c03-b5793369d73c'; 
                const portalName = 'DMS'; 
                const response = await axios.get(`https://demodms.aitalkx.com/webapi/dms/workspace/ReadDataGrid`, {
                    params: {
                        userId,
                        portalName
                    }
                });
                setData(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch data');
                setLoading(false);
            }
        };

        fetchData();
    }, []); 

    const onCreate = () => {
        alert("To be Added...");
    };

   const onEdit = (id, name) => {
		router.push(
			{
				pathname: "/masters/workspace/manageWorkspace",
				query: { id, name },
			},
			"/masters/workspace/manageWorkspace"
		);
	};

    if (loading) return <Loader/>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <Button 
                className="mb-3"
                onClick={onCreate}
                primary
                text="Create"
            />

            <Table
               rowId={"Id"}
					rowName={"Actions"}
					actions={[
						{
							icon: faPencil,
							label: "Edit",
							onClick: ({ id, name }) => onEdit(id, name),
						},
						{
							icon: faTrash,
							label: "Delete",
							onClick: () => {},
						},
					]}
                columns={[
                   
                    {
                        field: 'WorkspaceName',
                        header: 'Workspace Name'
                    },
                    {
                        field: 'ParentName',
                        header: 'Parent Name'
                    },
                    {
                        field: 'LegalEntityName',
                        header: 'Legal Entity Name'
                    },
                    {
                        field: 'CreatedbyName',
                        header: 'Created By Name'
                    }
                ]}
                data={data} 
                primary
                text="Button"
            />
        </div>
    );
}

export default Workspace;
