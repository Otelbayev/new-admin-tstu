import React, { useState } from "react";

const Image = ({ src, alt, className, style }) => {
  const [loading, setLoading] = useState(true);

  return (
    <img
      src={src}
      alt={alt || "image"}
      className={className}
      loading="lazy"
      onLoad={() => setLoading(false)}
      style={{
        filter: loading ? "blur(10px)" : "none",
        transform: loading ? "scale(1.5)" : "scale(1)",
        transition: "0.5s ease",
        ...style,
      }}
    />
  );
};

export default Image;
