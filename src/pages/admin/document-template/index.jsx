import { useState } from "react";
import Head from "next/head";
import { Table, Button} from "../../../components/core/";


export default () => {

  return (
    <>
      <Head>
        <title>Document Template</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={"p-4 mx-2 mt-2 flex flex-col gap-4"}>
        <h2 className={"text-2xl font-semibold text-primary-900 dark:text-primary-300"}>
          Document Template
        </h2>
        <div className={"text-primary-900 dark:text-primary-200"}>
          <Button
            onClick={() => { }}
            primary
            size="large"
            text="Create"
          />
        </div>

        <div className={"mt-4"}>
          <Table
            rowId={"Id"}
            rowName={"DisplayName"}
            data={{
              source: "https://jsonplaceholder.typicode.com/posts",
            }}
            columns={[
              {
                header: "user Id",
                field: "userId",
              },
              {
                header: "id",
                field: "id",
              },
              {
                header: "title",
                field: "title",
              },
              {
                header: "Content",
                field: "body",
              },
            ]}
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
          ></Table>
        </div>
      </main>
    </>
  );
}
