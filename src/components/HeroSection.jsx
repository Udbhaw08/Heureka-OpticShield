import './HeroSection.css'

function HeroSection() {
    return (
        <section className="hero">
            <div className="section-label">
                <span className="section-number">[002]</span> THE PROBLEM
            </div>
            <h1 className="hero-title">
                System
                <br />
                Failure
            </h1>

            <div className="problem-section">
                <span className="problem-label">ERR_01</span>
                <h2 className="problem-title">Disconnected Tools</h2>
                <p className="problem-description">
                    Data is fragmented across dashboards. Context is lost. Your team acts as
                    the manual API.
                </p>
            </div>

            {/* Progress bar */}
            <div className="progress-bar">
                <div className="progress-fill"></div>
            </div>
        </section>
    )
}

export default HeroSection
