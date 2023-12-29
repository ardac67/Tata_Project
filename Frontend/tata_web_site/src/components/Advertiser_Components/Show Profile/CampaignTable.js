import DataTable from 'react-data-table-component'
const CampaingTable = () => {
  const columns = [
    {
      name: 'Campaign ID',
      selector: row => row.id
    },
    {
      name: 'Campaign Title',
      selector: row => row.title
    },
    {
      name: 'Status',
      selector: row => row.Status,
      conditionalCellStyles: [
        {
          when: row => row.Status === 'Active',
          style: {
            backgroundColor: 'rgba(63, 195, 128, 0.9)',
            color: 'white',
            '&:hover': {
              cursor: 'pointer'
            }
          }
        }
      ]
    },
    {
      name: 'Start Date',
      selector: row => row.Start_Date
    },
    {
      name: 'End Date',
      selector: row => row.End_Date
    },
    {
      name: 'Created Date',
      selector: row => row.Created_Date
    },
  ]

  const data = [
    {
      id: 'ABCDEF12',
      title: 'Product Enforsment',
      Status: 'Active',
      Start_Date: '17/05/2021',
      End_Date: '17/05/2021',
      Created_Date: '17/05/2021',
      Applicants: 120
    },
    {
      id: 'ABCDEF12',
      title: 'Product View',
      Status: 'Active',
      Start_Date: '17/05/2021',
      End_Date: '17/05/2021',
      Created_Date: '17/05/2021',
      Applicants: 158
    }
  ]
  return <DataTable columns={columns} data={data} />
}
export default CampaingTable
