import React, { useState } from 'react'
import { useTracker } from 'meteor/react-meteor-data';
import { Loans } from '../api/collections/loans';

function LoanRequest({role,email}) {
    const { loans, loading } = useTracker(() => {
        const subscription = Meteor.subscribe('userLoans', email);
       
        const loans = Loans.find({ 'borrowerInfo.email' : email }).fetch();
        console.log(loans)
    
        return {
          loans,
          loading: !subscription.ready(),
        };
      });

    const [loanAmount , setLoanAmount] = useState(0);

    const handleSubmit= (e)=>{
        e.preventDefault();
        
        Meteor.call("loans.request", { email , loanAmount}, (error) => {
            if (error) {
              console.error("Error creating loan request:", error.reason);
            } else {
                setLoanAmount(0);
              console.log("Loan created successfully");
            }
          });
    }
  return (
    <div className='flex flex-col w-full bg-blue-100 p-5 rounded-lg shadow-lg'>
       <h1 className='text-2xl font-light text-blue-700'>Loan Request</h1>
       <div className='flex mt-12 md:flex-row flex-col' >
           <form className='flex flex-col  w-full  items-between' onSubmit={(e)=>handleSubmit(e)}>
               <div className='flex flex-col'>
               <label className="mb-2 text-blue-600">Amount</label>
                <input type="number"  className='bg-white border border-blue-300 p-2 rounded-lg' value={loanAmount} onChange={(e)=>setLoanAmount(e.target.value)}/>
               </div>
                <button type='submit' className='bg-blue-600 p-2 mt-6 text-white rounded-lg hover:bg-blue-700 transition duration-300'>Request</button>
           </form>
           <div className='bg-blue-200 border-l p-4 ml-2 w-full rounded-lg'>
                <h1 className='text-md text-blue-700'>Past Loans</h1>
                <div className='w-full'>
                    {loans.map((loan)=>{
                        return (
                            <div className='flex w-full justify-between mt-4 items-center bg-white p-3 rounded-lg shadow' key={loan._id}>
                                  <p className='text-md text-blue-600'> 💲{loan.borrowerInfo.loanAmount} </p>
                                   <p className='font-light text-sm text-blue-600 hidden md:block' >🕕 {new Date(loan.createdAt).toLocaleString()} </p>
                                   <p className='flex items-center justify-center text-md'> <span className={`w-3 h-3 ${loan.status==='Pending'?'bg-red-500':'bg-green-400'} rounded-full  mr-2`}></span> {loan.status}</p>
                             </div>
                        )
                    })}
                </div>
           </div>
       </div>
    </div>
  )
}

export default LoanRequest
