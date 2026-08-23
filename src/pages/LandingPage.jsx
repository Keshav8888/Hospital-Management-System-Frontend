import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/landingPage.css";

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const animateScrollToTop = (startPosition, duration = 1800) => {
  const startTime = performance.now();

  const easeInOut = (t) => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  };

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;

    const progress = Math.min(elapsed / duration, 1);

    const easedProgress = easeInOut(progress);

    const currentPosition = startPosition * (1 - easedProgress);

    window.scrollTo(0, currentPosition);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};

function LandingPage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    const navbar = document.querySelector(".landing-navbar");

    if (!section) {
      return;
    }

    const navbarHeight = navbar ? navbar.offsetHeight : 0;

    const sectionTop =
      section.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

    window.scrollTo({
      top: sectionTop,
      behavior: "smooth",
    });

    window.history.replaceState(null, "", window.location.pathname);
  };

  const heroSlides = [
    {
      image: "/images/hospital-1.jpg",
      welcome: "Welcome to our hospital",
      heading: "Quality Healthcare, Compassionate Care",
      paragraph:
        "Providing trusted medical care with modern facilities and experienced professionals.",
    },
    {
      image: "/images/hospital-2.jpg",
      welcome: "",
      heading: "Advanced Treatment with Modern Technology",
      paragraph:
        "Our hospital combines advanced medical technology with experienced specialists to provide reliable and effective treatment.",
    },
    {
      image: "/images/hospital-3.jpg",
      welcome: "",
      heading: "Your Health, Our Priority",
      paragraph:
        "From consultation to recovery, we are committed to providing personalized care in a safe and comfortable environment.",
    },
  ];

  const facilities = [
    {
      title: "Eye Treatment",
      image: "/images/eye-treatment.jpg",
      description:
        "Advanced diagnosis and treatment for eye conditions with modern equipment and experienced specialists.",
    },
    {
      title: "Heart Treatment",
      image: "/images/heart-treatment.jpg",
      description:
        "Comprehensive cardiac care including diagnosis, treatment and continuous monitoring by our specialists.",
    },
    {
      title: "Emergency Care",
      image: "/images/emergency-care.jpg",
      description:
        "Round-the-clock emergency services with trained medical staff and rapid response facilities.",
    },
    {
      title: "Dental Care",
      image: "/images/dental-care.jpg",
      description:
        "Complete dental care ranging from routine checkups to advanced dental procedures.",
    },
    {
      title: "Neurology",
      image: "/images/neurology.jpg",
      description:
        "Specialized neurological diagnosis and treatment for conditions affecting the brain and nervous system.",
    },
    {
      title: "Pharmacy",
      image: "/images/pharmacy.jpg",
      description:
        "A well-equipped pharmacy providing prescribed medicines and essential healthcare products.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(
        (previousSlide) => (previousSlide + 1) % heroSlides.length,
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem("landingScrollPosition");

    const previousPosition = savedScrollPosition
      ? Number(savedScrollPosition)
      : 0;

    if (previousPosition > 0) {
      // First restore the position where
      // the user was before refreshing.
      window.scrollTo(0, previousPosition);

      // Then visibly animate from that position
      // back to the top.
      requestAnimationFrame(() => {
        animateScrollToTop(previousPosition, 1000);
      });
    } else {
      window.scrollTo(0, 0);
    }

    sessionStorage.removeItem("landingScrollPosition");
  }, []);

  useEffect(() => {
    const saveScrollPosition = () => {
      sessionStorage.setItem("landingScrollPosition", String(window.scrollY));
    };

    window.addEventListener("beforeunload", saveScrollPosition);

    return () => {
      window.removeEventListener("beforeunload", saveScrollPosition);
    };
  }, []);

  return (
    <div className="landing-page">
      {/* NAVBAR */}

      <header className="landing-navbar">
        <div className="landing-logo">
          <div className="landing-logo-icon">HMS</div>

          <div className="landing-logo-text">
            <strong>Hospital</strong>

            <span>Management System</span>
          </div>
        </div>

        <nav className="landing-navbar-right">
          <button
            type="button"
            className="landing-nav-link landing-nav-button"
            onClick={() => scrollToSection("about-us")}
          >
            About Us
          </button>

          <button
            type="button"
            className="landing-nav-link landing-nav-button"
            onClick={() => scrollToSection("services")}
          >
            Services
          </button>

          <div className="landing-auth-buttons">
            <button
              className="landing-register-button"
              onClick={() => navigate("/register")}
            >
              Register
            </button>

            <button
              className="landing-login-button"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </nav>
      </header>

      {/* =========================
                HERO SLIDER
            ========================= */}

      <section className="landing-hero">
        <div
          className="landing-slider-track"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {heroSlides.map((slide, index) => (
            <div className="landing-slide" key={index}>
              <img src={slide.image} alt={`Hospital slide ${index + 1}`} />

              <div className="landing-slide-overlay">
                <div className="landing-slide-content">
                  {slide.welcome && (
                    <span className="landing-slide-welcome">
                      {slide.welcome}
                    </span>
                  )}

                  <h1>{slide.heading}</h1>

                  <p>{slide.paragraph}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="landing-slider-dots">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={index === currentSlide ? "active" : ""}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* =========================
                ABOUT
            ========================= */}

      <section className="landing-about" id="about-us">
        <div className="landing-about-heading">
          <h2>About Us</h2>
        </div>

        <div className="landing-about-content">
          <div className="landing-about-text">
            <p>
              Our hospital is committed to providing high-quality healthcare
              services in a safe, comfortable and patient-friendly environment.
            </p>

            <p>
              With experienced doctors, skilled medical professionals and modern
              healthcare facilities, we provide comprehensive treatment across
              multiple medical specialties.
            </p>

            <p>
              From routine consultations to emergency care, our goal is to make
              quality healthcare accessible while ensuring every patient
              receives personal attention and respect.
            </p>
          </div>

          <div className="landing-about-image">
            <img src="/images/about-hospital.png" alt="Hospital facilities" />
          </div>
        </div>
      </section>

      {/* =========================
                FACILITIES
            ========================= */}

      <section className="landing-facilities" id="services">
        <div className="landing-section-heading">
          <h2>Our Services</h2>

          <p>Comprehensive healthcare services designed around your needs.</p>
        </div>

        <div className="landing-facility-grid">
          {facilities.map((facility) => (
            <div className="landing-facility-card" key={facility.title}>
              <div className="landing-facility-image">
                <img src={facility.image} alt={facility.title} />
              </div>

              <div className="landing-facility-content">
                <h3>{facility.title}</h3>

                <p>{facility.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}

      <footer className="footer">
        <div className="footer-content">
          Designed & Developed by
          <span class="name"> Keshav Kumar</span>
          <br></br>
          Copyright © {new Date().getFullYear()} All Rights Reserved
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
