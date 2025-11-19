import React from 'react';

interface RoomCardProps {
  id: string;
  name: string;
  images: string[];
  roomSize?: string;
  price: number;
  originalPrice?: number;
  features: string[];
  capacity: number;
  bedType: string;
  availableCount?: number;
  isUnavailable?: boolean;
  isSoldOut?: boolean;
  onBookNow: (id: string) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({
  id,
  name,
  images,
  roomSize,
  price,
  originalPrice,
  features,
  capacity,
  bedType,
  availableCount,
  isUnavailable,
  isSoldOut,
  onBookNow,
}) => {

  const imageArray = Array.isArray(images) ? images : [images];

  const ImageCarousel = ({ images, roomName }: { images: string[], roomName: string }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const nextSlide = () =>
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

    const prevSlide = () =>
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

    return (
      <div
        className="position-relative"
        style={{
          height: "230px",
          overflow: "hidden",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px"
        }}
      >
        <img
          src={images[currentIndex]}
          alt={`${roomName} ${currentIndex + 1}`}
          className="w-100 h-100"
          style={{ objectFit: "cover", transition: "0.4s ease-in-out" }}
        />
        {images.length > 1 && (
          <>
            <button
              className="btn btn-light position-absolute top-50 start-0 translate-middle-y rounded-circle shadow"
              style={{
                width: "36px",
                height: "36px",
                border: "none",
                fontSize: "22px",
              }}
              onClick={prevSlide}
            >
              ‹
            </button>
            <button
              className="btn btn-light position-absolute top-50 end-0 translate-middle-y rounded-circle shadow"
              style={{
                width: "36px",
                height: "36px",
                border: "none",
                fontSize: "22px",
              }}
              onClick={nextSlide}
            >
              ›
            </button>
          </>
        )}
      </div>
    );
  };

  const getFeatureIcon = (feature: string) => {
    switch (feature.toLowerCase()) {
      case 'wi-fi':
        return <i className="bi bi-wifi"></i>;
      case 'parking':
        return <i className="bi bi-car-front"></i>;
      case 'breakfast':
        return <i className="bi bi-egg-fried"></i>;
      default:
        return null;
    }
  };

  const isBookable = !isUnavailable && !isSoldOut && onBookNow;

  return (
    <div
      className={`card overflow-hidden shadow-sm transition-shadow duration-300 ${isBookable ? 'hover:shadow-lg' : 'opacity-75'}`}
      style={{ borderRadius: "10px", background: "#fff" }}
    >
      <div className="row g-0">
        <div className="col-md-4 position-relative">
          <ImageCarousel images={imageArray} roomName={name} />

          {isUnavailable && !isSoldOut && (
            <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">
              Limited Availability
            </span>
          )}
          {availableCount && availableCount > 0 && !isUnavailable && !isSoldOut && (
            <span className="badge bg-success position-absolute top-0 start-0 m-2">
              Only {availableCount} left
            </span>
          )}
        </div>

        <div className="col-md-8 d-flex flex-column justify-content-between">
          <div className="card-body pb-2">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <h5
                  className="card-title d-flex align-items-center gap-2 mb-1"
                  style={{ color: "#A37D4C", fontWeight: "600" }}
                >
                  <i className="bi bi-building"></i> {name}
                </h5>

                <p className="text-muted small">
                  {name} – Room Size: {roomSize || 'N/A'}
                </p>
              </div>

              <div className="text-end">
                <div
                  className="h5"
                  style={{ color: "#A37D4C", fontWeight: "700" }}
                >
                  ₹{(price ?? 0).toLocaleString()}
                  <small className="text-muted"> / night</small>
                </div>

                {originalPrice && (
                  <div className="text-muted text-decoration-line-through small">
                    ₹{(originalPrice ?? 0).toLocaleString()}
                  </div>
                )}
              </div>
            </div>

            <div className="d-flex align-items-center gap-4 mb-3 small text-muted">
              <div className="d-flex align-items-center gap-1">
                <i className="bi bi-people"></i>
                <span>{capacity} Guests</span>
              </div>
              <div className="d-flex align-items-center gap-1">
                <i className="bi bi-bed"></i>
                <span>{bedType}</span>
              </div>
            </div>

            <div className="row g-2 mb-3">
              {(features ?? []).map((feature, index) => (
                <div key={index} className="col-6 d-flex align-items-center gap-2 small">
                  {getFeatureIcon(feature)}
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center p-3 pt-0">
            <div className="small text-muted">
              ✓ Pay at hotel <br />
              ✓ Free cancellation
            </div>

            <button
              className="btn"
              style={{
                backgroundColor: "#A37D4C",
                border: "none",
                color: "#fff",
                fontWeight: "600",
                padding: "8px 20px",
              }}
              onClick={() => isBookable && onBookNow(id)}
              disabled={!isBookable}
            >
              {isSoldOut ? 'Sold Out' : isUnavailable ? 'Check Availability' : 'Book Now'}
            </button>
          </div>
        </div>
      </div>

      {isSoldOut && (
        <div
          className="text-white p-3 text-center fw-medium"
          style={{ backgroundColor: "#A37D4C" }}
        >
          <i className="bi bi-exclamation-circle me-2"></i>
          {name} is sold out on selected dates
        </div>
      )}
    </div>
  );
};

export default RoomCard;
