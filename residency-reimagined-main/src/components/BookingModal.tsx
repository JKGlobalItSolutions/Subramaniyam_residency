import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { X } from "lucide-react";

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpayConstructor {
  new (options: RazorpayOptions): RazorpayInstance;
}

declare global {
  interface Window {
    Razorpay?: RazorpayConstructor;
  }
}

interface Room {
  name: string;
  price: string;
}

interface BookingModalProps {
  room: Room;
  onClose: () => void;
}

const BookingModal = ({ room, onClose }: BookingModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Razorpay placeholder - In production, replace with actual Razorpay key
    const options = {
      key: "rzp_test_PLACEHOLDER_KEY", // Replace with actual Razorpay key
      amount: parseInt(room.price.replace(/[^0-9]/g, "")) * 100, // Amount in paise
      currency: "INR",
      name: "Kousthubam Grand Suites",
      description: `Booking for ${room.name}`,
      handler: function (response: RazorpayResponse) {
        toast.success(`Booking confirmed! Payment ID: ${response.razorpay_payment_id}`);
        onClose();
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: "#8e2de2",
      },
    };

    // Check if Razorpay is loaded
    if (typeof window !== "undefined" && window.Razorpay) {
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } else {
      toast.error("Payment gateway not loaded. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-card border border-border rounded-lg p-8 max-w-md w-full shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={24} />
          </button>

          <h2 className="text-2xl font-bold gradient-text mb-2">Book Your Stay</h2>
          <p className="text-muted-foreground mb-6">
            {room.name} - {room.price} per night
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Guest Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-border text-foreground hover:bg-secondary rounded-md transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-primary hover:bg-primary-glow text-primary-foreground hover-glow-purple rounded-md transition-all duration-300"
              >
                Proceed to Payment
              </button>
            </div>
          </form>

          <p className="text-xs text-muted-foreground mt-4 text-center">
            Note: This is a demo. Replace Razorpay key with actual credentials.
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingModal;
