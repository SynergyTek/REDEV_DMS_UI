import { useState } from "react";
import Head from "next/head";


export default function Manage() {

    return (
        <>
            <Head>
                <title>Form Template Dashboard</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={"p-4 mx-2 mt-2 flex flex-col gap-4"}>
                <h2 className={"text-2xl font-semibold text-primary-900 dark:text-primary-300"}>
                    Create Document Template
                </h2>


                <div className={"mt-4"}>
                    <form>
                        {/* User ID Field */}
                        <div className="mb-4">
                            <InputField
                                id="id1"
                                label="Input"
                                onClick={() => { }}
                                primary
                                required
                            />
                        </div>

                        {/* ID Field */}
                        <div className="mb-4">
                            <label htmlFor="id" className="block text-gray-700 font-medium mb-2">
                                ID
                            </label>
                            <input
                                type="text"
                                id="id"
                                name="id"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter ID"
                            />
                        </div>

                        {/* Title Field */}
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter Title"
                            />
                        </div>

                        {/* Content (Body) Field */}
                        <div className="mb-6">
                            <label htmlFor="body" className="block text-gray-700 font-medium mb-2">
                                Content
                            </label>
                            <textarea
                                id="body"
                                name="body"
                                rows="4"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter Content"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}
