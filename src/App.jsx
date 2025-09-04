import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [displayText, setDisplayText] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  const messages = [
    "Welcome to my portfolio website!",
    "I'm Joana, a future IT professional.",
    "Check out my projects below!",
  ];

  const projects = [
    {
      title: "Project 1",
      description: "A modern UX design showcase.",
      category: "UX Design",
      image: "https://devsquad-website.s3.us-east-1.amazonaws.com/https:/devsquad-blog-14-ux-design-principles-header_dc70baaefada8c26491d4f26453b534c_2000.jpg",
    },
    {
      title: "Project 2",
      description: "Photography portfolio website.",
      category: "Photography",
      image: "https://htmlburger.com/blog/wp-content/uploads/2024/04/squarespace-photography-websites.jpg",
    },
    {
      title: "Project 3",
      description: "Creative media showcase.",
      category: "Web Development",
      image: "https://i.ytimg.com/vi/LaQ7l3izlRE/sddefault.jpg",
    }
  ];

  // Navbar toggle
  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  // Theme toggle
  function toggleTheme() {
    setDarkMode((prev) => {
      const newTheme = !prev;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  }

  // Apply dark mode
  useEffect(() => {
    if (darkMode) document.body.classList.add("dark-mode");
    else document.body.classList.remove("dark-mode");
  }, [darkMode]);

  // Typewriter effect
  useEffect(() => {
    let messageIndex = 0;
    let charIndex = 0;

    function type() {
      if (messageIndex >= messages.length) messageIndex = 0;

      const currentMessage = messages[messageIndex];
      setDisplayText(currentMessage.slice(0, charIndex++));

      if (charIndex > currentMessage.length) {
        setTimeout(() => {
          charIndex = 0;
          messageIndex++;
          setTimeout(type, 1000);
        }, 1500);
      } else {
        setTimeout(type, 75);
      }
    }

    type();
  }, []);

  // Filtered projects
  const filteredProjects = filter === "All" ? projects : projects.filter(p => p.category === filter);

  // Update itemsPerView based on window width
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 600) setItemsPerView(1);
      else if (window.innerWidth < 900) setItemsPerView(2);
      else setItemsPerView(3);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Carousel navigation
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerView) % filteredProjects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - itemsPerView + filteredProjects.length) % filteredProjects.length);
  };

  // Get visible projects
  const visibleProjects = filteredProjects.slice(currentIndex, currentIndex + itemsPerView);
  if (visibleProjects.length < itemsPerView) {
    visibleProjects.push(...filteredProjects.slice(0, itemsPerView - visibleProjects.length));
  }

  return (
    <>
      {/* Navbar */}
      <nav className={`navbar ${menuOpen ? "responsive" : ""}`} id="navbar">
        <a href="#home">Home</a>
        <a href="#about">About Me</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
        <button className="icon" onClick={toggleMenu}>{menuOpen ? "✖" : "☰"}</button>
      </nav>

      {/* Hero */}
      <section id="home" className="hero">
        <h1 id="typewriter">{displayText}</h1>
        <button id="theme-toggle" onClick={toggleTheme}>Toggle Dark Mode</button>
      </section>

      {/* About */}
      <section id="about">
        <h2>About Me</h2>
        <p>
          I'm a dedicated professional with a strong background in customer service
          and a growing passion for technology. I'm expanding my skills in IT support and QA testing,
          eager to transition into a technical role combining experience with tech expertise.
        </p>
      </section>

      {/* Projects */}
      <section id="projects">
        <h2>My Projects</h2>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          {["All", "UX Design", "Web Development", "Photography"].map((cat) => (
            <button
              key={cat}
              className={filter === cat ? "active" : ""}
              onClick={() => {
                setFilter(cat);
                setCurrentIndex(0);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Carousel */}
        {filteredProjects.length > 0 && (
          <div className="carousel-container">
            <button className="carousel-btn prev" onClick={prevSlide}>❮</button>
            <div className="carousel-slide">
              {visibleProjects.map((p, idx) => (
                <div className="card" key={idx}>
                  <img src={p.image} alt={p.title} />
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </div>
              ))}
            </div>
            <button className="carousel-btn next" onClick={nextSlide}>❯</button>
          </div>
        )}
      </section>

      {/* Contact */}
      <section id="contact" className="contact-form">
        <h2>Contact Me</h2>
        <form>
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" required />
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" required />
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2025 Joana Coureau. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
