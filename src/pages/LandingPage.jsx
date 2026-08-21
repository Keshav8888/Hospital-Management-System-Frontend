import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/landingPage.css";

function LandingPage() {

    const navigate = useNavigate();

    const [currentSlide, setCurrentSlide] = useState(0);

    const heroImages = [
        "/images/hospital-1.jpg",
        "/images/hospital-2.jpg",
        "/images/hospital-3.jpg"
    ];

    const facilities = [
        {
            title: "Eye Treatment",
            image: "/images/eye-treatment.jpg",
            description:
                "Advanced diagnosis and treatment for eye conditions with modern equipment and experienced specialists."
        },
        {
            title: "Heart Treatment",
            image: "/images/heart-treatment.jpg",
            description:
                "Comprehensive cardiac care including diagnosis, treatment and continuous monitoring by our specialists."
        },
        {
            title: "Emergency Care",
            image: "/images/emergency-care.jpg",
            description:
                "Round-the-clock emergency services with trained medical staff and rapid response facilities."
        },
        {
            title: "Dental Care",
            image: "/images/dental-care.jpg",
            description:
                "Complete dental care ranging from routine checkups to advanced dental procedures."
        },
        {
            title: "Neurology",
            image: "/images/neurology.jpg",
            description:
                "Specialized neurological diagnosis and treatment for conditions affecting the brain and nervous system."
        },
        {
            title: "Pharmacy",
            image: "/images/pharmacy.jpg",
            description:
                "A well-equipped pharmacy providing prescribed medicines and essential healthcare products."
        }
    ];


    useEffect(() => {

        const interval = setInterval(() => {

            setCurrentSlide(
                (previousSlide) =>
                    (previousSlide + 1) %
                    heroImages.length
            );

        }, 4000);

        return () => clearInterval(interval);

    }, [heroImages.length]);


    return (
        <div className="landing-page">

            {/* =========================
                NAVBAR
            ========================= */}

            <header className="landing-navbar">

                <div className="landing-navbar-left">

                    <button
                        className="landing-login-button"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>

                </div>


                <div className="landing-logo">
                    <div className="landing-logo-icon">
                        HMS
                    </div>

                    <div className="landing-logo-text">
                        <strong>
                            Hospital
                        </strong>

                        <span>
                            Management System
                        </span>
                    </div>
                </div>

            </header>


            {/* =========================
                HERO SLIDER
            ========================= */}

            <section className="landing-hero">

                <div
                    className="landing-slider-track"
                    style={{
                        transform:
                            `translateX(-${currentSlide * 100}%)`
                    }}
                >

                    {heroImages.map(
                        (image, index) => (

                            <div
                                className="landing-slide"
                                key={index}
                            >

                                <img
                                    src={image}
                                    alt={`Hospital slide ${
                                        index + 1
                                    }`}
                                />

                                <div className="landing-slide-overlay">

                                    <div>

                                        <span>
                                            Welcome to our hospital
                                        </span>

                                        <h1>
                                            Quality Healthcare,
                                            <br />
                                            Compassionate Care
                                        </h1>

                                        <p>
                                            Providing trusted medical
                                            care with modern facilities
                                            and experienced professionals.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        )
                    )}

                </div>


                <div className="landing-slider-dots">

                    {heroImages.map(
                        (_, index) => (

                            <button
                                key={index}
                                className={
                                    index === currentSlide
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setCurrentSlide(index)
                                }
                            />

                        )
                    )}

                </div>

            </section>


            {/* =========================
                ABOUT
            ========================= */}

            <section className="landing-about">

                <div className="landing-about-text">

                    <span className="landing-section-label">
                        About Our Hospital
                    </span>

                    <h2>
                        Caring for you with
                        expertise and compassion
                    </h2>

                    <p>
                        Our hospital is committed to providing
                        high-quality healthcare services in a
                        safe, comfortable and patient-friendly
                        environment.
                    </p>

                    <p>
                        With experienced doctors, skilled medical
                        professionals and modern healthcare
                        facilities, we provide comprehensive
                        treatment across multiple medical
                        specialties.
                    </p>

                    <p>
                        From routine consultations to emergency
                        care, our goal is to make quality healthcare
                        accessible while ensuring every patient
                        receives personal attention and respect.
                    </p>

                </div>


                <div className="landing-about-image">

                    <img
                        src="/images/about-hospital.jpg"
                        alt="Hospital building"
                    />

                </div>

            </section>


            {/* =========================
                FACILITIES
            ========================= */}

            <section className="landing-facilities">

                <div className="landing-section-heading">

                    <span className="landing-section-label">
                        Healthcare Services
                    </span>

                    <h2>
                        Our Facilities
                    </h2>

                    <p>
                        Comprehensive healthcare services
                        designed around your needs.
                    </p>

                </div>


                <div className="landing-facility-grid">

                    {facilities.map(
                        (facility) => (

                            <div
                                className="landing-facility-card"
                                key={facility.title}
                            >

                                <div className="landing-facility-image">

                                    <img
                                        src={facility.image}
                                        alt={
                                            facility.title
                                        }
                                    />

                                </div>

                                <div className="landing-facility-content">

                                    <h3>
                                        {facility.title}
                                    </h3>

                                    <p>
                                        {facility.description}
                                    </p>

                                </div>

                            </div>

                        )
                    )}

                </div>

            </section>


            {/* =========================
                FOOTER
            ========================= */}

            <footer className="landing-footer">

                <p>
                    © {new Date().getFullYear()}
                    {" "}
                    Hospital Management System
                </p>

                <p>
                    Designed and developed by
                    {" "}
                    <strong>
                        Keshav Kumar
                    </strong>
                </p>

            </footer>

        </div>
    );
}

export default LandingPage;