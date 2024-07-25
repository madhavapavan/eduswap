import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css'; // Ensure you have this CSS file

// Dummy data for demonstration
const user = {
  name: 'Irfan',
  skills: ['JavaScript', 'React', 'Node.js'],
  notifications: [
    'You have a new skill request!',
    'Your skill exchange with Jane Doe has been approved.',
  ],
};

const images = [
  '/images/EduSwap.png', // Replace with your image URLs
  '/images/image1.png',
  '/images/image.png',
];

function Dashboard() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log(`Current index: ${currentIndex}`);
    console.log(`Current image: ${images[currentIndex]}`);
  }, [currentIndex]);

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">EduSwap</Link>
        </div>
        <ul className="navbar-nav">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/explore">Explore</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </nav>
      <header className="dashboard-header">
        <h1>Welcome, {user.name}!</h1>
        <div className="image-slider">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className={index === currentIndex ? 'visible' : 'hidden'}
            />
          ))}
        </div>
      </header>
      <main className="dashboard-main">
        <section className="dashboard-overview">
          <h2>Your Skills</h2>
          <ul>
            {user.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>
        <section className="dashboard-notifications">
          <h2>Notifications</h2>
          <ul>
            {user.notifications.map((notification, index) => (
              <li key={index}>{notification}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
