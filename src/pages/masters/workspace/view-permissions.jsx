import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Table, Loader } from "~";
import axios from 'axios';
import Head from 'next/head';

const ViewPermissions = () => {
    const [permissionsData, setPermissionsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { id } = router.query; 

    useEffect(() => {
        if (id) {
            const fetchPermissions = async () => {
                try {
                    const userId = '45bba746-3309-49b7-9c03-b5793369d73c';
                    const portalName = 'DMS';
                    const response = await axios.get(`/dmsapi/dms/query/GetPermissionOfWorkspace`, {
                        params:  { userId: userId, portalName: portalName, noteId: id }
                    });
                    setPermissionsData(response.data);
                    setLoading(false);
                } catch (err) {
                    setError('Failed to fetch permissions data');
                    setLoading(false);
                }
            };
            fetchPermissions();
        }
    }, [id]);

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;

    
    return (
        <div>
            <Head>Workspace Permissions</Head>
            <Table
                columns={[
                    {
                        field: 'PermissionType',
                        header: 'Type'
                    },
                    {
                        field: 'PermittedUserId',
                        header: 'User/Permission Group'
                    },
                    {
                        field: 'Access',
                        header: 'Access'
                    },
                    {
                        field: 'AppliesTo',
                        header: 'Applies To'
                    },
                    {
                        field: 'InheritedFrom',
                        header: 'Inherited From'
                    }
                ]}
                data={permissionsData}
            />
        </div>
    );
}

export default ViewPermissions;
