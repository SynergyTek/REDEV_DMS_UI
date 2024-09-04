
import { Button } from '/src/components/Button';
import Table  from '/src/components/Table';

const Workspace = () => {
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
                        icon: {
                            icon: [
                                512,
                                512,
                                [
                                    9999,
                                    61504,
                                    'pencil-alt'
                                ],
                                'f303',
                                [
                                    'M144 319.4c0 4.1 1.6 8.2 4.7 11.3s7.2 4.7 11.3 4.7s8.2-1.6 11.3-4.7c48-48 96-96 144-144c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0c-48 48-96 96-144 144c-3.1 3.1-4.7 7.2-4.7 11.3zM302.7 78.7c43.3 43.3 86.6 86.6 129.9 129.9c20-20 40-40 60-60c12.5-12.5 18.7-28.9 18.7-45.3s-6.2-32.8-18.7-45.3L453.3 18.7c-25-25-65.5-25-90.5 0l-60 60z',
                                    'M432.7 208.7L302.7 78.7 58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L432.7 208.7zM89.3 360.5l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3zm226-196.4c6.2 6.2 6.2 16.4 0 22.6l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0z'
                                ]
                            ],
                            iconName: 'pencil',
                            prefix: 'fad'
                        },
                        label: 'Add here',
                        onClick: () => { }
                    }
                ]}
                columns={[
                    {
                        field: 'id',
                        header: 'Actions'
                    },
                    {
                        field: 'workspaceName',
                        header: 'Workspace Name'
                    },
                    {
                        field: 'parentName',
                        header: 'Parent Name'
                    },
                    {
                        field: 'legalEntityName',
                        header: 'Legal Entity Name'
                    },
                    {
                        field: 'createdByName',
                        header: 'Created By Name'
                    }
                ]}
                
                data={[
                    {
                        id: '...',  
                        workspaceName: 'HEG Machinery',
                        parentName: 'Galfar',
                        legalEntityName: 'Galfar',
                        createdByName: 'Arvind Baigani'
                    },
                    {
                        id: '...',  
                        workspaceName: 'HEG HR',
                        parentName: 'Galfar',
                        legalEntityName: 'Galfar',
                        createdByName: 'Arvind Baigani'
                    },
                    {
                        id: '...',  
                        workspaceName: 'HEG Finance',
                        parentName: 'Galfar',
                        legalEntityName: 'Galfar',
                        createdByName: 'Arvind Baigani'
                    },
                    {
                        id: '...',  
                        workspaceName: 'HEG ERP Integration',
                        parentName: 'HEG',
                        legalEntityName: 'HEG',
                        createdByName: 'Administrator'
                    },
                    {
                        id: '...',  
                        workspaceName: 'Indore',
                        parentName: 'Galfar',
                        legalEntityName: 'Galfar',
                        createdByName: 'Administrator'
                    },
                    {
                        id: '...',  
                        workspaceName: 'Bhopal',
                        parentName: 'Galfar',
                        legalEntityName: 'Galfar',
                        createdByName: 'Administrator'
                    }
                ]}
                
                primary
                text="Button"
            />
        </div>
    )
}

export default Workspace;
