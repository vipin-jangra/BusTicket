import { useMemo } from 'react';
import { useTable } from 'react-table' 


export const BasicTable = (props) =>{

    const columns = useMemo(()=> props.columns, []);
    const data = useMemo(()=> props.data,[]);
    
    const tableInstance = useTable({
         columns: columns,
         data : data,
    })

   
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance;

    return <>
        <table {...getTableProps()}>
            <thead>

                {
                    headerGroups.map((headerGroup)=> (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map((column)=>(
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))
                            }
                            <th>Action</th>
                        </tr>
                    )
                    )
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                    
                {
                    rows.map(row=>{
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map(cell =>{
                                        return   <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })
                                }
                                <td>
                                <div className='table-buttons' onClick={()=>{props.onView(row.original)}}>View</div>
                                <div className='table-buttons' onClick={()=>{props.onDelete(row.original)}}>Delete</div>
                                </td>
                            </tr>

                        )
                    })
                }
            </tbody>
        </table>
    </>;
}

