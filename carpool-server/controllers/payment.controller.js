const User = require("../models/user.models")
const Razorpay = require("razorpay");
const Payment = require("../models/payment.models")
const axios = require("axios")
const sendMail = require('../utils/mailer.js');
const Withdrawal = require("../models/withdrawal.models")


// Initialize Razorpay with your keys
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Create Razorpay order API
const createOrder = async (req, res) => {
  const { rideId, userId, seatsBooked, amount } = req.body;

  const options = {
    amount: amount * 100, // amount in paise (INR is in paise, so multiply by 100)
    currency: "INR",
    receipt: `receipt_${rideId}_${userId}`.substring(0, 40),
    payment_capture: 1, // Automatically capture payment
  };

  try {
    // Create order in Razorpay
    const order = await razorpayInstance.orders.create(options);

    // Store the order in your database (optional)
    // You can store order ID, ride ID, user ID, amount, etc.

    res.status(200).json({
      orderId: order.id,
      amount: order.amount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating Razorpay order",
      error,
    });
  }
};


// Webhook to verify payment status
const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  // Generate a signature using Razorpay's secret
  const crypto = require("crypto");
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    // Update payment status in the database, mark the amount as held in escrow
    // Store the payment ID, and mark the ride as 'pending completion'


    res.status(200).json({ message: "Payment verified and amount held in escrow", success: true });
  } else {
    res.status(400).json({ message: "Invalid payment signature" });
  }
};


// const initiateWithdrawal = async (req, res) => {
//   try {
//     const { userId, amount } = req.body;

//     // Fetch user bank details from your database
//     const user = await User.findById(userId);
//     if (!user || !user.bankDetails) {
//       return res.status(404).json({ message: "Bank details not found" });
//     }

//     const { accountNumber, ifsc } = user.bankDetails;

//     // Step 1: Create a Contact for the user (if not already created)
//     let contactId;
//     if (!user.razorpayContactId) {
//       const contact = await razorpayInstance.customers.create({
//         name: user.name,
//         email: user.email,
//         // contact: user.phone,
//         type: "customer",
//       });
//       contactId = contact.id;

//       // Store Razorpay contact ID for future payouts
//       user.razorpayContactId = contactId;
//       await user.save();
//     } else {
//       contactId = user.razorpayContactId;
//     }

//     // Step 2: Add a Fund Account linked to the contact
//     let fundAccountId;
//     if (!user.razorpayFundAccountId) {
//       const fundAccount = await razorpayInstance.fundAccount.create({
//         contact_id: contactId,
//         account_type: "bank_account",
//         bank_account: {
//           name: user.name,
//           ifsc: ifsc,
//           account_number: accountNumber,
//         },
//       });
//       fundAccountId = fundAccount.id;

//       // Store Razorpay fund account ID for future withdrawals
//       user.razorpayFundAccountId = fundAccountId;
//       await user.save();
//     } else {
//       fundAccountId = user.razorpayFundAccountId;
//     }

//     // Step 3: Initiate a Payout
//     const payout = await razorpa.payouts.create({
//       account_number: "33576852478", // Replace with your Razorpay virtual account
//       fund_account_id: fundAccountId,
//       amount: amount * 100, // Amount in paisa
//       currency: "INR",
//       mode: "IMPS",
//       purpose: "payout",
//       queue_if_low_balance: true,
//       narration: "Withdrawal from Carpool Account",
//     });

//     res.status(200).json({ message: "Payout initiated", payout });
//   } catch (error) {
//     console.error("Error in initiating withdrawal:", error);
//     res.status(500).json({ message: "Error in initiating payout", error });
//   }
// };

const createContact = async(req, res) => {
  try {
    const { name, email, contact } = req.body;
    const response = await axios.post(
      "https://api.razorpay.com/v1/contacts",
      { name, email, contact, type: "customer" },
      {
        auth: {
          username: process.env.RAZORPAY_KEY_ID,
          password: process.env.RAZORPAY_SECRET,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error creating contact:", error.response?.data || error.message);
    res.status(500).json(error.response?.data || "Error creating contact");
  }
}

const createFundAccount = async(req, res) => {
  try {
    const { contact_id, account_holder_name, ifsc, account_number } = req.body;
    const response = await axios.post(
      "https://api.razorpay.com/v1/fund_accounts",
      {
        contact_id,
        account_type: "bank_account",
        bank_account: {
          name: account_holder_name,
          ifsc,
          account_number,
        },
      },
      {
        auth: {
          username: process.env.RAZORPAY_KEY_ID,
          password: process.env.RAZORPAY_SECRET,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error creating fund account:", error.response?.data || error.message);
    res.status(500).json(error.response?.data || "Error creating fund account");
  }
}

// const initiatePayout = async(req, res) => {
//   try {
//     const { account_number, fund_account_id, amount, currency, mode, purpose, queue_if_low_balance, reference_id, narration } = req.body;

//     const payload = {
//       account_number,
//         fund_account_id,
//         amount,
//         currency,
//         mode,
//         purpose,
//         queue_if_low_balance,
//         reference_id,
//         narration,
//     }

//     console.log(payload)
//     const response = await axios.post(
//       "https://api.razorpay.com/v1/payouts",
//       {
        
//           account_number,
//             fund_account_id,
//             amount,
//             currency,
//             mode,
//             purpose,
//             queue_if_low_balance,
//             reference_id,
//             narration,
        
//       },
//       {
//         auth: {
//           username: process.env.RAZORPAY_KEY_ID,
//           password: process.env.RAZORPAY_SECRET,
//         },
//         headers: {
//           "X-Payout-Idempotency": "53cda91c-8f81-4e77-bbb9-7531f8ac6bf4", 
//         },
//       }
//     );
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error initiating payout:", error.response?.data || error.message);
//     res.status(500).json(error.response?.data || "Error initiating payout");
//   }
// }

const getAccessToken = async(req, res) =>{
  console.log("api called")
  const options = {
  method: 'POST',
  url: 'https://payout-gamma.cashfree.com/payout/v1/authorize',
  headers: {
    accept: 'application/json',
    'x-client-id': 'CF10338122CSH2VK3D133S7397FA40',
    'x-client-secret': 'cfsk_ma_test_e339fd830d52a0cb1760fb94b2f5b709_b78b8945'
  }
};
try {

  const response = await axios.request(options);
  // res.status(200).json({
  //   message: "success",
  //   data: response.data, // Use 'data' as a key to hold the response data
  //   success: true
  // });
console.log(response.data)
  return response.data.data.token; 

} catch (error) {

  console.error("Error fetching access token:", error);
  res.status(500).json({ message: 'Error fetching access token', error: error.message });

}


}

const addBeneficiary = async(req, res) =>{
  const { beneId,name, email, phone, account_number, ifsc, address1 } = req.body;

  try {
    // Get the access token
    const token = await getAccessToken();

    // Set up the request to add a beneficiary
    const options = {
      method: 'POST',
      url: 'https://payout-gamma.cashfree.com/payout/v1/addBeneficiary',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`, // Include the access token,
      },
      data: {
        beneId,
        name,
        email,
        phone,
        account_number,
        ifsc,
        address1
      },
    };

    // Make the request to add the beneficiary
    const response = await axios.request(options);
    console.log('Beneficiary added:', response.data);
    res.status(200).json({ message: 'Beneficiary added successfully!', data: response.data });
  } catch (error) {
    console.error('Error adding beneficiary:', error.response?.data || error.message);
    res.status(500).json({ message: 'Failed to add beneficiary.', error: error.response?.data || error.message });
  }

}

const initiatePayout = async (req, res) => {
  console.log("Initiate started")
  const {beneId,name, email, phone, account_number, ifsc, address1, amount} = req.body
  try {
    // Step 1: Get the access token
    const accessToken = await getAccessToken(); 

    if (!accessToken) {
      return res.status(400).json({ message: 'Failed to retrieve access token' });
    }

    const options1 = {
      method: 'POST',
      url: 'https://payout-gamma.cashfree.com/payout/v1/addBeneficiary',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`, // Include the access token
      },
      data: {
        beneId,
        name,
        email,
        phone,
        account_number:"10200937610",
        ifsc,
        address1
      },
    };
    const response = await axios.request(options1);
    console.log("Beneficiary Created")

    // Step 2: Define payout request options
    const options = {
      method: 'POST',
      //url: 'https://payout-gamma.cashfree.com/payout/v1/requestTransfer',
      url:'https://sandbox.cashfree.com/payout/transfers',

      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${accessToken}`,
        'x-client-id': 'CF10338122CSH2VK3D133S7397FA40',
    'x-client-secret': 'cfsk_ma_test_e339fd830d52a0cb1760fb94b2f5b709_b78b8945',
    'x-api-version': "2024-01-01"
      },
      data: {
        transfer_id: `${phone}${Date.now()}`,
        transfer_amount: amount,
        transfer_currency: "INR",
        transfer_mode: "imps",
        beneficiary_details: {
          beneficiary_id: beneId,
          beneficiary_name: "test name",
          // beneficiary_instrument_details: {
          //   bank_account_number: "10200937610",
          //   bank_ifsc: ifsc,
          // },
          // beneficiary_contact_details: {
          //   beneficiary_email: email,
          //   beneficiary_phone: phone,
          //   beneficiary_country_code: "+91",
          //   beneficiary_address: address1,
          // }
        },
      },
    };

    // Step 3: Make the payout request
    const payoutResponse = await axios.request(options);

    // Step 4: Send the response back to the client
    console.log(payoutResponse.data)

    if(payoutResponse.data.status == 'RECEIVED'){

      const newWithdrawal = new Withdrawal({
        userId: beneId,
        amount
      })

      await newWithdrawal.save();

      const findUser = await User.findById(beneId)
      console.log(findUser.availableBalance)
      findUser.availableBalance-=amount;

      await findUser.save();

      await sendMail(
        findUser.email,
        'Withdrawal Successful',
        `Your withdrawal of ₹${amount} has been processed successfully.`,
        `<p>Hello ${findUser.name},</p>
         <p>Your withdrawal of ₹${amount} has been successfully processed.</p>
         <p>Thank you for using our service!</p>
         <p>~TripMate</p>`
      );


      return res.status(200).json({
        message: 'Payout successful',
        data: payoutResponse.data,
        success: true,
      });
    }
    
  } catch (error) {
    console.error("Error initiating payout:", error.response?.data || error.message);
    return res.status(500).json({
      message: 'Error initiating payout',
      error: error.response?.data || error.message,
    });
  }
};

module.exports = { createOrder, verifyPayment, createContact, createFundAccount, initiatePayout, getAccessToken, addBeneficiary }