import React, { useEffect } from 'react'
import { useTracker } from 'meteor/react-meteor-data';
import { Loans } from '../api/collections/loans';
import { useNavigate } from 'react-router-dom'

function Admin() {
  const navigate = useNavigate();
  const { allLoans }= useTracker(() => {
    const handle = Meteor.subscribe('allLoans')
    if (!handle.ready()) return { allLoans: [] }
    const allLoans = Loans.find().fetch();
    console.log(allLoans);
    return { allLoans: allLoans };
  })

  return (
    <div className='bg-blue-100 w-full p-5 rounded-lg shadow-lg'>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-blue-700">
          <thead className="text-xs uppercase bg-blue-200 text-blue-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Borrower info
              </th>
              <th scope="col" className="px-6 py-3">
                Loan amount
              </th>
              <th scope="col" className="px-6 py-3">
                Requested on
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Approved by
              </th>
              <th scope="col" className="px-6 py-3">
                Approved time
              </th>
            </tr>
          </thead>
          <tbody>
            {allLoans.map((loan) => (
              <tr className="bg-white border-b hover:bg-blue-50">
                <th scope="row" className="px-6 py-4 font-medium text-blue-600 whitespace-nowrap">
                  {loan.borrowerInfo.email}
                </th>
                <td className="px-6 py-4">
                  {loan.borrowerInfo.loanAmount}
                </td>
                <td className="px-6 py-4">
                  {new Date(loan.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  {loan.status}
                </td>
                <td className="px-6 py-4">
                  {loan.approvedBy ? loan.approvedBy : 'N/A' }
                </td>
                <td className="px-6 py-4">
                  {loan.approvedTime ? new Date(loan.approvedTime).toLocaleString() : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Admin
