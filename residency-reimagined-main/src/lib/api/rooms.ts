import ApiClient from './client';

export interface Room {
  _id: string;
  name: string;
  type: string;
  description: string;
  pricePerNight: number;
  perAdultPrice: number;
  perChildPrice: number;
  maxGuests: number;
  roomSize: string;
  bedType: string;
  image?: string;
  availability: 'Available' | 'Unavailable';
  availableCount?: number;
  taxPercentage?: number;
}

export interface RoomAvailabilityQuery {
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  children?: number;
  rooms?: number;
}

class RoomsApiService {
  // Get all rooms for a hotel
  async getRooms(hotelId: string, params?: RoomAvailabilityQuery) {
    return ApiClient.get<Room[]>(`/rooms/hotel/${hotelId}`, params);
  }

  // Get single room by ID
  async getRoom(roomId: string) {
    return ApiClient.get<Room>(`/rooms/${roomId}`);
  }

  // Create new room (admin only)
  async createRoom(hotelId: string, roomData: Partial<Room>) {
    return ApiClient.post<Room>(`/rooms/hotel/${hotelId}`, roomData);
  }

  // Update room (admin only)
  async updateRoom(roomId: string, roomData: Partial<Room>) {
    return ApiClient.put<Room>(`/rooms/${roomId}`, roomData);
  }

  // Delete room (admin only)
  async deleteRoom(roomId: string) {
    return ApiClient.delete(`/rooms/${roomId}`);
  }

  // Upload room image (admin only)
  async uploadRoomImage(roomId: string, imageFile: File) {
    return ApiClient.uploadFile(`/rooms/${roomId}/image`, imageFile);
  }

  // Check room availability for dates
  async checkAvailability(roomId: string, checkIn: string, checkOut: string, roomCount: number = 1) {
    return ApiClient.get(`/rooms/${roomId}/availability`, {
      checkIn,
      checkOut,
      roomCount
    });
  }
}

export default new RoomsApiService();
