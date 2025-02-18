import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import Modal from 'react-modal';
import Spinner from 'react-bootstrap/Spinner';
import '../styles/ProfilePage.css';
import logo from '../images/logo.jpg'; // Update the path to your logo

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProfile, setEditProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      const auth = getAuth();
      const db = getFirestore();

      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          try {
            const userDoc = doc(db, 'users', currentUser.uid);
            const userSnapshot = await getDoc(userDoc);
            if (userSnapshot.exists()) {
              setProfile(userSnapshot.data());
            } else {
              setError('Profile not found');
            }
          } catch (err) {
            console.error('Error fetching profile:', err);
            setError('Failed to fetch profile.');
          } finally {
            setLoading(false);
          }
        } else {
          setError('No user is signed in.');
          setLoading(false);
        }
      });
    };

    fetchProfile();
  }, []);

  const openModal = () => {
    setEditProfile(profile);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditProfile({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProfile((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = async () => {
    const auth = getAuth();
    const db = getFirestore();

    if (auth.currentUser) {
      try {
        await updateDoc(doc(db, 'users', auth.currentUser.uid), editProfile);
        setProfile(editProfile);
        alert('Profile updated successfully!');
        closeModal();
      } catch (err) {
        console.error('Error updating profile:', err);
        alert('Failed to update profile.');
      }
    }
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
          <li><Link to="/chat">chat</Link></li>
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
            <h2>{profile.branch} - {profile.year}</h2>
            <h3>{profile.role}</h3>
            <p>{profile.bio}</p>
            <p>{profile.institution}</p>
            <button onClick={openModal} className="edit-profile-button">Edit Profile</button>
          </div>
        </header>
        <main className="profile-main">
          <section className="profile-section">
            <h3>Skills</h3>
            <ul>
              {Array.isArray(profile.skills) ? (
                profile.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))
              ) : (
                <li>{profile.skills}</li>
              )}
            </ul>
          </section>
          <section className="profile-section">
            <h3>Experience</h3>
            <p>{profile.experience}</p>
          </section>
          <section className="profile-section">
            <h3>Certifications</h3>
            <p>{profile.certifications}</p>
          </section>
          <section className="profile-section">
            <h3>Projects</h3>
            <p>{profile.projects}</p>
          </section>
        </main>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="Modal__Content"
        overlayClassName="Modal__Overlay"
      >
        <div className="Modal__Header">
          <h2>Edit Profile</h2>
        </div>
        <div className="Modal__Body">
          <form>
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" value={editProfile.name || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Branch</label>
              <input type="text" name="branch" value={editProfile.branch || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Year</label>
              <input type="text" name="year" value={editProfile.year || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Role</label>
              <input type="text" name="role" value={editProfile.role || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea name="bio" value={editProfile.bio || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Institution</label>
              <input type="text" name="institution" value={editProfile.institution || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Skills</label>
              <input type="text" name="skills" value={editProfile.skills || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Experience</label>
              <textarea name="experience" value={editProfile.experience || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Certifications</label>
              <textarea name="certifications" value={editProfile.certifications || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Projects</label>
              <textarea name="projects" value={editProfile.projects || ''} onChange={handleChange} />
            </div>
          </form>
        </div>
        <div className="Modal__Footer">
          <button className="Modal__CloseButton" onClick={closeModal}>Close</button>
          <button className="Modal__SaveButton" onClick={saveProfile}>Save</button>
        </div>
      </Modal>
    </div>
  );
};

export default ProfilePage;