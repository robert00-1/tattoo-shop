import { useLocation , useNavigate} from "react-router-dom";
import { useState } from "react";
import api from "../services/api";


import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import QRCode from "react-qr-code";

function CryptoPayment() {
    const {state} = useLocation();

    const [txHash, setTxHash] = useState("");
    const [proof, setProof] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    

    if (!state) {
        return (
            <div className="p-20 text-center">
                No payment information found.
            </div>
        );
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!proof) {
            alert("Please upload payment proof.");
            return;
        }
        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("proof", proof);
            formData.append("txHash", txHash);

            await api.post(
                `/payments/${state.paymentId}/upload-proof`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

        alert("Payment proof uploaded successfully! Waiting for admin verification.");

navigate("/payment-pending");
        
            
        } catch (err) {
            console.error(err);

            alert(
                err.response?.data?.message ||
                "Upload failed."
            );
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
        <Navbar />
        <section className="pt-32 pb-20 bg-gray-100 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-10">
                <h1 className="text-4xl font-bold mb-8">
                    Crypto Deposit payment
                </h1>

                <div className="space-y-4 mb-8">
                    <div>
                        <strong>Deposit Amount</strong>

                        <p className="text-2xl text-red-600 font-bold">
                            {state.amount} {state.currency}
                        </p>
                    </div>
                    <div>
                        <strong>Network</strong>

                        <p>{state.network}</p>
                    </div>
                    <div>
                        <strong>Wallet Address</strong>
                        <div className="mt-8 text-center">

  <h2 className="text-xl font-bold mb-4">
    Scan to Pay
  </h2>

  <div className="bg-white inline-block p-4 rounded-xl border">

    <QRCode
      value={state.walletAddress}
      size={220}
    />

  </div>

  <p className="text-gray-500 mt-4">
    Scan this QR code using your crypto wallet.
  </p>

</div>

                        <div className="flex gap-3 mt-2">

                            <input 
                            readOnly
                            value={state.walletAddress}
                            className="flex-1 border rounded-lg p-3 bg-gray-100"
                            />
                            <button
                            type="button"
                            onClick={() =>
                                navigator.clipboard.writeText(
                                    state.walletAddress
                                )
                            }
                            className="bg-red-600 text-white px-5 rounded-lg"
                            >Copy</button>
                        </div>
                    </div>
                </div>

                <form 
                onSubmit={handleSubmit}
                className="space-y-6"
                >
                    <div>
                        <label className="block mb-2 font-medium">
                            Transaction Hash
                        </label>
                        <input type="text"
                        value={txHash}
                        onChange={(e) =>
                            setTxHash(e.target.value)
                        }
                        className="w-full border rounded-lg p-3"
                        />
                    </div>
                     <div>
                    <label className="block mb-2 font-medium">
                        Upload Payment Screenshot
                    </label>

                    <input type="file"
                    onChange={(e) => 
                        setProof(e.target.files[0])
                    }
                    />
                    </div>

                    <button
                    disabled={loading}
                    className="w-full bg-red-600 text-white py-4 rounded-lg"
                    >
                        {loading
                        ? "uploading..."
                        : "Submit Payment Proof"
                    }
                    </button>
                </form>
            </div>
        </section>
        </>
    );
}

export default CryptoPayment;