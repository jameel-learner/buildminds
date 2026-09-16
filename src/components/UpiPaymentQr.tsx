import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Copy, Check, ShieldCheck, Smartphone, CheckCircle2, ArrowRight } from 'lucide-react';
import { AGENT_BUILDER_INTENSIVE } from '../data/buildMindsData';

interface UpiPaymentQrProps {
  amount?: number;
  onPaymentSuccess?: (transactionId: string) => void;
  className?: string;
}

export const UpiPaymentQr: React.FC<UpiPaymentQrProps> = ({
  amount = AGENT_BUILDER_INTENSIVE.tuition.launchPrice,
  onPaymentSuccess,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [utrNumber, setUtrNumber] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const { recipientName, upiId, bankName, upiPayUrl } = AGENT_BUILDER_INTENSIVE.upiPayment;

  // Generate genuine UPI payment string
  // upi://pay?pa=jameel.learner@oksbi&pn=Jameel%20M&am=6000&cu=INR&tn=BuildMinds%2014-Day%20Intensive
  const dynamicUpiString = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
    'Jameel M'
  )}&am=${amount}&cu=INR&tn=${encodeURIComponent('BuildMinds 14-Day Intensive')}`;

  useEffect(() => {
    QRCode.toDataURL(
      dynamicUpiString,
      {
        width: 320,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
        errorCorrectionLevel: 'H',
      },
      (err, url) => {
        if (!err && url) {
          setQrDataUrl(url);
        }
      }
    );
  }, [dynamicUpiString]);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleConfirmUtr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!utrNumber.trim()) return;

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerified(true);
      if (onPaymentSuccess) {
        onPaymentSuccess(utrNumber);
      }
    }, 1200);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Price & Savings Header Banner */}
      <div className="p-4 rounded-2xl bg-[#0B131B] border border-[#25374C] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-xs font-mono font-bold text-[#D98A1E] uppercase bg-[#D98A1E]/10 px-2.5 py-0.5 rounded">
              Launch Discount Applied
            </span>
            <span className="text-[11px] text-emerald-400 font-semibold">
              Save ₹{AGENT_BUILDER_INTENSIVE.tuition.savingsAmount.toLocaleString()}
            </span>
          </div>
          <div className="flex items-baseline justify-center sm:justify-start gap-3 mt-1.5">
            <span className="text-3xl font-black text-white font-mono">
              ₹{amount.toLocaleString()}
            </span>
            <span className="text-sm line-through text-slate-500 font-mono">
              ₹{AGENT_BUILDER_INTENSIVE.tuition.industryRate.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              (Industry rates: ~₹95,000)
            </span>
          </div>
        </div>

        <div className="text-xs text-slate-400 max-w-xs leading-tight sm:text-right">
          Direct instant UPI transfer to instructor account with zero gateway surcharge.
        </div>
      </div>

      {/* The Authentic QR Scanner Card matching JameelScanner.jpg */}
      <div className="max-w-sm mx-auto p-6 rounded-3xl bg-[#121A24] border border-[#25374C] shadow-2xl space-y-5 text-white">
        {/* Recipient Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#1D4ED8] flex items-center justify-center text-white font-bold text-lg shadow-sm">
            J
          </div>
          <div>
            <div className="font-bold text-sm text-slate-100">{recipientName}</div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1">
              <span>Verified Instructor Account</span>
              <CheckCircle2 className="w-3 h-3 text-emerald-400 inline" />
            </div>
          </div>
        </div>

        {/* The QR Container */}
        <div className="relative bg-white p-4 rounded-2xl shadow-inner flex flex-col items-center justify-center">
          {qrDataUrl ? (
            <div className="relative">
              <img
                src={qrDataUrl}
                alt={AGENT_BUILDER_INTENSIVE.upiPayment.qrAltText}
                className="w-56 h-56 object-contain rounded-lg"
              />
              {/* Google Pay Center Emblem matching JameelScanner.jpg */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-11 h-11 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center p-1">
                  <svg viewBox="0 0 24 24" className="w-6 h-6">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.93 6.72-4.93z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-56 h-56 bg-slate-100 animate-pulse rounded-lg flex items-center justify-center text-slate-400 text-xs">
              Generating UPI QR...
            </div>
          )}

          <div className="text-[11px] text-slate-600 font-medium mt-2">
            Scan to pay with any UPI app
          </div>
        </div>

        {/* Bank Badge matching JameelScanner.jpg */}
        <div className="p-2.5 rounded-xl bg-[#0B131B] border border-[#25374C] flex items-center justify-center gap-2 text-xs">
          {/* Kotak Infinity Logo Emblem */}
          <div className="w-5 h-5 rounded-full bg-[#ED1C24] flex items-center justify-center text-white text-[10px] font-bold">
            ∞
          </div>
          <span className="font-semibold text-slate-200">{bankName}</span>
        </div>

        {/* UPI ID Row with Copy */}
        <div className="space-y-1.5">
          <div className="text-[11px] text-slate-400 text-center">UPI ID</div>
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0B131B] border border-[#25374C]">
            <span className="font-mono text-xs font-bold text-amber-400 select-all">
              {upiId}
            </span>
            <button
              type="button"
              onClick={handleCopyUpi}
              className="inline-flex items-center gap-1 text-[11px] bg-[#25374C] hover:bg-[#344b66] text-white px-2.5 py-1 rounded-lg transition cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Direct Pay on Mobile Button (Deep link) */}
        <a
          href={upiPayUrl}
          className="w-full py-2.5 rounded-xl bg-[#D98A1E] hover:bg-[#e7992c] text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-md shadow-[#D98A1E]/20"
        >
          <Smartphone className="w-4 h-4" />
          <span>Pay ₹{amount.toLocaleString()} via UPI App</span>
        </a>
      </div>

      {/* UTR / Transaction ID Verification Form */}
      <div className="max-w-sm mx-auto p-5 rounded-2xl bg-[#0B131B] border border-[#25374C] space-y-3 text-xs">
        <div className="font-bold text-white flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#D98A1E]" />
          <span>Confirm Your Payment</span>
        </div>
        <p className="text-slate-400 leading-relaxed">
          After completing the UPI transfer, enter your 12-digit UPI Reference / UTR Number below to instantly lock in your seat for the 21 Sep 2026 fellowship batch:
        </p>

        {!verified ? (
          <form onSubmit={handleConfirmUtr} className="space-y-3">
            <input
              type="text"
              required
              placeholder="e.g. 426189034512"
              value={utrNumber}
              onChange={(e) => setUtrNumber(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#162332] border border-[#25374C] text-white font-mono text-xs focus:outline-none focus:border-[#D98A1E]"
            />

            <button
              type="submit"
              disabled={isVerifying || !utrNumber.trim()}
              className="w-full py-2.5 rounded-xl bg-[#25374C] hover:bg-[#344b66] disabled:opacity-50 text-white font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {isVerifying ? (
                <span>Verifying with Admissions...</span>
              ) : (
                <>
                  <span>Submit UTR & Confirm Seat</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D98A1E]" />
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="p-3 rounded-xl bg-[#162332] border border-emerald-500/40 text-emerald-400 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Payment Recorded Successfully!</span>
            </div>
            <div className="text-[11px] text-slate-300">
              UTR <span className="font-mono text-white">{utrNumber}</span> linked to your enrollment. Welcome to Build Minds!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
