import ApiClient from './client';

export interface Hotel {
  _id: string;
  name: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  contact: {
    phone: string[];
    email: string[];
    website?: string;
  };
  amenities: string[];
  images: string[];
  location: {
    latitude: number;
    longitude: number;
  };
  checkInTime: string;
  checkOutTime: string;
  policies: {
    cancellation?: string;
    payment?: string;
    children?: string;
    pets?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  hotelId: string;
}

class HotelApiService {
  // Get hotel information
  async getHotel(hotelId: string) {
    return ApiClient.get<Hotel>(`/hotel/${hotelId}`);
  }

  // Update hotel information (admin only)
  async updateHotel(hotelId: string, hotelData: Partial<Hotel>) {
    return ApiClient.put<Hotel>(`/hotel/${hotelId}`, hotelData);
  }

  // Send contact message
  async sendContactMessage(messageData: ContactMessage) {
    return ApiClient.post('/contact', messageData);
  }

  // Get contact messages (admin only)
  async getContactMessages(hotelId: string, params?: { status?: string; page?: number; limit?: number }) {
    return ApiClient.get(`/contact/hotel/${hotelId}`, params);
  }

  // Update contact message status (admin only)
  async updateContactMessageStatus(messageId: string, status: 'new' | 'read' | 'responded') {
    return ApiClient.put(`/contact/${messageId}/status`, { status });
  }

  // Upload hotel image (admin only)
  async uploadHotelImage(hotelId: string, imageFile: File, imageType: 'gallery' | 'hero' = 'gallery') {
    return ApiClient.uploadFile(`/hotel/${hotelId}/images`, imageFile, 'image');
  }

  // Get hotel reviews/ratings
  async getHotelReviews(hotelId: string, params?: { page?: number; limit?: number; rating?: number }) {
    return ApiClient.get(`/hotel/${hotelId}/reviews`, params);
  }

  // Submit hotel review
  async submitReview(hotelId: string, reviewData: { rating: number; reviewText: string; reviewerName: string; reviewerEmail: string }) {
    return ApiClient.post(`/hotel/${hotelId}/reviews`, reviewData);
  }
}

export default new HotelApiService();
