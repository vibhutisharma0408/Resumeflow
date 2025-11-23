import React, { useContext, useState } from 'react'
import { ArrowRight, ArrowUp, Download, LayoutTemplate, LogIn, Menu, X, Zap, CheckCircle, Rocket, Shield } from 'lucide-react';
import { landingPageStyles } from '../assets/dummyStyle'
import { UserContext } from "../contexts/UserContext"
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { ProfileInfoCard } from '../components/Cards';

function LandingPage() {
    const { user } = useContext(UserContext)
    const navigate = useNavigate();

    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState("login");

    const handleCTA = () => {
        if (!user) {
            setOpenAuthModal(true);
        } else {
            navigate("/dashboard")
        }
    }

    return (
        <div className={landingPageStyles.container}>
            <header className={landingPageStyles.header}>
                <div className={landingPageStyles.headerContainer}>
                    <div className={landingPageStyles.logoContainer}>
                        <div className={landingPageStyles.logoIcon}>
                            <ArrowRight className={landingPageStyles.logoIconInner} />
                        </div>
                        <span className={landingPageStyles.logoText}>
                            RESUMEFLOW
                        </span>
                    </div>
                    <button className={landingPageStyles.mobileMenuButton}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ?
                            <X size={24} className={landingPageStyles.mobileMenuIcon} /> :
                            <Menu size={24} className={landingPageStyles.mobileMenuIcon} />
                        }
                    </button>

                    <div className='hidden md:flex items-center'>
                        {user ? (
                            <ProfileInfoCard />
                        ) : (
                            <button className={landingPageStyles.desktopAuthButton} onClick={() => setOpenAuthModal(true)}>
                                <div className={landingPageStyles.desktopAuthButtonOverlay}></div>
                                <span className={landingPageStyles.desktopAuthButtonText}>Get Started</span>
                            </button>
                        )}
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className={landingPageStyles.mobileMenu}>
                        <div className={landingPageStyles.mobileMenuContainer}>
                            {user ? (
                                <div className={landingPageStyles.mobileUserInfo}>
                                    <div className={landingPageStyles.mobileUserWelcome}>
                                        Welcome Back
                                    </div>
                                    <button className={landingPageStyles.mobileDashboardButton}
                                        onClick={() => {
                                            navigate("/dashboard");
                                            setMobileMenuOpen(false);
                                        }}>
                                        Go to Dashboard
                                    </button>
                                </div>
                            ) : (
                                <button className={landingPageStyles.mobileAuthButton}
                                    onClick={() => {
                                        setOpenAuthModal(true);
                                        setMobileMenuOpen(false);
                                    }}>
                                    Get Started
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </header>

            <main className={landingPageStyles.main}>
                <section className={landingPageStyles.heroSection}>
                    <div className={landingPageStyles.heroGrid}>
                        <div className={landingPageStyles.heroLeft}>
                            <h1 className={landingPageStyles.heading}>
                                BUILD YOUR DREAM CAREER
                            </h1>

                            <p className={landingPageStyles.description}>
                                Create a professional resume in minutes with our easy-to-use builder.
                            </p>

                            <div className={landingPageStyles.ctaButtons}>
                                <button className={landingPageStyles.primaryButton}
                                    onClick={handleCTA}>
                                    <div className={landingPageStyles.primaryButtonOverlay}></div>
                                    <span className={landingPageStyles.primaryButtonContent}>
                                        CREATE MY RESUME - IT'S FREE!
                                        <ArrowRight className={landingPageStyles.primaryButtonIcon} size={18} />
                                    </span>
                                </button>
                                <p className="text-sm text-gray-500 mt-2">No credit card required</p>
                            </div>
                        </div >
                        <div className={landingPageStyles.heroIllustration}>
                            <div className={landingPageStyles.heroIllustrationBg}></div>
                            <div className={landingPageStyles.heroIllustrationContainer}>
                                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
                                    <div className="flex gap-4 mb-6">
                                        <div className="flex-1">
                                            <div className="h-2 bg-blue-600 rounded mb-2"></div>
                                            <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                                <ArrowUp className="w-4 h-4 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="h-2 bg-gray-300 rounded w-20 mb-1"></div>
                                                <div className="h-2 bg-gray-200 rounded w-32"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-2 bg-gray-200 rounded"></div>
                                            <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                                            <div className="h-2 bg-gray-200 rounded w-4/6"></div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                                            <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                                            <div className="h-6 bg-gray-200 rounded-full w-14"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={landingPageStyles.featuresSection}>
                    <div className={landingPageStyles.featuresContainer}>
                        <div className={landingPageStyles.featuresHeader}>
                            <h2 className={landingPageStyles.featuresTitle}>
                                Why Choose <span className={landingPageStyles.featuresTitleGradient}>
                                    RESUMEFLOW?
                                </span>
                            </h2>
                            <p className={landingPageStyles.featuresDescription}>
                                Everything you need to create a professional resume that stands out
                            </p>
                        </div>

                        <div className={landingPageStyles.featuresGrid}>
                            {[
                                {
                                    icon: <CheckCircle className={landingPageStyles.featureIcon} />,
                                    title: "EASY DRAG & DROP",
                                    description: "Create professional resumes in under 5 minutes with our streamlined process",
                                    gradient: landingPageStyles.featureIconViolet,
                                    bg: landingPageStyles.featureCardViolet
                                },
                                {
                                    icon: <Rocket className={landingPageStyles.featureIcon} />,
                                    title: "EXPERT TEMPLATES",
                                    description: "Choose from dozens of recruiter-approved, industry-specific templates",
                                    gradient: landingPageStyles.featureIconFuchsia,
                                    bg: landingPageStyles.featureCardFuchsia
                                },
                                {
                                    icon: <Shield className={landingPageStyles.featureIcon} />,
                                    title: "HR-APPROVED",
                                    description: "Download high-quality PDFs instantly with perfect formatting",
                                    gradient: landingPageStyles.featureIconOrange,
                                    bg: landingPageStyles.featureCardOrange
                                }
                            ].map((feature, idx) => (
                                <div key={idx} className={landingPageStyles.featureCard}>
                                    <div className={landingPageStyles.featureCardHover}></div>
                                    <div className={`${landingPageStyles.featureCardContent} ${feature.bg}`}>
                                        <div className={`${landingPageStyles.featureIconContainer} ${feature.gradient}`}>
                                            {feature.icon}
                                        </div>
                                        <h3 className={landingPageStyles.featureTitle}>
                                            {feature.title}
                                        </h3>
                                        <p className={landingPageStyles.featureDescription}>
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className={landingPageStyles.ctaSection}>
                    <div className={landingPageStyles.ctaContainer}>
                        <div className={landingPageStyles.ctaCard}>
                            <div className={landingPageStyles.ctaCardBg}></div>
                            <div className={landingPageStyles.ctaCardContent}>
                                <h2 className={landingPageStyles.ctaTitle}>
                                    Ready to Build Your <span className={landingPageStyles.ctaTitleGradient}>
                                        Standout Resume?
                                    </span>
                                </h2>
                                <p className={landingPageStyles.ctaDescription}>
                                    Join thousands of professionals who landed their dream jobs with our platform
                                </p>
                                <button className={landingPageStyles.ctaButton} onClick={handleCTA}>
                                    <div className={landingPageStyles.ctaButtonOverlay}></div>
                                    <span className={landingPageStyles.ctaButtonText}>CREATE MY RESUME - IT'S FREE!</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className={landingPageStyles.footer}>
                <div className={landingPageStyles.footerContainer}>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex gap-6 text-sm text-gray-600">
                            <a href="#" className="hover:text-gray-900 transition-colors">About Us</a>
                            <a href="#" className="hover:text-gray-900 transition-colors">Support</a>
                            <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
                        </div>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Facebook</a>
                            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Twitter</a>
                            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">YouTube</a>
                            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Instagram</a>
                        </div>
                    </div>
                </div>
            </footer>

            <Modal isOpen={openAuthModal} onClose={() => {
                setOpenAuthModal(false);
                setCurrentPage("login");
            }} hideHeader>
                <div>
                    {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
                    {currentPage === "signup" && <Signup setCurrentPage={setCurrentPage} />}
                </div>
            </Modal>
        </div>
    )
}

export default LandingPage