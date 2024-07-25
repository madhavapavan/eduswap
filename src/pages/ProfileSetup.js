import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import '../styles/ProfileSetup.css'; // Ensure you have this CSS file

const db = getFirestore();

const ProfileSetup = () => {
  const [skills, setSkills] = useState([]);
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const navigate = useNavigate();

  const handleAddSkill = () => {
    if (newSkill.trim() !== '') {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const handleCompleteProfile = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userRef = doc(db, 'users', user.uid);
      try {
        await updateDoc(userRef, { skills, branch, year, profileComplete: true });
        navigate('/dashboard'); // Redirect to Dashboard on completion
      } catch (error) {
        console.error('Error updating profile: ', error);
        alert('Failed to update profile. Please try again.');
      }
    } else {
      console.error('No user is signed in');
      alert('No user is signed in. Please sign in again.');
    }
  };

  return (
    <div className="profile-setup">
      <h2>Complete Your Profile</h2>
      <label>
        Branch:
        <input
          type="text"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          required
        />
      </label>
      <label>
        Year:
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
      </label>
      <label>
        Skills:
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />
        <button type="button" onClick={handleAddSkill}>Add</button>
      </label>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
      <button type="button" onClick={handleCompleteProfile}>Complete</button>
    </div>
  );
};

export default ProfileSetup;
