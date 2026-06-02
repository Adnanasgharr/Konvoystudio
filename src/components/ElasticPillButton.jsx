"use client";
import { useRef } from "react";
import gsap from "gsap";

const ElasticPillButton = () => {
  const pillRef = useRef(null);
  const circleRef = useRef(null);
  const arrowRef = useRef(null);

  const handleMouseEnter = () => {
    // circle detaches to the right
    gsap.killTweensOf([circleRef.current, pillRef.current]);
    gsap.to(circleRef.current, {
      x: 12,
      scale: 1.15,
      duration: 0.4,
      ease: "elastic.out(1, 0.5)",
    });
    gsap.to(pillRef.current, {
      paddingRight: "20px",
      duration: 0.4,
      ease: "power3.out",
    });
    gsap.to(arrowRef.current, {
      rotate: 45,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    // bubble back together
    gsap.killTweensOf([circleRef.current, pillRef.current]);
    gsap.to(circleRef.current, {
      x: 0,
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
    gsap.to(pillRef.current, {
      paddingRight: "6px",
      duration: 0.4,
      ease: "power3.out",
    });
    gsap.to(arrowRef.current, {
      rotate: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={pillRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-flex items-center gap-3 cursor-none"
      style={{
        backgroundColor: "#c8f135",
        borderRadius: "999px",
        padding: "10px 6px 10px 24px",
        width: "fit-content",
      }}
    >
      <span
        style={{
          color: "#1a1a1a",
          fontSize: "16px",
          fontWeight: "600",
          whiteSpace: "nowrap",
        }}
      >
        See all services
      </span>

      {/* Circle with arrow — this is the bubble that detaches */}
      <div
        ref={circleRef}
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          backgroundColor: "#1a1a1a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span
          ref={arrowRef}
          style={{
            color: "#c8f135",
            fontSize: "16px",
            display: "block",
            lineHeight: 1,
          }}
        >
          ↗
        </span>
      </div>
    </div>
  );
};

export default ElasticPillButton;