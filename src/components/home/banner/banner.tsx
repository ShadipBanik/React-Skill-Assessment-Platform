import React from "react";

const Banner: React.FC = () => {
  const smoothScroll = (targetId: string, duration = 1000) => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const startPosition = window.scrollY;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);

      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    const easeInOutQuad = (
      t: number,
      b: number,
      c: number,
      d: number
    ): number => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    smoothScroll("instructions", 1500); // 1500ms = 1.5s for slower scroll
  };

  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="videos/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Logo */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 sm:top-6 sm:left-6 sm:translate-x-0">
        <img src="images/logo.png" alt="Logo" className="h-10 w-auto sm:h-12" />
      </div>

      {/* Banner Text */}
      <div className="relative z-10 px-4 w-full md:w-4/6 mx-auto">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold">
          Hey Candidate,
        </h2>
        <p className="mt-4 text-lg sm:text-lg md:text-xl leading-relaxed">
          Thank you for your interest in Drvpatchhub! We’re excited to invite
          you to take the Digital Marketing Associate Test. <br />
          The test will take up to 75 minutes. <br />
          Please carefully read the instructions below before starting. Good
          luck!
        </p>
      </div>

      {/* Arrow Down Button */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <a
          href="#instructions"
          onClick={handleScroll}
          className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg transition"
          style={{ backgroundColor: "rgb(114, 103, 240)" }}
        >
          <i className="fas fa-angle-double-down text-xl sm:text-2xl text-white"></i>
        </a>
      </div>
    </section>
  );
};

export default Banner;
