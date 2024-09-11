import { InputField, Select, Button, Notification } from "~";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";

export default function ChangePassword() {
    const router = useRouter();
    const { id = null, name = null } = router.query;
    const [btnStatus, setBtnStatus] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [errorNotificaton, setErrorNotification] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submit")
        if (!e.target.checkValidity()) {
            return
        }
        const formElements = e.target.elements;
        if (!id) {
            //alert("Invailid Id")
            console.log("Id is missing");
        }
        const formValues = {
            userId: id,
            currentPassword: name
        };

        for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i];
            if (element.name) {
                formValues[element.name] = element.value;
            }
        }

        try {
            setBtnStatus(true);
            const response = await axios.post("/dmsapi/portalAdmin/User/ChangePasswordPage", formValues);
            e.target.reset();
            setBtnStatus(false);
        
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
        <div className="w-full flex flex-col items-center">
            {showNotification && (
                <div className="absolute mt-20 top-4 right-4 z-50">
                    <Notification
                        heading={"Success"}
                        text={"Your password changed successfully!"}
                        type={"success"}
                    />
                </div>
            )}
            {errorNotificaton && (
                <div className="absolute mt-20 top-4 right-4 z-50">
                    <Notification
                        heading={"Error"}
                        text={"Somthing went wrong!"}
                        type={"danger"}
                    />
                </div>
            )}
            <Head>
                <title>Change Password</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="text-white text-2xl mb-2 mt-6">Change Password</div>


            <form onSubmit={handleSubmit} className="w-4/5 max-w-lg flex flex-col">

                <div className="mx-auto my-auto w-96">
                    <div>
                        {!name &&
                            <div className="mt-6">
                                <InputField
                                    id="currentPassword"
                                    label="Current Password"
                                    type="password"
                                    onClick={() => { }}
                                    primary
                                    required
                                    name="currentPassword"
                                    pattern={"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]:;\"'<>,.?/\\|`~]).{8,}$"
                                    }
                                />
                            </div>
                        }
                        <div className="mt-6">
                            <InputField
                                id="newPassword"
                                label="New Password"
                                type="password"
                                onClick={() => { }}
                                primary
                                required
                                name="newPassword"
                                pattern={"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]:;\"'<>,.?/\\|`~]).{8,}$"
                                }
                            />
                        </div>
                        <div className="mt-6">
                            <InputField
                                id="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                onClick={() => { }}
                                primary
                                required
                                name="confirmPassword"
                            />
                        </div>

                    </div>
                    <div className="flex mt-3 gap-4 justify-start">

                        <Button type="submit" className="mb-3" primary text="Save" disabled={btnStatus} />
                        <Button type="button" className="mb-3" text="Cancel" onClick={(e) => router.push(
                            {
                                pathname: "/admin/user/"
                            },
                            "/admin/user/"
                        )} />
                    </div>
                </div>
            </form>
        </div>

    );
}
