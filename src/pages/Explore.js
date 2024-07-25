import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Explore.css';
import defaultProfileImage from '../images/default-profile.png';

// Dummy data for demonstration
const profiles = [
  {
    name: 'Ajay Kumar',
    role: '3rd year',
    skills: ['Java', 'Python', 'Front-end Development'],
    projects: 2,
    certifications: ['Certified React Developer', 'JavaScript Mastery'],
    rating: 4.9,
    image: defaultProfileImage,
    rate: 75,
  },
  {
    name: 'irfan Shaik',
    role: '4th Year',
    skills: ['C++', 'Python', 'Back-end Development'],
    projects: 5,
    certifications: ['Certified C++ Developer', 'Python Expert'],
    rating: 4.8,
    image: defaultProfileImage,
    rate: 80,
  },
  {
    name: 'Sameer',
    role: '1st Year',
    skills: ['Photoshop', 'Illustrator', 'UI/UX Design'],
    projects: 8,
    certifications: ['Adobe Certified Expert'],
    rating: 4.7,
    image: defaultProfileImage,
    rate: 60,
  },
  {
    name: 'Satvik',
    role: '2nd Year',
    skills: ['R', 'Python', 'Machine Learning'],
    projects: 4,
    certifications: ['Certified Data Scientist'],
    rating: 4.9,
    image: defaultProfileImage,
    rate: 90,
  },
  {
    name: 'Madhava',
    role: '1st Year',
    skills: ['SEO', 'Content Marketing', 'Social Media'],
    projects: 10,
    certifications: ['Certified Digital Marketer'],
    rating: 4.6,
    image: defaultProfileImage,
    rate: 50,
  },
  {
    name: 'Madhan',
    role: '1st year',
    skills: ['Project Planning', 'Agile', 'Scrum'],
    projects: 6,
    certifications: ['PMP', 'Scrum Master'],
    rating: 4.8,
    image: defaultProfileImage,
    rate: 85,
  },
  {
    name: 'Grace Lee',
    role: 'Mobile Developer',
    skills: ['Swift', 'Kotlin', 'React Native'],
    projects: 7,
    certifications: ['Certified Mobile Developer'],
    rating: 4.9,
    image: defaultProfileImage,
    rate: 70,
  },
  {
    name: 'Henry Taylor',
    role: 'Cybersecurity Expert',
    skills: ['Network Security', 'Ethical Hacking', 'Penetration Testing'],
    projects: 3,
    certifications: ['Certified Ethical Hacker'],
    rating: 4.7,
    image: defaultProfileImage,
    rate: 95,
  },
  {
    name: 'Isabel Martinez',
    role: 'Business Analyst',
    skills: ['Data Analysis', 'Business Strategy', 'Requirements Gathering'],
    projects: 9,
    certifications: ['Certified Business Analyst'],
    rating: 4.6,
    image: defaultProfileImage,
    rate: 65,
  },
  {
    name: 'Jack Wilson',
    role: 'DevOps Engineer',
    skills: ['Docker', 'Kubernetes', 'CI/CD'],
    projects: 4,
    certifications: ['Certified Kubernetes Administrator'],
    rating: 4.8,
    image: defaultProfileImage,
    rate: 90,
  },
  {
    name: 'Karen Young',
    role: 'Technical Writer',
    skills: ['Documentation', 'Technical Writing', 'API Documentation'],
    projects: 12,
    certifications: ['Certified Technical Writer'],
    rating: 4.9,
    image: defaultProfileImage,
    rate: 55,
  },
  {
    name: 'Liam Harris',
    role: 'Cloud Architect',
    skills: ['AWS', 'Azure', 'GCP'],
    projects: 5,
    certifications: ['AWS Certified Solutions Architect'],
    rating: 4.7,
    image: defaultProfileImage,
    rate: 100,
  },
];

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState(profiles);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      let lastScrollTop = 0;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        navbar.classList.add('hidden');
      } else {
        navbar.classList.remove('hidden');
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    if (query === '') {
      setFilteredProfiles(profiles);
    } else {
      const filtered = profiles.filter(profile =>
        profile.name.toLowerCase().includes(query) ||
        profile.skills.some(skill => skill.toLowerCase().includes(query))
      );
      setFilteredProfiles(filtered);
    }
  };

  return (
    <div className="explore">
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
      <header className="explore-header">
        <h1>Explore Profiles</h1>
      </header>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for name or skills..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <button>Search</button>
        <Link to="/advanced-search">Advanced Search</Link>
      </div>
      <main className="explore-main freelancers-container">
        {filteredProfiles.map((profile, index) => (
          <div key={index} className="freelancer-box">
            <img src={profile.image} alt={`${profile.name}`} className="profile-image" onClick={() => alert(`Showing detailed profile for ${profile.name}`)} />
            <h3>{profile.name}</h3>
            <p>{profile.role}</p>
            <div className="rating">{'⭐'.repeat(Math.floor(profile.rating))} ({profile.rating})</div>
            <div className="skills">
              {profile.skills.map((skill, i) => (
                <span key={i} className="skill">{skill}</span>
              ))}
            </div>
            <p><i className="fas fa-briefcase"></i> {profile.projects} completed projects</p>
            <div className="buttons">
              <button className="button view-profile" onClick={() => alert(`Showing detailed profile for ${profile.name}`)}>View Profile</button>
              <button className="button hire-now">Request</button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Explore;
