const zipCodeData = {
    "33782": { lat: 27.8567, lon: -82.7294 }, // Pinellas Park, FL
    "34683": { lat: 28.0697, lon: -82.7673 }, // Palm Harbor, FL
    "33601": { lat: 27.9475, lon: -82.4588 }, // Tampa, FL
    "90001": { lat: 33.9731, lon: -118.2479 }, // Los Angeles, CA
    "90210": { lat: 34.1031, lon: -118.4128 } // Beverly Hills, CA
  };
  
  function getZipCodeCoords(zipCode) {
    const coords = zipCodeData[zipCode];
    if (!coords) {
      console.warn(`No coordinates for ZIP: ${zipCode}`);
      return null;
    }
    return coords;
  }
  
  function calculateDistance(zip1, zip2) {
    const coords1 = getZipCodeCoords(zip1);
    const coords2 = getZipCodeCoords(zip2);
    if (!coords1 || !coords2) {
      console.warn(`Cannot calculate distance: Invalid ZIP ${zip1} or ${zip2}`);
      return null;
    }
  
    const { lat: lat1, lon: lon1 } = coords1;
    const { lat: lat2, lon: lon2 } = coords2;
  
    const R = 3958.8; // Earth's radius in miles
    const toRad = (deg) => deg * Math.PI / 180;
  
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const lat1Rad = toRad(lat1);
    const lat2Rad = toRad(lat2);
  
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
  
    console.log(`Calculated distance between ${zip1} and ${zip2}: ${distance.toFixed(2)} miles`);
    return distance;
  }
  
  window.functions = {
    getZipCodeCoords,
    calculateDistance
  };



  function getLayoutClasses(isMobile) {
    console.log('getLayoutClasses called, isMobile:', isMobile);
    return {
      mainClasses: isMobile 
        ? 'flex-grow pt-20 py-4 px-2 sm:py-12 sm:px-4'
        : 'flex-grow pt-20 sm:pt-0 sm:py-12 sm:px-4',
      divClasses: isMobile 
        ? 'flex flex-col md:flex-row'
        : 'container flex flex-col md:flex-row'
    };
  }
  
  async function fetchUserProfile(userId, isUsername = false) {
    console.log('fetchUserProfile called:', { userId, isUsername });
    try {
      let actualUserId = userId;
      if (isUsername) {
        const usernameDoc = await window.firebase.getDoc(window.firebase.doc(window.firebase.db, 'usernames', userId));
        if (!usernameDoc.exists() || !usernameDoc.data()?.uid) {
          console.warn(`Username not found: ${userId}, falling back to UID`);
          actualUserId = userId;
        } else {
          actualUserId = usernameDoc.data().uid;
          console.log(`Resolved username ${userId} to UID ${actualUserId}`);
        }
      }
      sessionStorage.removeItem(`userProfile_${actualUserId}`);
      const userDoc = await window.firebase.getDoc(window.firebase.doc(window.firebase.db, 'users', actualUserId));
      const defaultPicture = 'https://placehold.co/40x40?text=User';
      if (!userDoc.exists()) {
        console.warn(`No user profile for UID: ${actualUserId}, using defaults`);
        return {
          username: 'Unknown User',
          profilePicture: defaultPicture,
          uid: actualUserId,
          dob: '',
          gender: '',
          race: '',
          relationshipType: '',
          height: 0,
          weight: 0,
          bodyType: '',
          zipCode: ''
        };
      }
      const data = userDoc.data();
      let profilePicture = defaultPicture;
      if (data.images?.mainProfilePic?.url && data.images?.mainProfilePic?.active) {
        profilePicture = data.images.mainProfilePic.url;
        try {
          new URL(profilePicture);
          console.log(`Valid profile picture URL for ${actualUserId}: ${profilePicture}`);
        } catch {
          console.warn(`Invalid profile picture URL for ${actualUserId}: ${profilePicture}, using default`);
          profilePicture = defaultPicture;
        }
      } else {
        console.log(`No active profile picture for ${actualUserId}, using default`);
      }
      const profile = {
        username: data.basicInfo?.username || data.username || 'Unknown User',
        profilePicture,
        uid: actualUserId,
        dob: data.basicInfo?.dateOfBirth || '',
        gender: data.basicInfo?.genderIdentity || '',
        race: data.physicalAttributes?.ethnicity || '',
        relationshipType: data.basicInfo?.relationshipStatus || '',
        height: parseInt(data.physicalAttributes?.height, 10) || 0,
        weight: parseInt(data.physicalAttributes?.weight, 10) || 0,
        bodyType: data.physicalAttributes?.bodyType || '',
        zipCode: data.locationLogistics?.zipCode || ''
      };
      console.log(`Fetched profile for ${actualUserId}:`, profile);
      sessionStorage.setItem(`userProfile_${actualUserId}`, JSON.stringify(profile));
      return profile;
    } catch (error) {
      console.error('fetchUserProfile error:', error.message, error.stack);
      return {
        username: 'Unknown User',
        profilePicture: 'https://placehold.co/40x40?text=User',
        uid: userId,
        dob: '',
        gender: '',
        race: '',
        relationshipType: '',
        height: 0,
        weight: 0,
        bodyType: '',
        zipCode: ''
      };
    }
  }