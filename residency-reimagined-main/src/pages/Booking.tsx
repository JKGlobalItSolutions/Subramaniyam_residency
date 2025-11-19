import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import RoomCard from '../components/RoomCard';
import GuestForm from '../components/GuestForm';
import PaymentSection from '../components/PaymentSection';
import ReservationSummary from '../components/ReservationSummary';

const Booking = () => {
  // Search state
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // Booking state
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [guestInfo, setGuestInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentProofFile, setPaymentProofFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmationId, setConfirmationId] = useState('');

  // Data state
  const [roomsData, setRoomsData] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [unavailableRooms, setUnavailableRooms] = useState([]);
  const [soldOutRooms, setSoldOutRooms] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(true);
  const [roomsError, setRoomsError] = useState(null);
  const [socket, setSocket] = useState(null);

  // Hotel data state
  const [hotel, setHotel] = useState(null);
  const [hotelLoading, setHotelLoading] = useState(true);
  const [hotelError, setHotelError] = useState(null);

  const hotelId = import.meta.env.VITE_HOTEL_ID;
  const apiBase = import.meta.env.VITE_API_BASE;

  // Mock data for testing when backend is not available
  const mockRoomsData = [
    {
      _id: "677ff0000000000000000001",
      type: "Family Room - AC",
      roomSize: "450 sq ft",
      bedType: "2 King Beds",
      maxGuests: 6,
      pricePerNight: 5000,
      perAdultPrice: 0,
      perChildPrice: 0,
      availability: "Available",
      availableCount: 2,
      image: "/src/assets/family-balcony.jpg",
      taxPercentage: 18,
      commission: 5,
      hotelId: "69044a464b6d426e6b27e59e"
    },
    {
      _id: "677ff0000000000000000002",
      type: "Family Room - Non-AC",
      roomSize: "450 sq ft",
      bedType: "2 King Beds",
      maxGuests: 6,
      pricePerNight: 4000,
      perAdultPrice: 0,
      perChildPrice: 0,
      availability: "Available",
      availableCount: 2,
      image: "/src/assets/family-balcony.jpg",
      taxPercentage: 18,
      commission: 5,
      hotelId: "69044a464b6d426e6b27e59e"
    },
    {
      _id: "677ff0000000000000000003",
      type: "Suite Room - AC",
      roomSize: "350 sq ft",
      bedType: "1 King + 1 Single Bed",
      maxGuests: 4,
      pricePerNight: 4500,
      perAdultPrice: 0,
      perChildPrice: 0,
      availability: "Available",
      availableCount: 2,
      image: "/src/assets/executive-balcony.jpg",
      taxPercentage: 18,
      commission: 5,
      hotelId: "69044a464b6d426e6b27e59e"
    },
    {
      _id: "677ff0000000000000000004",
      type: "Suite Room - Non-AC",
      roomSize: "350 sq ft",
      bedType: "1 King + 1 Single Bed",
      maxGuests: 4,
      pricePerNight: 3750,
      perAdultPrice: 0,
      perChildPrice: 0,
      availability: "Available",
      availableCount: 2,
      image: "/src/assets/executive-balcony.jpg",
      taxPercentage: 18,
      commission: 5,
      hotelId: "69044a464b6d426e6b27e59e"
    },
    {
      _id: "677ff0000000000000000005",
      type: "Standard Room - AC",
      roomSize: "250 sq ft",
      bedType: "1 King Bed",
      maxGuests: 3,
      pricePerNight: 3000,
      perAdultPrice: 0,
      perChildPrice: 0,
      availability: "Available",
      availableCount: 18,
      image: "/src/assets/standard-room.jpg",
      taxPercentage: 18,
      commission: 5,
      hotelId: "69044a464b6d426e6b27e59e"
    },
    {
      _id: "677ff0000000000000000006",
      type: "Standard Room - Non-AC",
      roomSize: "250 sq ft",
      bedType: "1 King Bed",
      maxGuests: 3,
      pricePerNight: 2500,
      perAdultPrice: 0,
      perChildPrice: 0,
      availability: "Available",
      availableCount: 18,
      image: "/src/assets/standard-room.jpg",
      taxPercentage: 18,
      commission: 5,
      hotelId: "69044a464b6d426e6b27e59e"
    }
  ];

  const mockHotelData = {
    _id: "69044a464b6d426e6b27e59e",
    name: "Subramaniyam Residency",
    location: "Tiruvannamalai, Tamil Nadu",
    description: "A beautiful resort...",
    images: [],
    amenities: [],
    contact: {
      phone: "+91 98765 43210",
      email: "subramaniresidency@gmail.com"
    },
    address: "107, Ramalinganar St, Tiruvennanallur, Tiruvannamalai, Tamil Nadu 606601"
  };

  // Generate confirmation ID
  const generateConfirmationId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Fetch rooms
  const fetchRooms = async (checkInDate, checkOutDate) => {
    try {
      const params = new URLSearchParams();
      if (checkInDate) params.append('checkIn', checkInDate);
      if (checkOutDate) params.append('checkOut', checkOutDate);

      const url = `${apiBase}/rooms/hotel/${hotelId}?${params.toString()}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setRoomsData(data);
      setRoomsError(null);
    } catch (err: unknown) {
      console.log('Backend not available, using mock data');
      // Use mock data when backend is not available
      setRoomsData(mockRoomsData);
      setRoomsError(null);
    } finally {
      setRoomsLoading(false);
    }
  };

  // Fetch hotel
  const fetchHotel = async () => {
    try {
      setHotelLoading(true);
      setHotelError(null);
      const res = await fetch(`${apiBase}/hotel/${hotelId}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setHotel(data);
    } catch (err: unknown) {
      console.log('Backend not available, using mock hotel data');
      // Use mock hotel data when backend is not available
      setHotel(mockHotelData);
      setHotelError(null);
    } finally {
      setHotelLoading(false);
    }
  };

  // Mock socket functionality - in production, implement with socket.io
  useEffect(() => {
    // Socket.IO functionality removed for now
    // In production, uncomment and install socket.io-client
    console.log('Socket.IO functionality disabled - install socket.io-client for real-time updates');
  }, []);

  // Filter rooms based on guests
  useEffect(() => {
    const totalGuests = adults + children;
    const availableRooms = roomsData.filter(
      (room) => room.availability === 'Available' && room.maxGuests >= totalGuests && (room.availableCount || 0) >= rooms
    );
    const unavailableRooms = roomsData.filter(
      (room) => room.availability === 'Available' && room.maxGuests >= totalGuests && (room.availableCount || 0) < rooms && (room.availableCount || 0) > 0
    );
    const soldOutRooms = roomsData.filter(
      (room) => room.availability === 'Available' && room.maxGuests >= totalGuests && (room.availableCount || 0) === 0
    );
    setFilteredRooms(availableRooms);
    setUnavailableRooms(unavailableRooms);
    setSoldOutRooms(soldOutRooms);
  }, [roomsData, adults, children, rooms]);

  // Auto-refresh rooms
  useEffect(() => {
    if (checkIn && checkOut) {
      fetchRooms(checkIn, checkOut);
    }

    const interval = setInterval(() => {
      if (checkIn && checkOut) {
        fetchRooms(checkIn, checkOut);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [checkIn, checkOut]);

  // Set default dates
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    setCheckIn(today.toISOString().split('T')[0]);
    setCheckOut(tomorrow.toISOString().split('T')[0]);
  }, []);

  // Fetch hotel on mount
  useEffect(() => {
    fetchHotel();
  }, [hotelId]);

  // Calculations
  const calculateNights = () => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 1;
  };

  const nights = calculateNights();
  const roomPrice = selectedRoom?.pricePerNight || 0;
  const roomCharges = roomPrice * nights * rooms;
  const adultCharges = selectedRoom ? adults * (selectedRoom.perAdultPrice || 0) : 0;
  const childCharges = selectedRoom ? children * (selectedRoom.perChildPrice || 0) : 0;
  const guestCharges = adultCharges + childCharges;
  const subtotal = roomCharges + guestCharges;
  const taxPercentage = selectedRoom?.taxPercentage || 18;
  const taxes = Math.round(subtotal * (taxPercentage / 100));
  const discount = 0;
  const total = subtotal + taxes - discount;

  const handleSearch = () => {
    if (!checkIn || !checkOut) {
      alert('Please select dates');
      return;
    }
    setRoomsLoading(true);
    fetchRooms(checkIn, checkOut);
  };

  const handleBookNow = (roomId) => {
    const room = roomsData.find(r => r._id === roomId);
    if (room) {
      setSelectedRoom(room);
      document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
      alert(`Room selected! ${room.type} has been selected. Please fill in your details below.`);
    }
  };

  const maxAvailableRooms = Math.max(...roomsData.map(r => r.availableCount || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border-b border-border py-6 px-4"
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Book Your Stay</h1>
              <p className="text-muted-foreground mt-2">Find and reserve your perfect room</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Find Your Perfect Room</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Search for available rooms and book your stay with ease.
            </p>
          </div>

          {/* Custom Search Bar styled for Grand Kousthubam theme */}
          <div className="bg-card border border-border rounded-lg p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Check-in</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Check-out</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn}
                  className="w-full px-3 py-2 bg-background border border-border text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Rooms</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setRooms(Math.max(1, rooms - 1))}
                    className="w-8 h-8 rounded-md bg-secondary hover:bg-secondary/80 flex items-center justify-center text-foreground"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{rooms}</span>
                  <button
                    onClick={() => setRooms(Math.min(maxAvailableRooms || Infinity, rooms + 1))}
                    disabled={rooms >= (maxAvailableRooms || Infinity)}
                    className="w-8 h-8 rounded-md bg-secondary hover:bg-secondary/80 flex items-center justify-center text-foreground disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Adults</label>
                <input
                  type="number"
                  min="1"
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-background border border-border text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <button
                  onClick={handleSearch}
                  className="w-full bg-primary hover:bg-primary-glow text-primary-foreground hover-glow-purple px-4 py-2 rounded-md transition-all duration-300 font-medium"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Room Listings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {roomsLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading rooms...</p>
            </div>
          ) : roomsError ? (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-center">
              <p className="text-destructive">{roomsError}</p>
            </div>
          ) : (filteredRooms.length > 0 || unavailableRooms.length > 0 || soldOutRooms.length > 0) ? (
            <>
              <h3 className="text-2xl font-bold text-center mb-8 gradient-text">Available Rooms</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* ✅ Fully Available */}
                {filteredRooms.map((room) => (
                  <motion.div
                    key={room._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -5 }}
                    className="bg-card border border-border rounded-lg overflow-hidden hover-glow-purple"
                  >
                    <div className="aspect-video relative">
                      <img
                        src={room.image || '/assets/placeholder-room.jpg'}
                        alt={room.type}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                        ₹{room.pricePerNight}
                      </div>
                      {room.availableCount > 0 && (
                        <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                          {room.availableCount} left
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-semibold text-foreground mb-2">{room.type}</h4>
                      <p className="text-muted-foreground text-sm mb-4">{room.roomSize} • {room.bedType} • Max {room.maxGuests} guests</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">Wi-Fi</span>
                        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">AC</span>
                        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">TV</span>
                      </div>
                      <button
                        onClick={() => handleBookNow(room._id)}
                        className="w-full bg-primary hover:bg-primary-glow text-primary-foreground hover-glow-purple px-4 py-2 rounded-md transition-all duration-300 font-medium"
                      >
                        Book Now
                      </button>
                    </div>
                  </motion.div>
                ))}

                {/* ✅ Limited rooms left */}
                {unavailableRooms.map((room) => (
                  <motion.div
                    key={room._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-card border border-yellow-500/50 rounded-lg overflow-hidden opacity-75"
                  >
                    <div className="aspect-video relative">
                      <img
                        src={room.image || '/assets/placeholder-room.jpg'}
                        alt={room.type}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                        ₹{room.pricePerNight}
                      </div>
                      <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">
                        Limited
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-semibold text-foreground mb-2">{room.type}</h4>
                      <p className="text-yellow-600 text-sm mb-4">Only {room.availableCount} rooms left!</p>
                    </div>
                  </motion.div>
                ))}

                {/* ✅ Sold Out */}
                {soldOutRooms.map((room) => (
                  <motion.div
                    key={room._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-card border border-red-500/50 rounded-lg overflow-hidden opacity-50"
                  >
                    <div className="aspect-video relative">
                      <img
                        src={room.image || '/assets/placeholder-room.jpg'}
                        alt={room.type}
                        className="w-full h-full object-cover grayscale"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-4 py-2 rounded-full font-medium">Sold Out</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-semibold text-foreground mb-2">{room.type}</h4>
                      <p className="text-red-600 text-sm">Not available for selected dates</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h4 className="text-xl font-semibold text-foreground mb-2">No rooms available</h4>
              <p className="text-muted-foreground">Try changing your search dates or guest count.</p>
            </div>
          )}
        </motion.div>

        {/* Booking Section */}
        {selectedRoom && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <h3 className="text-3xl font-bold text-center mb-8 gradient-text">Complete Your Booking</h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Guest Form */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-foreground mb-4">Guest Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                      <input
                        type="text"
                        value={guestInfo.firstName}
                        onChange={(e) => setGuestInfo({ ...guestInfo, firstName: e.target.value })}
                        className="w-full px-3 py-2 bg-background border border-border text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Enter first name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                      <input
                        type="text"
                        value={guestInfo.lastName}
                        onChange={(e) => setGuestInfo({ ...guestInfo, lastName: e.target.value })}
                        className="w-full px-3 py-2 bg-background border border-border text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Enter last name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                      <input
                        type="email"
                        value={guestInfo.email}
                        onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                        className="w-full px-3 py-2 bg-background border border-border text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
                      <input
                        type="tel"
                        value={guestInfo.phone}
                        onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-background border border-border text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">City *</label>
                      <input
                        type="text"
                        value={guestInfo.city}
                        onChange={(e) => setGuestInfo({ ...guestInfo, city: e.target.value })}
                        className="w-full px-3 py-2 bg-background border border-border text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Enter city"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Country *</label>
                      <select
                        value={guestInfo.country}
                        onChange={(e) => setGuestInfo({ ...guestInfo, country: e.target.value })}
                        className="w-full px-3 py-2 bg-background border border-border text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">Select country</option>
                        <option value="IN">India</option>
                        <option value="US">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="CA">Canada</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-foreground mb-2">Payment Proof</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setPaymentProofFile(e.target.files?.[0] || null)}
                      className="w-full px-3 py-2 bg-background border border-border text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    {paymentProofFile && (
                      <p className="text-sm text-muted-foreground mt-1">Selected: {paymentProofFile.name}</p>
                    )}
                  </div>
                </div>

                {/* Payment Section */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-foreground mb-4">Payment Method</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 border border-border rounded-md hover:bg-secondary/50 cursor-pointer">
                      <input
                        type="radio"
                        id="upi"
                        name="payment"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-primary"
                      />
                      <label htmlFor="upi" className="flex-1 cursor-pointer">
                        <div className="font-medium">UPI Payment</div>
                        <div className="text-sm text-muted-foreground">Pay using UPI apps</div>
                      </label>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-secondary/50 rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total Amount</span>
                      <span className="text-xl font-bold gradient-text">₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reservation Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-4">
                  <ReservationSummary
                    roomPrice={roomPrice}
                    nights={nights}
                    discount={discount}
                    roomCount={rooms}
                    selectedRoom={selectedRoom}
                    guestInfo={guestInfo}
                    checkIn={checkIn}
                    checkOut={checkOut}
                    adults={adults}
                    children={children}
                    paymentMethod={paymentMethod}
                    paymentProofFile={paymentProofFile}
                    hotelId={hotelId}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Booking;
