import React from 'react';

interface SearchBarProps {
  checkIn: string;
  checkOut: string;
  rooms: number;
  adults: number;
  children: number;
  onCheckInChange: (value: string) => void;
  onCheckOutChange: (value: string) => void;
  onRoomsChange: (value: number) => void;
  onAdultsChange: (value: number) => void;
  onChildrenChange: (value: number) => void;
  onSearch: () => void;
  maxRooms?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  checkIn,
  checkOut,
  rooms,
  adults,
  children,
  onCheckInChange,
  onCheckOutChange,
  onRoomsChange,
  onAdultsChange,
  onChildrenChange,
  onSearch,
  maxRooms,
}) => {
  const calculateNights = () => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  return (
    <div className="card mb-4 shadow-lg">
      <div className="card-body p-4">
        <div className="row g-3 align-items-end">
          <div className="col-lg-2 col-md-6">
            <label htmlFor="checkin" className="form-label">Check-in</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-calendar"></i></span>
              <input
                id="checkin"
                type="date"
                className="form-control"
                value={checkIn}
                onChange={(e) => onCheckInChange(e.target.value)}
              />
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <label htmlFor="checkout" className="form-label">Check-out</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-calendar"></i></span>
              <input
                id="checkout"
                type="date"
                className="form-control"
                value={checkOut}
                onChange={(e) => onCheckOutChange(e.target.value)}
              />
            </div>
          </div>

          <div className="col-lg-1 col-md-6">
            <label className="form-label">Nights</label>
            <div className="form-control-plaintext text-center fw-bold">
              {calculateNights()}
            </div>
          </div>

          <div className="col-lg-1 col-md-6">
            <label htmlFor="rooms" className="form-label">Rooms</label>
            <div className="input-group">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => onRoomsChange(Math.max(1, rooms - 1))}
              >
                -
              </button>
              <input
                id="rooms"
                type="number"
                className="form-control text-center"
                min="1"
                max={maxRooms}
                value={rooms}
                onChange={(e) => onRoomsChange(Math.max(1, Math.min(maxRooms || Infinity, Number(e.target.value))))}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => onRoomsChange(Math.min(maxRooms || Infinity, rooms + 1))}
                disabled={rooms >= (maxRooms || Infinity)}
              >
                +
              </button>
            </div>
          </div>

          <div className="col-lg-1 col-md-6">
            <label htmlFor="adults" className="form-label">Adults</label>
            <input
              id="adults"
              type="number"
              className="form-control"
              min="1"
              value={adults}
              onChange={(e) => onAdultsChange(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="row g-3 mt-3 align-items-end">
          <div className="col-lg-1 col-md-6">
            <label htmlFor="children" className="form-label">Children</label>
            <input
              id="children"
              type="number"
              className="form-control"
              min="0"
              value={children}
              onChange={(e) => onChildrenChange(Number(e.target.value))}
            />
          </div>

          <div className="col-lg-2 col-md-6">
            <button
              className="btn btn-primary w-100"
              onClick={onSearch}
            >
              Check Availability
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
