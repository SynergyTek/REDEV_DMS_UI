import { useState, useEffect } from 'react';
import { Button, Table, Loader } from "~";
import axios from 'axios';
import { useRouter } from "next/router";
import {
    faPencil,
    faTrash, faLock
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
                const response = await axios.get(`/dmsapi/dms/workspace/ReadDataGrid`, {
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
        router.push(
            {
                pathname: "/masters/workspace/manage",
            },
            "/masters/workspace/manage"
        );
    };

    const onEdit = (id) => {
        router.push(
            {
                pathname: "/masters/workspace/manage",
                query: { id },
            },
            "/masters/workspace/manage"
        );
    };

    const onDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this workspace?"+ id);
        if (isConfirmed) {
            try {
                setLoading(true);
                await axios.delete(`/dmsapi/dms/workspace/DeleteWorkspace?NoteId=${id}`);
                setData(data.filter(item => item.Id !== id)); 
            } catch (error) {
                alert("Failed to delete workspace");
            } finally {
                setLoading(false);
            }
        }
    };
    const onViewPermission = (id, name) => {
        router.push(
            {
                pathname: "/masters/workspace/view-permissions",
                query: { id, name },
            },
            "/masters/workspace/view-permissions"
        );
    };



    if (loading) return <Loader />;
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
                        icon: faLock,
                        label: "View Permissions",
                        onClick: ({ id }) => onViewPermission(id),
                    },
                    {
                        icon: faPencil,
                        label: "Edit",
                        onClick: ({ id }) => onEdit(id),
                    },
                    {
                        icon: faTrash,
                        label: "Delete",
                        onClick: ({ id }) => onDelete(id),
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
