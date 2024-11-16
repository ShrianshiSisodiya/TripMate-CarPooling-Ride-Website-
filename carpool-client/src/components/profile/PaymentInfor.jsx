import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PaymentInfor() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState();
  const [contact, setContact] =useState()
  const [fundAccount, setFundAccount] = useState()
  const [payout, setPayout] = useState()

  const [isAccountAdded, setIsAccountAdded] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/users/getuser",
        {
          withCredentials: true, // Important to include credentials
        }
      );
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Failed to fetch authenticated user", error);
    }
  };

  const addBankAccount = async (e) => {
    e.preventDefault();
    const userId = user._id;

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/addbankaccount",
        {
          userId,
          accountNumber,
          ifsc,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        setIsAccountAdded(true);
        fetchUser();
      }

      alert(response.data.message);
    } catch (error) {
      console.error("Error adding bank details:", error);
      alert("Failed to add bank details");
    }
  };

  

  // const withdraw = async (e) => {
  //   e.preventDefault();
  //   const userId = user._id;

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8000/api/v1/payments/withdraw",
  //       {
  //         userId,
  //         amount: withdrawalAmount,
  //       },
  //       { withCredentials: true }
  //     );

  //     if (response.data.success) {
  //       console.log(response.data);
  //     }

  //     alert(response.data.message);
  //   } catch (error) {
  //     console.error("Error adding bank details:", error);
  //     alert("Failed to withdraw");
  //   }
  // };


  const createContact = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/payments/createcontact",
        {
          name: user.name,
          email: user.email,
          contact: "0000000000",
          type: "customer",
        },
        {
          withCredentials: true
        },
        {
          auth: {
            username: "api key",
            password: "secret",
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("CONTACT:", response.data)
      setContact(response.data);
    } catch (error) {
      console.error("Error creating contact:", error);
      throw error;
    }
  };


  const createFundAccount = async () => {
    
    try {
      const response = await axios.post(
        "https://api.razorpay.com/v1/fund_accounts",
        {
          contact_id: contact.id, // Replace with the actual contact ID
          account_type: "bank_account",
          bank_account: {
            name: user.name,           // Account holder's name
            ifsc: user.bankDetails.ifsc,            // Bank IFSC code
            account_number: user.bankDetails.accountNumber // Bank account number
          }
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          auth: {
            username: "api key",
            password: "secret",
          },
        }
      );
  
      console.log("Fund Account Created:", response.data);
      setFundAccount(response.data)
    } catch (error) {
      console.error("Error creating fund account:", error.response?.data || error.message);
    }
  };

  // const initiatePayout = async () => {
    
  //   try {
  //     const response = await axios.post(
  //       "https://api.razorpay.com/v1/payouts",
  //       {
  //         account_number: "33576852478",   // Razorpay virtual account number
  //         fund_account_id: fundAccount.id, // Replace with actual fund account ID
  //         amount: 100,                      // Amount in paise (INR 10,000)
  //         currency: "INR",
  //         mode: "IMPS",
  //         purpose: "refund",
  //         queue_if_low_balance: true,
  //         reference_id: "Acme Transaction ID 12345",
  //         narration: "Acme Corp Fund Transfer",
  //         notes: {
  //           notes_key_1: "Tea, Earl Grey, Hot",
  //           notes_key_2: "Tea, Earl Grey… decaf.",
  //         },
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "X-Payout-Idempotency": "53cda91c-8f81-4e77-bbb9-7388f4ac6bf4", // Unique idempotency key
  //         },
  //         auth: {
  //           username: "api key",
  //           password: "secret",
  //         },
  //       }
  //     );
  
  //     console.log("Payout Successful:", response.data);
  //   } catch (error) {
  //     console.error("Error in initiating payout:", error.response?.data || error.message);
  //   }
  // };


  // const withdraw = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Step 1: Create contact
  //     const contactResponse = await axios.post("http://localhost:8000/api/v1/payments/createcontact", {
  //       name: user.name,
  //       email: user.email,
  //       phone: "0000000000",
  //     });
  //     const contactId = contactResponse.data.id;
  
  //     // Step 2: Create fund account
  //     const fundAccountResponse = await axios.post("http://localhost:8000/api/v1/payments/createfundaccount", {
  //       contact_id: contactId,
  //       account_holder_name: user.name,
  //       ifsc: user.bankDetails.ifsc,
  //       account_number: user.bankDetails.accountNumber,
  //     });
  //     const fundAccountId = fundAccountResponse.data.id;
  
  //     // Step 3: Initiate payout
  //     const payoutResponse = await axios.post("http://localhost:8000/api/v1/payments/initiatepayout", {
  //       account_number: "7878780080316316",
  //       fund_account_id: fundAccountId,
  //       amount: 100,
  //       currency: "INR",
  //       mode: "IMPS",
  //       purpose: "payout",
  //       queue_if_low_balance: false,
  //       reference_id: `Unique_Transaction_ID${fundAccountId}`,
  //       narration: "Fund Transfer",
  //     });
  //     console.log("Payout Successful:", payoutResponse.data);
  //   } catch (error) {
  //     console.error("Error processing withdrawal:", error.response?.data || error.message);
  //   }
  // };
  
const [accessToken, setAccessToken] = useState()

// const fetchAccessToken = async () => {
//   console.log("function called")
//   try {
//     console.log("fetching called")
//     const response = await axios.post('http://localhost:8000/api/v1/payments/getaccesstoken');
//     console.log('Access Token:', response.data);
//     // Save the access token in local storage or state
//     setAccessToken(response.data.accessToken);
//   } catch (error) {
//     console.error('Error fetching access token:', error);
//   }
// };


const addBeneficiary = async() => {
  try {
        console.log("fetching called")
        const response = await axios.post('http://localhost:8000/api/v1/payments/addbenficiary', {
          beneId: user._id,
          name: user.name,
        email: user.email,
        phone: "9893311923",
        account_number: user.bankDetails.accountNumber,
        ifsc: user.bankDetails.ifsc,
        address1: "sample_address",
        });
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
}

const handlePayout = async () => {
  console.log("initiate called")
  try {
    const response = await axios.post('http://localhost:8000/api/v1/payments/initiatepayout', {
      beneId: user._id,
      name: user.name,
        email: user.email,
        phone: "9893311923",
        account_number: user.bankDetails.accountNumber,
        ifsc: user.bankDetails.ifsc,
        address1: "sample_address",
      amount: withdrawalAmount,
      transferId: "Unique_Transaction_ID",
    });
    alert("Withdrawal Success")
    navigate("/");
    
    console.log('Payout Successful:', response.data);
  } catch (error) {
    fetchUser();
    console.error('Error initiating payout:', error);
  }
};

const withdraw = (e) => {
  e.preventDefault()
  console.log(withdrawalAmount, user.availableBalance)
  if(withdrawalAmount >= user.availableBalance && withdrawalAmount>0){
    alert("Insuuficient Balance")
  }else{
    handlePayout();
    console.log("Successful")
  }
}

  useEffect(() => {
    if (user.bankDetails) {
      setIsAccountAdded(true);
    }
  }, []);

  useEffect(() => {
    fetchUser(); // Fetch updated data when balance changes
  }, [user.availableBalance]); // Re-fetch when availableBalance updates
  

  console.log(user);
  return (
    <div className="w-[100%] pt-10 min-h-screen bg-gradient-to-r from-neutral-softPink to-neutral-lightLavender">
      <div>
        <h1
        className="w-fit p-5 bg-white/60 backdrop-blur-md border border-transparent rounded-2xl shadow-xl text-secondary-purpleDark text-2xl font-bold mx-auto mb-10"
        >Account Balance : {user.availableBalance}</h1>
        {isAccountAdded ? (
          <form onSubmit={withdraw}
          className='max-w-[40vw] mx-auto p-10 h-auto flex items-center justify-center flex-col bg-white/60 backdrop-blur-md border border-transparent rounded-2xl shadow-xl'
          >
            <h1 className='text-secondary-purpleDark text-2xl font-bold mb-6'>Withdraw</h1>
            <div className="flex flex-col m-5">
            <label  className='text-text text-lg font-medium text-contrast-darkBlue'
            >Enter withdrawal amount</label>
            <input
              placeholder="Enter Amount"
              max={user.availableBalance}
              value={withdrawalAmount}
              onChange={(e) => setWithdrawalAmount(e.target.value)}
              required
              className="p-1 rounded w-60"
            />
            </div>
            <button className='w-60 bg-primary-yellow text-beige-light py-2 px-4 rounded hover:bg-secondary-orange hover:text-contrast-white m-2 font-semibold'>Withdraw</button>
          </form>
        ) : (
          
          <form onSubmit={addBankAccount}
          className='max-w-[40vw] mx-auto p-10 h-auto flex items-center justify-center flex-col bg-white/60 backdrop-blur-md border border-transparent rounded-2xl shadow-xl'>
            <h1 className='text-secondary-purpleDark text-2xl font-bold mb-2'>Add Bank Details</h1>
            <p className="text-red-600">Add Bank Account for withdrawing money</p>
            <div className="flex flex-col m-5">
              <label className='text-text text-lg font-medium text-contrast-darkBlue'>Account Number:</label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
                className="p-1 rounded w-60"
              />
            </div>
            <div className="flex flex-col m-5">
              <label  className='text-text text-lg font-medium text-contrast-darkBlue'>IFSC Code:</label>
              <input
                type="text"
                value={ifsc}
                onChange={(e) => setIfsc(e.target.value)}
                required
                className="p-1 rounded w-60"
              />
            </div>
            <button type="submit" className='w-60 bg-primary-yellow text-beige-light py-2 px-4 rounded hover:bg-secondary-orange hover:text-contrast-white m-2 font-semibold'>Add Bank Details</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default PaymentInfor;
