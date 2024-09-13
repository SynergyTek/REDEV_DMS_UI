import { Loader, InputField, Button, Select } from "~";
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ManageWorkspace = () => {
    const router = useRouter();
    const { id } = router.query;
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userReference = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = '45bba746-3309-49b7-9c03-b5793369d73c';
                const portalName = 'DMS';
                const apiUrl = `/dmsapi/dms/workspace/CreateWorkspace`;

                const params = id
                    ? { userId: userId, portalName: portalName, workspaceId: id }
                    : { userId: userId, portalName: portalName };

                const response = await axios.get(apiUrl, { params });
                response.data.OwnerUserId = userId
                response.data.PortalName = portalName
                // console.log(response.data)
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
            const apiUrl = `/dmsapi/dms/workspace/ManageWorkspace`;
            await axios.post(apiUrl, formData);
            router.push('/masters/workspace/');
        } catch (error) {
            console.error("Failed to submit the form", error);
        }
    };

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;

    return (

        <div className="w-full flex flex-col items-center">
            <div className="text-white text-2xl mb-2 mt-6">Manage Workspace</div>
            <form onSubmit={handleSubmit} className="w-4/5 max-w-lg flex flex-col">
                <div className="mx-auto my-auto w-96">
                    <div>
                        <div className="mt-6">
                            <InputField
                                id="WorkspaceName"
                                label="Workspace Name"
                                type="text"
                                required
                                value={formData.WorkspaceName}
                                onChange={(value) => handleChange('WorkspaceName', value)}
                            />
                        </div>
                        <div className="mt-6">
                            <InputField
                                id="ParentNoteId"
                                label="Parent Workspace"
                                type="text"
                                value={formData.ParentNoteId}
                                onChange={(value) => handleChange('ParentNoteId', value)}
                            />
                        </div>
                        <div className="mt-6">
                            <InputField
                                id="DocumentTypeId"
                                label="Document Type"
                                type="text"
                                value={formData.DocumentTypeId}
                                onChange={(value) => handleChange('DocumentTypeId', value)}
                            />
                        </div>
                        <div className="mt-6">
                            <Select
                                id="LegalEntityId"
                                label="Legal Entity"
                                type="text"
                                required
                                className="w-full"
                                variant="outline"
                                source={"/dmsapi/cms/legalEntity/GetLegalEntityList"}
                                map={{
                                    key: "Id",
                                    value: "Name",
                                }}
                                ref={userReference}
                            />
                        </div>
                    </div>
                    <div className="flex mt-3 gap-4 justify-start">

                        <Button type="submit" className="mb-3" primary text="Save" />
                        <Button type="button" className="mb-3" text="Cancel" onClick={(e) => router.push(
                            {
                                pathname: "/masters/workspace/"
                            },
                            "/masters/workspace/"
                        )} />
                    </div>
                </div>
            </form >
        </div >
    );
};

export default ManageWorkspace;
