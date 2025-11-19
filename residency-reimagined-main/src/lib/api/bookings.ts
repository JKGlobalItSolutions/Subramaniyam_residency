import ApiClient from './client';

export interface GuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
}

export interface Booking {
  _id: string;
  hotelId: string;
  roomId: string;
  guestInfo: GuestInfo;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  rooms: number;
  totalAmount: number;
  paymentMethod: string;
  paymentProof?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  bookingReference: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingData {
  hotelId: string;
  roomId: string;
  guestInfo: GuestInfo;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  rooms: number;
  totalAmount: number;
  paymentMethod: string;
  paymentProof?: File;
}

class BookingsApiService {
  // Create new booking
  async createBooking(bookingData: CreateBookingData) {
    return ApiClient.post<Booking>('/bookings', bookingData);
  }

  // Get user's bookings
  async getUserBookings(userId?: string) {
    const endpoint = userId ? `/bookings/user/${userId}` : '/bookings/my-bookings';
    return ApiClient.get<Booking[]>(endpoint);
  }

  // Get single booking by ID
  async getBooking(bookingId: string) {
    return ApiClient.get<Booking>(`/bookings/${bookingId}`);
  }

  // Get all bookings for hotel (admin only)
  async getHotelBookings(hotelId: string, params?: {
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    limit?: number;
  }) {
    return ApiClient.get<{ bookings: Booking[]; total: number; page: number; pages: number }>(`/bookings/hotel/${hotelId}`, params);
  }

  // Update booking status (admin only)
  async updateBookingStatus(bookingId: string, status: Booking['status'], note?: string) {
    return ApiClient.put<Booking>(`/bookings/${bookingId}/status`, { status, note });
  }

  // Cancel booking
  async cancelBooking(bookingId: string, reason?: string) {
    return ApiClient.put<Booking>(`/bookings/${bookingId}/cancel`, { reason });
  }

  // Upload payment proof for booking
  async uploadPaymentProof(bookingId: string, paymentProofFile: File) {
    return ApiClient.uploadFile(`/bookings/${bookingId}/payment-proof`, paymentProofFile, 'paymentProof');
  }

  // Get booking statistics (admin only)
  async getBookingStats(hotelId: string, dateRange?: { from: string; to: string }) {
    return ApiClient.get(`/bookings/hotel/${hotelId}/stats`, dateRange);
  }

  // Check room availability before booking
  async checkAvailability(roomId: string, checkInDate: string, checkOutDate: string, roomCount: number = 1) {
    return ApiClient.get(`/rooms/${roomId}/availability`, {
      checkIn: checkInDate,
      checkOut: checkOutDate,
      roomCount
    });
  }
}

export default new BookingsApiService();
