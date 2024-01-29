import React,{useEffect} from 'react'
import { Meteor } from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data';
import { Loans } from '../api/collections/loans';
import {useNavigate} from 'react-router-dom'

function Lender({role , email}) {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    const email = localStorage.getItem('email');
    if (!role || !email) {
      navigate('/signup');
    }
  }, [navigate]);

  const { activeLoans } = useTracker(() => {
    const handle = Meteor.subscribe('allLoans');

    if (!handle.ready()) {
      return { activeLoans: [] };
    }

    const allLoans = Loans.find().fetch();
    const active = allLoans.filter((loan) => !loan.isApproved);

    return {activeLoans: active};
  });

  const { pastPayments, pastCnt } = useTracker(() => {
    const pastPayments = Loans.find({
      approvedBy: email, 
      isApproved: true, 
    }).fetch();
    const pastCnt = pastPayments.length;

    return { pastPayments, pastCnt };
  }, [email]);

  const handelApprove = (loanId)=>{
    Meteor.call('approveLoan', loanId, email, (error) => {
      if (!error) {
        // Handle success
      }
    });
  }

  return (
    <div className='bg-blue-100 p-5 rounded-lg shadow-lg'>
      <div className='w-full'>
        <h1 className='text-xl font-semibold text-blue-700 border-b mb-4'>
          Active Loans ({activeLoans.length})
        </h1>
        <div className=''>
          {activeLoans.length === 0 ? (
            <p className='text-blue-600'>No active loans</p>
          ) : (
            activeLoans.map((loan) => (
              <div className='flex w-full justify-between items-center bg-white p-3 rounded-lg shadow mb-3' key={loan._id}>
                <p>Loan amount - {loan.borrowerInfo.loanAmount}</p>
                <button className='bg-blue-600 text-white px-3 py-2 rounded-lg' onClick={() => handelApprove(loan._id)}>
                  Approve
                </button>
              </div>
            ))
          )}
        </div>
        <h1 className='text-xl font-semibold text-blue-700 border-b mb-4 mt-6'>
          Past Payments ({pastCnt})
        </h1>
        <div className=''>
          {pastPayments.length === 0 ? (
            <p className='text-blue-600'>No past payments</p>
          ) : (
            pastPayments.map((loan) => (
              <div className='flex w-full justify-between items-center mt-3 bg-white p-3 rounded-lg shadow' key={loan._id}>
                <p>Rs. {loan.borrowerInfo.loanAmount}</p>
                <p>{new Date(loan.createdAt).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Lender
