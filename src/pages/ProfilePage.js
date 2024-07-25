import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProfilePage.css';
import logo from '../images/logo.jpg'; // Update the path to your logo

const ProfilePage = () => {
  // Dummy profile data
  const profile = {
    name: 'Irfan',
    title: 'Btech 3rd Year',
    skills: ['JavaScript', 'React', 'Node.js'],
    experience: [
      { role: 'Frontend Developer', company: 'Company A', duration: 'Jan 2020 - Dec 2022' },
      { role: 'Backend Developer', company: 'Company B', duration: 'Jan 2018 - Dec 2019' }
    ],
    certifications: ['Certified React Developer', 'AWS Certified Solutions Architect'],
    projects: [
      { title: 'Project A', description: 'A project description' },
      { title: 'Project B', description: 'Another project description' }
    ]
  };

  return (
    <div className="profile-page">
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
      <div className="profile-content">
        <header className="profile-header">
          <div className="profile-image-container">
            <img src={logo} alt="Profile" className="profile-image" />
          </div>
          <div className="profile-info">
            <h1>{profile.name}</h1>
            <h2>{profile.title}</h2>
          </div>
        </header>
        <main className="profile-main">
          <section className="profile-section">
            <h3>Skills</h3>
            <ul>
              {profile.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </section>
          <section className="profile-section">
            <h3>Experience</h3>
            <ul>
              {profile.experience.map((exp, index) => (
                <li key={index}>
                  <strong>{exp.role}</strong> at <em>{exp.company}</em> ({exp.duration})
                </li>
              ))}
            </ul>
          </section>
          <section className="profile-section">
            <h3>Certifications</h3>
            <ul>
              {profile.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </section>
          <section className="profile-section">
            <h3>Projects</h3>
            <ul>
              {profile.projects.map((proj, index) => (
                <li key={index}>
                  <strong>{proj.title}</strong>: {proj.description}
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
