import { InputField, Select, Button, Notification } from "~";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";

export default function ManageUser() {
    const router = useRouter();
    const { id = null, name = null } = router.query;
    const [btnStatus, setBtnStatus] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [errorNotificaton, setErrorNotification] = useState(false);
    const [status, setStatus] = useState(1);
    const [legalEntityIds, setLegalEntityIds] = useState();
    const [userRole, setUserRole] = useState();
    const [portal, setPortal] = useState();
    const [lineManagerId, setLineManagerId] = useState();
    const [sponsorId, setSponsorId] = useState();
    const [userGroupId, setUserGroupId] = useState();
    const [isSystemAdmin, setIsSystemAdmin] = useState(false);

    const StatusRef = useRef();
    const LegalEntityIdsRef = useRef();
    const UserRoleRef = useRef();
    const PortalRef = useRef();
    const LineManagerIdRef = useRef();
    const SponsorIdRef = useRef();
    const UserGroupIdRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submit")
        if (!e.target.checkValidity()) {
            return
        }
        const formElements = e.target.elements;

        const formValues = {
            CREATEDBY: "45bba746-3309-49b7-9c03-b5793369d73c",
            COMPANYID: "5e44cd63-68f0-41f2-b708-0eb3bf9f4a72",
            LEGALENTITYID: "60d2df036755e8de168d8db7",
            PORTALID: "6ea64b17-6959-4cb8-a5d2-33728aebbbac",
            LEGALENTITYIDS: [
                "60d2df036755e8de168d8db7"
            ],
            Portal: [
                "6EA64B17-6959-4CB8-A5D2-33728AEBBBAC"
            ],
            isSystemAdmin: isSystemAdmin,
            Status:status,
            //UserGroupId:userGroupId,
            //SponsorId:sponsorId,
            //LineManagerId:lineManagerId,
            // Portal:portal,
            // UserRole:userRole,
            // LegalEntityIds:legalEntityIds

        };
        if (id) {
            formValues["Id"] = id;
            formValues["dataAction"] = 2;
        } else {
            formValues["dataAction"] = 1;
        }
        // if(status !== "Active"){ 
        //     formValues["Status"] = 2;
        // }

        for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i];
            if (element.name) {
                if (element.value) {

                    formValues[element.name] = element.value;
                }
            }
        }
        console.log(formValues, " form manage user")
        try {
            setBtnStatus(true);
            const response = await axios.post("/dmsapi/portalAdmin/User/NewManagePortalUser", formValues);
            e.target.reset();
            setBtnStatus(false);
            console.log(response, " manage user form")
            if (response.data?.success) {
                handleNotification(setShowNotification);
            } else {
                handleNotification(setErrorNotification);
                console.log("Something went wrong!");
            }
        } catch (error) {
            console.error('Error posting data:', error);
            handleNotification(setErrorNotification);
            setBtnStatus(false);
        }

    };
    const handleNotification = (setterFunction) => {
        setterFunction(true);
        setTimeout(() => {
            setterFunction(false);
            router.push("/admin/user/");
        }, 1000);
    };
    return (
        <div className="w-full flex flex-col items-center relative">
            {showNotification && (
                <div className="absolute top-4 mt-20 right-4 z-50">
                    <Notification
                        heading={"Success"}
                        text={"successfull!"}
                        type={"success"}
                    />
                </div>
            )}
            {errorNotificaton && (
                <div className="absolute top-4 mt-20 right-4 z-50">
                    <Notification
                        heading={"Error"}
                        text={"Something went wrong!"}
                        type={"danger"}
                    />
                </div>
            )}

            <Head>
                <title>Manage User</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="text-white text-2xl mb-2 mt-6">Manage User</div>

            <form onSubmit={handleSubmit} className="w-full max-w-3xl">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center -mx-2">
                        <div className="w-full md:w-2/3 lg:w-1/2 px-2 mb-4">
                            <InputField
                                id="NAME"
                                label="Name"
                                type="text"
                                primary
                                required
                                name="NAME"
                            />
                        </div>

                        <div className="w-full md:w-2/3 lg:w-1/2 px-2 mb-4">
                            <InputField
                                id="USERID"
                                label="Display Name"
                                type="text"
                                primary
                                name="USERID"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center -mx-2">
                        <div className="w-full md:w-2/3 lg:w-1/2 px-2 mb-4">
                            <InputField
                                id="EMAIL"
                                label="Email"
                                type="email"
                                primary
                                required
                                name="EMAIL"
                                pattern="\b[A-Za-z0-9]+(?:[._%+-][A-Za-z0-9]+)*@[A-Za-z0-9]+(?:[-][A-Za-z0-9]+)*\.[A-Za-z]{2,}\b"

                            />
                        </div>

                        <div className="w-full md:w-2/3 lg:w-1/2 px-2 mb-4">
                            <InputField
                                id="Mobile"
                                label="Mobile No"
                                type="number"
                                primary
                                name="Mobile"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center -mx-2">
                        <div className="w-full md:w-2/3 lg:w-1/2 px-2 mb-4">
                            <InputField
                                id="JobTitle"
                                label="Job Title"
                                type="text"
                                primary
                                name="JobTitle"
                            />
                        </div>

                        <div className="w-full md:w-2/3 lg:w-1/2 px-2 mb-4">
                            <InputField
                                id="Address"
                                label="Address"
                                type="text"
                                primary
                                name="Address"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center -mx-2">
                        <div className="w-full md:w-2/3 lg:w-1/2 px-2 mb-4">
                            <InputField
                                id="DepartmentName"
                                label="Department Name"
                                type="text"
                                primary
                                name="DepartmentName"
                            />
                        </div>

                        <div className="w-full md:w-2/3 lg:w-1/2 px-2 mb-4">
                            <InputField
                                id="MobileDeviceToken"
                                label="Mobile Device Token"
                                type="text"
                                primary
                                name="MobileDeviceToken"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center -mx-2">
                        <div className="w-full md:w-2/3 lg:w-1/2 px-2 mb-4">
                            <label htmlFor="Status">Status</label>
                            <Select
                                source="/dmsapi/cms/query/GetEnumIdNameList?enumType=StatusEnum"
                                map={{ key: "Id", value: "Name" }}
                                name="Status"
                                ref={StatusRef}
                                onSelect={() =>
                                    setStatus(
                                        StatusRef.current?.getAttribute("value")
                                    )
                                }
                            />
                        </div>

                        <div className="w-full md:w-2/3 lg:w-1/2 px-2 mb-4">

                            <label htmlFor="Status">LegalEntityIds</label>
                            <Select
                                source="/dmsapi/cms/user/GetLegalEntitiesList"
                                map={{ key: "Id", value: "Name" }}
                                name="LegalEntityIds"//multi s required
                                ref={LegalEntityIdsRef}
                                onSelect={() =>
                                    setLegalEntityIds(
                                        LegalEntityIdsRef.current?.getAttribute("value")
                                    )
                                }
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center -mx-2">
                        <div className="w-full md:w-2/3 lg:w-1/2 px-2 mb-4">

                            <label htmlFor="Status">UserRole</label>
                            <Select
                                source="/dmsapi/cms/user/GetUserRoleList"
                                map={{ key: "Id", value: "Name" }}
                                name="UserRole"//multi s required
                                ref={UserRoleRef}
                                onSelect={() =>
                                    setUserRole(
                                        UserRoleRef.current?.getAttribute("value")
                                    )
                                }
                            />
                        </div>

                        <div className="w-full md:w-2/3 lg:w-1/2 px-2 mb-4">

                            <label htmlFor="Status">Portal</label>
                            <Select
                                source="/dmsapi/portalAdmin/User/GetPortalForUser"
                                map={{ key: "Id", value: "Name" }}
                                name="Portal"
                                ref={PortalRef}
                                onSelect={() =>
                                    setPortal(
                                        PortalRef.current?.getAttribute("value")
                                    )
                                }
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center -mx-2">
                        <div className="w-full md:w-2/3 lg:w-1/2 px-2 mb-4">
                            <label htmlFor="Status">Test</label>
                            <Select
                                source="/dmsapi/cms/user/GetUserIdNameList"
                                map={{ key: "Id", value: "Name" }}
                                name="LineManagerId"
                                ref={LineManagerIdRef}
                                onSelect={() =>
                                    setLineManagerId(
                                        LineManagerIdRef.current?.getAttribute("value")
                                    )
                                }
                            />
                        </div>

                        <div className="w-full md:w-2/3 lg:w-1/2 px-2 mb-4">

                            <label htmlFor="Status">Portal</label>
                            <Select
                                source="/dmsapi/cms/query/GetLOVIdNameList?lovType=HR_SPONSOR"
                                map={{ key: "Id", value: "Name" }}
                                name="SponsorId"
                                ref={SponsorIdRef}
                                onSelect={() =>
                                    setSponsorId(
                                        SponsorIdRef.current?.getAttribute("value")
                                    )
                                }
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center -mx-2">
                        <div className="w-full md:w-2/3 lg:w-1/2 px-2 mb-4">
                            <InputField
                                id="files_PhotoId"
                                label="files Photo Id"
                                type="file"
                                primary
                                name="files_PhotoId"
                            />
                        </div>

                        <div className="w-full md:w-2/3 lg:w-1/2 px-2 mb-4">
                            <InputField
                                id="SignatureId"
                                label="file id"
                                type="file"
                                primary
                                name="SignatureId"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center -mx-2">
                        <div className="w-full md:w-2/3 lg:w-1/2 px-2 mb-4">

                            <Select
                                source="/dmsapi/portalAdmin/User/GetUserGroupIdNameList"
                                map={{ key: "Id", value: "Name" }}
                                name="UserGroupId"//multi s required
                                ref={UserGroupIdRef}
                                onSelect={() =>
                                    setUserGroupId(
                                        UserGroupIdRef.current?.getAttribute("value")
                                    )
                                }
                            />
                        </div>

                        {/* <div className="w-full md:w-2/3 lg:w-1/2 px-2 mb-4">
                            <InputField
                                id="IsSystemAdmin"
                                label="Is System Admin"
                                type="checkbox"
                                primary
                                name="IsSystemAdmin"

                            />
                        </div> */}
                    </div>

                    <div className="flex flex-wrap justify-center mt-3 gap-4">
                        <Button type="submit" className="mb-3" primary text="Save" disabled={btnStatus} />
                        <Button
                            type="button"
                            className="mb-3"
                            text="Cancel"
                            onClick={() =>
                                router.push("/admin/user/")
                            }
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
