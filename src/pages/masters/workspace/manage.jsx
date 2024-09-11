import { Loader } from "~";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ManageWorkspace = () => {
    const router = useRouter();
    const { id } = router.query;
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = '45bba746-3309-49b7-9c03-b5793369d73c';
                const portalName = 'DMS';
                const apiUrl = `/dmsapi/dms/workspace/Create`;

                const params = id
                    ? { userId: userId, portalName: portalName, workspaceId: id }
                    : { userId: userId, portalName: portalName };

                const response = await axios.get(apiUrl, { params });
                setFormData(response.data);
            } catch (error) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (field, value) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const apiUrl = `/dmsapi/dms/workspace/Manage`;
            await axios.post(apiUrl, formData);
            router.push('/masters/workspace');
        } catch (error) {
            console.error("Failed to submit the form", error);
        }
    };

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;

    return (
        <form onSubmit={handleSubmit}>
            <InputField
                id="workspaceName"
                label="Workspace Name"
                type="text"
                placeholder="Enter workspace name"
                required
                value={formData.workspaceName}
                onChange={(value) => handleChange('workspaceName', value)}
            />
            <InputField
                id="parentWorkspace"
                label="Parent Workspace"
                type="text"
                placeholder="Enter parent workspace"
                value={formData.parentWorkspace}
                onChange={(value) => handleChange('parentWorkspace', value)}
            />
            <InputField
                id="documentType"
                label="Document Type"
                type="text"
                placeholder="Enter document type"
                value={formData.documentType}
                onChange={(value) => handleChange('documentType', value)}
            />
            <InputField
                id="legalEntity"
                label="Legal Entity"
                type="text"
                placeholder="Enter legal entity"
                required
                value={formData.legalEntity}
                onChange={(value) => handleChange('legalEntity', value)}
            />
            <InputField
                button={{ text: 'Submit', type: 'submit' }}
            />
        </form>
    );
};

export default ManageWorkspace;
