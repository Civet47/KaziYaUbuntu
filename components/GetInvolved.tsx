
import React, { useState } from 'react';

// Simulated Backend API for Volunteering
const submitVolunteerData = async (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Saving to database:", data);
      resolve({ success: true, message: "Application received" });
    }, 1500);
  });
};

// Simulated Backend API for Donations
const submitDonationData = async (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Processing donation payment:", data);
      resolve({ success: true, message: "Donation processed" });
    }, 2500);
  });
};

const GetInvolved: React.FC = () => {
  // Volunteer Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Debate Coach' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Donation Modal State
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState<number | ''>('');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card' | 'paypal' | 'stripe' | 'pledge'>('mpesa');
  const [donationDetails, setDonationDetails] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    pledgeDate: ''
  });
  const [donationStatus, setDonationStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Volunteer Handlers
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setStatus('idle');
    setFormData({ name: '', email: '', role: 'Debate Coach' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    await submitVolunteerData(formData);
    setStatus('success');
    setTimeout(() => {
        closeModal();
    }, 2000);
  };

  // Donation Handlers
  const openDonationModal = () => setIsDonationModalOpen(true);
  const closeDonationModal = () => {
    setIsDonationModalOpen(false);
    setDonationStatus('idle');
    setDonationAmount('');
    setPaymentMethod('mpesa');
    setDonationDetails({
        fullName: '', phoneNumber: '', email: '', cardNumber: '', expiry: '', cvc: '', pledgeDate: ''
    });
  };

  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donationAmount) return;

    setDonationStatus('submitting');
    // Simulate API call
    await submitDonationData({ amount: donationAmount, method: paymentMethod, details: donationDetails });
    
    setDonationStatus('success');
    setTimeout(() => {
        closeDonationModal();
    }, 3000);
  };

  const predefinedAmounts = [25, 100, 500];

  const getButtonLabel = () => {
      if (donationStatus === 'submitting') {
          return (
            <svg className="animate-spin h-5 w-5 text-brand-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          );
      }
      switch (paymentMethod) {
          case 'pledge': return 'Submit Pledge';
          case 'paypal': return 'Proceed to PayPal';
          case 'stripe': return 'Pay with Stripe';
          default: return `Donate $${donationAmount || '0'}`;
      }
  };

  return (
    <section id="get-involved" className="py-20 bg-brand-teal text-white relative">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">You Can Make a Difference</h2>
        <p className="text-lg max-w-3xl mx-auto mb-10">
          Your support empowers the next generation of leaders. Join us in our mission to provide every child with the tools to succeed.
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          
          <div className="bg-white/10 p-8 rounded-lg flex flex-col">
            <h3 className="text-2xl font-bold text-brand-gold mb-4">Donate</h3>
            <p className="mb-4 text-left flex-grow">Your contribution directly funds the tools our students need to succeed. See how your gift can make an impact:</p>
            <ul className="text-left space-y-3 mb-6 flex-grow">
              <li><strong className="text-brand-gold">$25:</strong> Provides essential research materials for a student.</li>
              <li><strong className="text-brand-gold">$100:</strong> Sponsors a student's entry fee for a regional tournament.</li>
              <li><strong className="text-brand-gold">$500:</strong> Funds a semester of after-school coaching for one debater.</li>
            </ul>
            <button 
                onClick={openDonationModal}
                className="bg-brand-gold text-brand-blue font-bold py-3 px-6 rounded-full hover:bg-yellow-400 transition-colors duration-300 w-full mt-auto"
            >
              Give Now
            </button>
          </div>
          
          <div className="bg-white/10 p-8 rounded-lg flex flex-col">
            <h3 className="text-2xl font-bold text-brand-gold mb-4">Volunteer</h3>
            <p className="mb-4 text-left flex-grow">Lend your time and expertise. We're looking for passionate individuals to fill key roles:</p>
            <ul className="text-left space-y-3 mb-6 flex-grow">
              <li><strong className="text-brand-gold">Debate Coach:</strong> Work directly with students to hone their skills.</li>
              <li><strong className="text-brand-gold">Tournament Judge:</strong> Provide constructive feedback at competitions.</li>
              <li><strong className="text-brand-gold">Career Mentor:</strong> Share your professional journey and guide students.</li>
            </ul>
            <button 
                onClick={openModal}
                className="bg-brand-gold text-brand-blue font-bold py-3 px-6 rounded-full hover:bg-yellow-400 transition-colors duration-300 w-full mt-auto"
            >
              Sign Up to Volunteer
            </button>
          </div>
          
          <div className="bg-white/10 p-8 rounded-lg flex flex-col">
            <h3 className="text-2xl font-bold text-brand-gold mb-4">Partner With Us</h3>
            <p className="mb-4 text-left flex-grow">Corporate and community partnerships are vital to expanding our reach. Let's collaborate:</p>
            <ul className="text-left space-y-3 mb-6 flex-grow">
              <li><strong className="text-brand-gold">Sponsor a Tournament:</strong> Gain visibility while supporting a major event.</li>
              <li><strong className="text-brand-gold">Equip a Team:</strong> Fund laptops, software, and travel for a school team.</li>
              <li><strong className="text-brand-gold">Host a Workshop:</strong> Share industry expertise with our aspiring leaders.</li>
            </ul>
            <button className="bg-brand-gold text-brand-blue font-bold py-3 px-6 rounded-full hover:bg-yellow-400 transition-colors duration-300 w-full mt-auto">
              Become a Partner
            </button>
          </div>
        </div>
      </div>

      {/* Volunteer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden animate-[fadeIn_0.3s_ease-out]">
                <div className="bg-brand-blue p-4 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">Join the Team</h3>
                    <button onClick={closeModal} className="text-white hover:text-brand-gold">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                {status === 'success' ? (
                    <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h4 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h4>
                        <p className="text-gray-600">Your application has been received. We'll be in touch shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Full Name</label>
                            <input 
                                required
                                id="name"
                                type="text" 
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-brand-teal text-gray-800"
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email Address</label>
                            <input 
                                required
                                id="email"
                                type="email" 
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-brand-teal text-gray-800"
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">Interested Role</label>
                            <select 
                                id="role"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-brand-teal text-gray-800"
                                value={formData.role}
                                onChange={e => setFormData({...formData, role: e.target.value})}
                            >
                                <option>Debate Coach</option>
                                <option>Tournament Judge</option>
                                <option>Career Mentor</option>
                                <option>Event Support</option>
                            </select>
                        </div>
                        <button 
                            type="submit" 
                            disabled={status === 'submitting'}
                            className="w-full bg-brand-gold text-brand-blue font-bold py-3 rounded hover:bg-yellow-400 transition-colors flex justify-center items-center"
                        >
                            {status === 'submitting' ? (
                                <svg className="animate-spin h-5 w-5 text-brand-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : 'Submit Application'}
                        </button>
                    </form>
                )}
            </div>
        </div>
      )}

      {/* Donation Modal */}
      {isDonationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg overflow-hidden animate-[fadeIn_0.3s_ease-out] flex flex-col max-h-[90vh]">
                <div className="bg-brand-blue p-4 flex justify-between items-center shrink-0">
                    <h3 className="text-xl font-bold text-white">Support Our Mission</h3>
                    <button onClick={closeDonationModal} className="text-white hover:text-brand-gold">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {donationStatus === 'success' ? (
                     <div className="p-8 text-center flex-grow flex flex-col justify-center">
                        <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h4 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h4>
                        <p className="text-gray-600 mb-4">
                            {paymentMethod === 'mpesa' 
                                ? "Please check your phone for the M-Pesa prompt to complete your donation." 
                                : paymentMethod === 'pledge'
                                ? "Your pledge has been recorded. We appreciate your commitment!"
                                : paymentMethod === 'paypal'
                                ? "Redirecting to PayPal to complete your transaction..."
                                : "Your donation has been processed successfully."}
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleDonationSubmit} className="flex flex-col flex-grow overflow-y-auto">
                        <div className="p-6 space-y-6">
                            {/* Step 1: Amount */}
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-3">Select Donation Amount</label>
                                <div className="grid grid-cols-3 gap-3 mb-3">
                                    {predefinedAmounts.map((amt) => (
                                        <button
                                            key={amt}
                                            type="button"
                                            onClick={() => setDonationAmount(amt)}
                                            className={`py-2 px-4 rounded border font-bold transition-colors ${donationAmount === amt ? 'bg-brand-blue text-white border-brand-blue' : 'bg-white text-gray-700 border-gray-300 hover:border-brand-teal'}`}
                                        >
                                            ${amt}
                                        </button>
                                    ))}
                                </div>
                                <div className="relative">
                                    <span className="absolute left-3 top-2 text-gray-500">$</span>
                                    <input
                                        type="number"
                                        placeholder="Enter custom amount"
                                        min="1"
                                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-brand-teal text-gray-800"
                                        value={donationAmount}
                                        onChange={(e) => setDonationAmount(e.target.value ? parseFloat(e.target.value) : '')}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Step 2: Payment Method */}
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-3">Payment Method</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('mpesa')}
                                        className={`py-2 px-1 text-sm font-medium border rounded transition-colors ${paymentMethod === 'mpesa' ? 'bg-green-600 text-white border-green-600' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}
                                    >
                                        M-Pesa
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('paypal')}
                                        className={`py-2 px-1 text-sm font-medium border rounded transition-colors ${paymentMethod === 'paypal' ? 'bg-[#003087] text-white border-[#003087]' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}
                                    >
                                        PayPal
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('stripe')}
                                        className={`py-2 px-1 text-sm font-medium border rounded transition-colors ${paymentMethod === 'stripe' ? 'bg-[#635BFF] text-white border-[#635BFF]' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}
                                    >
                                        Stripe
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('card')}
                                        className={`py-2 px-1 text-sm font-medium border rounded transition-colors ${paymentMethod === 'card' ? 'bg-brand-blue text-white border-brand-blue' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}
                                    >
                                        Credit Card
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('pledge')}
                                        className={`py-2 px-1 text-sm font-medium border rounded transition-colors ${paymentMethod === 'pledge' ? 'bg-brand-gold text-brand-blue border-brand-gold' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}
                                    >
                                        Pledge
                                    </button>
                                </div>
                            </div>

                            {/* Step 3: Dynamic Fields */}
                            <div className="bg-gray-50 p-4 rounded border border-gray-200 min-h-[150px]">
                                {paymentMethod === 'mpesa' && (
                                    <div className="space-y-3 animate-[fadeIn_0.3s_ease-out]">
                                        <div className="flex items-center space-x-2 text-green-700 mb-2">
                                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                             <span className="font-semibold text-sm">Lipa Na M-Pesa</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">Enter your M-Pesa number below. You will receive a prompt on your phone to complete the donation.</p>
                                        <div>
                                            <label className="block text-gray-700 text-xs font-bold mb-1">Phone Number</label>
                                            <input 
                                                type="tel" 
                                                placeholder="e.g., 0712 345 678"
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-brand-teal text-gray-800"
                                                required
                                                value={donationDetails.phoneNumber}
                                                onChange={e => setDonationDetails({...donationDetails, phoneNumber: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                )}

                                {paymentMethod === 'paypal' && (
                                    <div className="space-y-3 animate-[fadeIn_0.3s_ease-out] flex flex-col items-center justify-center h-full text-center">
                                        <svg className="w-12 h-12 text-[#003087] mb-2" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.946 5.438-3.158 7.12-6.528 7.12h-1.553c-.383 0-.662.338-.718.718l-.94 5.96a.64.64 0 0 0 .633.741h.063l.775-4.918a.64.64 0 0 1 .632-.54h1.033c2.618 0 4.335-1.308 5.07-4.475.024-.122.046-.244.066-.367.635-4.04-1.29-5.654-4.832-5.654h-5.22a.64.64 0 0 0-.632.54l-3.8 24.118z"/>
                                        </svg>
                                        <p className="text-sm text-gray-600">You will be redirected to PayPal to complete your transaction securely.</p>
                                    </div>
                                )}

                                {paymentMethod === 'stripe' && (
                                    <div className="space-y-3 animate-[fadeIn_0.3s_ease-out] flex flex-col items-center justify-center h-full text-center">
                                        <svg className="w-12 h-12 text-[#635BFF] mb-2" viewBox="0 0 24 24" fill="currentColor">
                                             <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.926 0-1.366 1.162-1.928 2.534-1.928 1.936 0 3.19.824 3.738 2.016l3.354-1.922C19.168 1.996 16.924 0 13.568 0 8.65 0 5.378 2.946 5.378 7.026c0 5.022 6.642 5.252 6.642 8.01 0 1.636-1.38 2.158-3.036 2.158-2.614 0-4.01-1.222-4.57-2.67L.58 16.938C2.062 20.842 5.05 24 10.046 24c4.896 0 8.78-2.682 8.78-7.394 0-5.756-7.142-6.19-4.85-7.456z"/>
                                        </svg>
                                        <p className="text-sm text-gray-600">Pay securely with Credit Card, Google Pay, or Apple Pay via Stripe.</p>
                                    </div>
                                )}

                                {paymentMethod === 'card' && (
                                    <div className="space-y-3 animate-[fadeIn_0.3s_ease-out]">
                                        <div>
                                            <label className="block text-gray-700 text-xs font-bold mb-1">Cardholder Name</label>
                                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-brand-teal text-gray-800" required value={donationDetails.fullName} onChange={e => setDonationDetails({...donationDetails, fullName: e.target.value})} />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 text-xs font-bold mb-1">Card Number</label>
                                            <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-brand-teal text-gray-800" required value={donationDetails.cardNumber} onChange={e => setDonationDetails({...donationDetails, cardNumber: e.target.value})} />
                                        </div>
                                        <div className="flex space-x-3">
                                            <div className="w-1/2">
                                                <label className="block text-gray-700 text-xs font-bold mb-1">Expiry Date</label>
                                                <input type="text" placeholder="MM/YY" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-brand-teal text-gray-800" required value={donationDetails.expiry} onChange={e => setDonationDetails({...donationDetails, expiry: e.target.value})} />
                                            </div>
                                            <div className="w-1/2">
                                                <label className="block text-gray-700 text-xs font-bold mb-1">CVC</label>
                                                <input type="text" placeholder="123" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-brand-teal text-gray-800" required value={donationDetails.cvc} onChange={e => setDonationDetails({...donationDetails, cvc: e.target.value})} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {paymentMethod === 'pledge' && (
                                    <div className="space-y-3 animate-[fadeIn_0.3s_ease-out]">
                                        <p className="text-sm text-gray-600 mb-2">Make a promise to donate later. We will send you a reminder.</p>
                                        <div>
                                            <label className="block text-gray-700 text-xs font-bold mb-1">Your Name</label>
                                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-brand-teal text-gray-800" required value={donationDetails.fullName} onChange={e => setDonationDetails({...donationDetails, fullName: e.target.value})} />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 text-xs font-bold mb-1">Email Address</label>
                                            <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-brand-teal text-gray-800" required value={donationDetails.email} onChange={e => setDonationDetails({...donationDetails, email: e.target.value})} />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 text-xs font-bold mb-1">Fulfillment Date</label>
                                            <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-brand-teal text-gray-800" required value={donationDetails.pledgeDate} onChange={e => setDonationDetails({...donationDetails, pledgeDate: e.target.value})} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className="p-4 border-t border-gray-100 shrink-0">
                             <button 
                                type="submit" 
                                disabled={donationStatus === 'submitting'}
                                className={`w-full font-bold py-3 rounded transition-colors flex justify-center items-center shadow-md
                                    ${paymentMethod === 'paypal' ? 'bg-[#FFC439] text-[#003087] hover:bg-[#F2BA36]' : 
                                      paymentMethod === 'stripe' ? 'bg-[#635BFF] text-white hover:bg-[#544DE8]' : 
                                      'bg-brand-gold text-brand-blue hover:bg-yellow-400'}`}
                            >
                                {getButtonLabel()}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
      )}
    </section>
  );
};

export default GetInvolved;
