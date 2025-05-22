// Replace with your Cloudinary credentials
const CLOUDINARY_CLOUD_NAME = 'ddmrplnut'; // e.g., 'dabcdef123'
const CLOUDINARY_UPLOAD_PRESET = 'realvibin_unsigned'; // e.g., 'ml_default'

function SignupForm() {
  // Basic Information
  const [firstName, setFirstName] = window.React.useState('');
  const [lastName, setLastName] = window.React.useState('');
  const [username, setUsername] = window.React.useState('');
  const [email, setEmail] = window.React.useState('');
  const [password, setPassword] = window.React.useState('');
  const [confirmPassword, setConfirmPassword] = window.React.useState('');
  const [rawPhoneNumber, setRawPhoneNumber] = window.React.useState('');
  const [phoneNumber, setPhoneNumber] = window.React.useState('');
  const [dateOfBirth, setDateOfBirth] = window.React.useState('');
  const [genderIdentity, setGenderIdentity] = window.React.useState('');
  const [sexualOrientation, setSexualOrientation] = window.React.useState('');
  const [relationshipStatus, setRelationshipStatus] = window.React.useState('');
  const [interestedIn, setInterestedIn] = window.React.useState('');

  // Physical Attributes
  const [height, setHeight] = window.React.useState('');
  const [bodyType, setBodyType] = window.React.useState('');
  const [hairColor, setHairColor] = window.React.useState('');
  const [eyeColor, setEyeColor] = window.React.useState('');
  const [ethnicity, setEthnicity] = window.React.useState('');
  const [distinguishingFeatures, setDistinguishingFeatures] = window.React.useState('');

  // Lifestyle & Habits
  const [drinkingHabits, setDrinkingHabits] = window.React.useState('');
  const [smokingHabits, setSmokingHabits] = window.React.useState('');
  const [fourTwentyFriendly, setFourTwentyFriendly] = window.React.useState('');
  const [otherSubstanceUse, setOtherSubstanceUse] = window.React.useState('');
  const [occupation, setOccupation] = window.React.useState('');
  const [languagesSpoken, setLanguagesSpoken] = window.React.useState('');
  const [pets, setPets] = window.React.useState('');
  const [children, setChildren] = window.React.useState('');

  // Location & Logistics
  const [currentCity, setCurrentCity] = window.React.useState('');
  const [zipCode, setZipCode] = window.React.useState('');
  const [neighborhood, setNeighborhood] = window.React.useState('');

  // Interests & Lifestyle
  const [favoriteActivities, setFavoriteActivities] = window.React.useState('');
  const [musicPreferences, setMusicPreferences] = window.React.useState('');
  const [introvertExtrovert, setIntrovertExtrovert] = window.React.useState('');
  const [morningNight, setMorningNight] = window.React.useState('');

  // Relationship Preferences
  const [dealBreakers, setDealBreakers] = window.React.useState('');
  const [mustHaves, setMustHaves] = window.React.useState('');
  const [livingArrangementPrefs, setLivingArrangementPrefs] = window.React.useState('');
  const [communicationStyle, setCommunicationStyle] = window.React.useState('');
  const [attachmentStyle, setAttachmentStyle] = window.React.useState('');

  // Written Sections
  const [bio, setBio] = window.React.useState('');
  const [lookingFor, setLookingFor] = window.React.useState('');
  const [idealFirstDate, setIdealFirstDate] = window.React.useState('');
  const [favoriteQuote, setFavoriteQuote] = window.React.useState('');
  const [funFact, setFunFact] = window.React.useState('');
  const [conversationStarters, setConversationStarters] = window.React.useState('');

  // Image Sections
  const [mainProfilePic, setMainProfilePic] = window.React.useState(null); // { file, preview, url, public_id }
  const [standardPics, setStandardPics] = window.React.useState([]); // [{ file, preview, url, public_id, active, id }]
  const [privatePics, setPrivatePics] = window.React.useState([]); // [{ file, preview, url, public_id, active, id }]
  const [uploading, setUploading] = window.React.useState(false);

  // Form State
  const [error, setError] = window.React.useState(null);
  const [success, setSuccess] = window.React.useState(false);
  const [passwordMatch, setPasswordMatch] = window.React.useState(null);
  const [locationInfo, setLocationInfo] = window.React.useState('');
  const [isUpdate, setIsUpdate] = window.React.useState(false);
  const [loading, setLoading] = window.React.useState(true);

  // Fetch user data if logged in
  window.React.useEffect(() => {
    if (!window.firebase.auth || !window.firebase.db) {
      setError('Authentication or database service not available.');
      setLoading(false);
      return;
    }

    const unsubscribe = window.firebase.onAuthStateChanged(window.firebase.auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await window.firebase.getDoc(
            window.firebase.doc(window.firebase.db, 'users', currentUser.uid)
          );
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setIsUpdate(true);
            // Basic Information
            setFirstName(userData.basicInfo.firstName || '');
            setLastName(userData.basicInfo.lastName || '');
            setUsername(userData.basicInfo.username || '');
            setEmail(userData.basicInfo.email || '');
            setRawPhoneNumber(userData.basicInfo.phoneNumber || '');
            setPhoneNumber(formatPhoneNumber(userData.basicInfo.phoneNumber || ''));
            setDateOfBirth(userData.basicInfo.dateOfBirth || '');
            setGenderIdentity(userData.basicInfo.genderIdentity || '');
            setSexualOrientation(userData.basicInfo.sexualOrientation || '');
            setRelationshipStatus(userData.basicInfo.relationshipStatus || '');
            setInterestedIn(userData.basicInfo.interestedIn || '');
            // Physical Attributes
            setHeight(userData.physicalAttributes.height?.toString() || '');
            setBodyType(userData.physicalAttributes.bodyType || '');
            setHairColor(userData.physicalAttributes.hairColor || '');
            setEyeColor(userData.physicalAttributes.eyeColor || '');
            setEthnicity(userData.physicalAttributes.ethnicity || '');
            setDistinguishingFeatures(userData.physicalAttributes.distinguishingFeatures || '');
            // Lifestyle & Habits
            setDrinkingHabits(userData.lifestyleHabits.drinkingHabits || '');
            setSmokingHabits(userData.lifestyleHabits.smokingHabits || '');
            setFourTwentyFriendly(userData.lifestyleHabits.fourTwentyFriendly || '');
            setOtherSubstanceUse(userData.lifestyleHabits.otherSubstanceUse || '');
            setOccupation(userData.lifestyleHabits.occupation || '');
            setLanguagesSpoken(userData.lifestyleHabits.languagesSpoken || '');
            setPets(userData.lifestyleHabits.pets || '');
            setChildren(userData.lifestyleHabits.children || '');
            // Location & Logistics
            setZipCode(userData.locationLogistics.zipCode || '');
            setCurrentCity(userData.locationLogistics.currentCity || '');
            setNeighborhood(userData.locationLogistics.neighborhood || '');
            // Interests & Lifestyle
            setFavoriteActivities(userData.interestsLifestyle.favoriteActivities || '');
            setMusicPreferences(userData.interestsLifestyle.musicPreferences || '');
            setIntrovertExtrovert(userData.interestsLifestyle.introvertExtrovert || '');
            setMorningNight(userData.interestsLifestyle.morningNight || '');
            // Relationship Preferences
            setDealBreakers(userData.relationshipPreferences.dealBreakers || '');
            setMustHaves(userData.relationshipPreferences.mustHaves || '');
            setLivingArrangementPrefs(userData.relationshipPreferences.livingArrangementPrefs || '');
            setCommunicationStyle(userData.relationshipPreferences.communicationStyle || '');
            setAttachmentStyle(userData.relationshipPreferences.attachmentStyle || '');
            // Written Sections
            setBio(userData.writtenSections.bio || '');
            setLookingFor(userData.writtenSections.lookingFor || '');
            setIdealFirstDate(userData.writtenSections.idealFirstDate || '');
            setFavoriteQuote(userData.writtenSections.favoriteQuote || '');
            setFunFact(userData.writtenSections.funFact || '');
            setConversationStarters(userData.writtenSections.conversationStarters || '');
            // Images
            if (userData.images.mainProfilePic) {
              setMainProfilePic({
                preview: userData.images.mainProfilePic.url,
                url: userData.images.mainProfilePic.url,
                public_id: userData.images.mainProfilePic.public_id,
                active: userData.images.mainProfilePic.active,
              });
            }
            setStandardPics(
              (userData.images.standardPics || []).map((pic, index) => ({
                preview: pic.url,
                url: pic.url,
                public_id: pic.public_id,
                active: pic.active,
                id: `${pic.public_id}-${index}`,
              }))
            );
            setPrivatePics(
              (userData.images.privatePics || []).map((pic, index) => ({
                preview: pic.url,
                url: pic.url,
                public_id: pic.public_id,
                active: pic.active,
                id: `${pic.public_id}-${index}`,
              }))
            );
          } else {
            console.warn('User document not found for UID:', currentUser.uid);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError('Failed to load user data.');
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  window.React.useEffect(() => {
    if (password && confirmPassword) {
      setPasswordMatch(password === confirmPassword);
    } else {
      setPasswordMatch(null);
    }
  }, [password, confirmPassword]);

  const generateUniqueId = (file) => {
    return `${file.name}-${file.size}-${file.lastModified}`;
  };

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    for (const file of files) {
      if (file.size > maxSize) {
        setError(`File "${file.name}" exceeds 5MB limit.`);
        return;
      }
    }

    if (type === 'main') {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setMainProfilePic({ file, preview: reader.result });
      };
      reader.readAsDataURL(file);
    } else if (type === 'standard') {
      const newFiles = files.slice(0, 12 - standardPics.length);
      Promise.all(
        newFiles.map(file => {
          return new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = () => {
              resolve({ file, preview: reader.result, active: true, id: generateUniqueId(file) });
            };
            reader.readAsDataURL(file);
          });
        })
      ).then(newPics => {
        setStandardPics(prev => [...prev, ...newPics].slice(0, 12));
      });
    } else if (type === 'private') {
      Promise.all(
        files.map(file => {
          return new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = () => {
              resolve({ file, preview: reader.result, active: true, id: generateUniqueId(file) });
            };
            reader.readAsDataURL(file);
          });
        })
      ).then(newPics => {
        setPrivatePics(prev => [...prev, ...newPics]);
      });
    }
    e.target.value = ''; // Reset input for re-selection
  };

  const handleDeleteMainPic = () => {
    if (standardPics.length > 0) {
      const newMainPic = standardPics.find(pic => pic.active);
      if (newMainPic) {
        setMainProfilePic(newMainPic);
        setStandardPics(standardPics.filter(pic => pic.id !== newMainPic.id));
      } else {
        setMainProfilePic(null);
      }
    } else {
      setMainProfilePic(null);
    }
  };

  const handleMarkInactive = (id, type) => {
    if (type === 'standard') {
      setStandardPics(standardPics.map(pic =>
        pic.id === id ? { ...pic, active: false } : pic
      ));
    } else if (type === 'private') {
      setPrivatePics(privatePics.map(pic =>
        pic.id === id ? { ...pic, active: false } : pic
      ));
    }
  };

  const uploadImageToCloudinary = async (file) => {
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      throw new Error('Cloudinary configuration is missing. Please set cloud_name and upload_preset.');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', 'user_profiles');

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.message);
      }
      return { public_id: data.public_id, url: data.secure_url };
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw error;
    }
  };

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const handlePhoneNumberChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '');
    setRawPhoneNumber(digits);
    setPhoneNumber(formatPhoneNumber(digits));
  };

  const handleZipCodeBlur = () => {
    if (!zipCode) {
      setLocationInfo('');
      return;
    }

    const isCanadian = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/i.test(zipCode);
    if (isCanadian) {
      setLocationInfo('');
      return;
    }

    if (/^\d{5}$/.test(zipCode)) {
      fetch(`http://api.zippopotam.us/us/${zipCode}`)
        .then(response => response.json())
        .then(data => {
          if (data.places && data.places[0]) {
            const { 'place name': city, 'state abbreviation': state } = data.places[0];
            setCurrentCity(city);
            setLocationInfo(`${city}, ${state}`);
          } else {
            setLocationInfo('Invalid ZIP code');
          }
        })
        .catch(() => setLocationInfo('Error fetching location'));
    } else {
      setLocationInfo('Invalid ZIP code format');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!window.firebase.auth || !window.firebase.db) {
      setError('Authentication or database service not available.');
      return;
    }
    if (!email || !username || !zipCode || !mainProfilePic) {
      setError('Please fill in all required fields (Email, Username, ZIP/Postal Code, Main Profile Picture).');
      return;
    }
    if (!isUpdate && (!password || !confirmPassword)) {
      setError('Please provide and confirm your password.');
      return;
    }
    if (!isUpdate && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setUploading(true);
      setError(null);

      // Upload new images to Cloudinary
      let mainProfilePicData = mainProfilePic.url ? { public_id: mainProfilePic.public_id, url: mainProfilePic.url } : null;
      if (mainProfilePic?.file) {
        mainProfilePicData = await uploadImageToCloudinary(mainProfilePic.file);
      }

      const standardPicsData = await Promise.all(
        standardPics.map(async pic => {
          if (pic.url && !pic.file) {
            return { public_id: pic.public_id, url: pic.url, active: pic.active };
          }
          const { public_id, url } = await uploadImageToCloudinary(pic.file);
          return { public_id, url, active: pic.active };
        })
      );

      const privatePicsData = await Promise.all(
        privatePics.map(async pic => {
          if (pic.url && !pic.file) {
            return { public_id: pic.public_id, url: pic.url, active: pic.active };
          }
          const { public_id, url } = await uploadImageToCloudinary(pic.file);
          return { public_id, url, active: pic.active };
        })
      );

      // Firebase operations with timeout
      const timeoutPromise = (promise, time) => {
        return Promise.race([
          promise,
          new Promise((_, reject) => setTimeout(() => reject(new Error('Operation timed out')), time))
        ]);
      };

      let user = window.firebase.auth.currentUser;
      if (!isUpdate) {
        // Create new user
        const userCredential = await timeoutPromise(
          window.firebase.createUserWithEmailAndPassword(window.firebase.auth, email, password),
          10000
        );
        user = userCredential.user;
      } else if (password && password === confirmPassword) {
        // Update password if provided
        await timeoutPromise(
          window.firebase.updatePassword(user, password),
          10000
        );
      }

      const userData = {
        basicInfo: {
          firstName,
          lastName,
          username,
          email,
          phoneNumber: rawPhoneNumber,
          dateOfBirth,
          genderIdentity,
          sexualOrientation,
          relationshipStatus,
          interestedIn
        },
        physicalAttributes: {
          height: parseInt(height) || 0,
          bodyType,
          hairColor,
          eyeColor,
          ethnicity,
          distinguishingFeatures
        },
        lifestyleHabits: {
          drinkingHabits,
          smokingHabits,
          fourTwentyFriendly,
          otherSubstanceUse,
          occupation,
          languagesSpoken,
          pets,
          children
        },
        locationLogistics: {
          zipCode,
          currentCity,
          neighborhood
        },
        interestsLifestyle: {
          favoriteActivities,
          musicPreferences,
          introvertExtrovert,
          morningNight
        },
        relationshipPreferences: {
          dealBreakers,
          mustHaves,
          livingArrangementPrefs,
          communicationStyle,
          attachmentStyle
        },
        writtenSections: {
          bio,
          lookingFor,
          idealFirstDate,
          favoriteQuote,
          funFact,
          conversationStarters
        },
        images: {
          mainProfilePic: mainProfilePicData ? { public_id: mainProfilePicData.public_id, url: mainProfilePicData.url, active: true } : null,
          standardPics: standardPicsData,
          privatePics: privatePicsData
        },
        updatedAt: window.firebase.serverTimestamp(),
        ...(isUpdate ? {} : { createdAt: window.firebase.serverTimestamp() })
      };

      await timeoutPromise(
        window.firebase.setDoc(
          window.firebase.doc(window.firebase.db, 'users', user.uid),
          userData,
          { merge: true }
        ),
        10000
      );

      console.log(isUpdate ? 'User updated:' : 'User signed up:', user.uid, userData);
      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/index.html';
      }, 2000);
    } catch (error) {
      console.error('Submit error:', error.message, error.code, error.stack);
      setError(`Error: ${error.message}`);
      setSuccess(false);
    } finally {
      setUploading(false);
    }
  };

  return window.React.createElement(
    'div',
    { className: 'bg-white rounded-lg shadow-md p-6 mb-6' },
    window.React.createElement('h2', { className: 'text-2xl font-semibold text-primary mb-4' }, isUpdate ? 'Update Profile' : 'Sign Up'),
    loading
      ? window.React.createElement('div', { className: 'text-center' }, 'Loading profile...')
      : null,
    success &&
      window.React.createElement(
        'div',
        { className: 'bg-green-100 text-green-700 p-4 rounded-lg mb-4' },
        isUpdate ? 'Profile updated successfully! Redirecting...' : 'Account created successfully! Redirecting...'
      ),
    error &&
      window.React.createElement(
        'div',
        { className: 'bg-red-100 text-red-700 p-4 rounded-lg mb-4' },
        error
      ),
    !loading &&
      window.React.createElement(
        'form',
        { onSubmit: handleSubmit, className: 'signup-form-grid space-y-6' },
        // Images Section
        window.React.createElement(
          'div',
          { className: 'col-span-full' },
          window.React.createElement('h3', { className: 'text-xl font-semibold text-dark section-divider' }, 'Images'),
          window.React.createElement(
            'div',
            { className: 'image-section mb-4' },
            window.React.createElement(
              'div',
              { className: 'mr-4' },
              window.React.createElement('label', { className: 'form-label' }, 'Main Profile Picture *'),
              window.React.createElement('input', {
                type: 'file',
                accept: 'image/jpeg,image/png',
                onChange: (e) => handleFileChange(e, 'main'),
                className: 'form-input mb-2',
                disabled: uploading
              }),
              mainProfilePic &&
                window.React.createElement(
                  'div',
                  null,
                  window.React.createElement('img', {
                    src: mainProfilePic.preview,
                    alt: 'Main Profile Picture',
                    className: 'main-profile-pic'
                  }),
                  window.React.createElement(
                    'button',
                    {
                      type: 'button',
                      onClick: handleDeleteMainPic,
                      className: 'bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600 mt-2',
                      disabled: uploading
                    },
                    'Delete'
                  )
                )
            ),
            window.React.createElement(
              'div',
              { className: 'standard-pic-container' },
              window.React.createElement('label', { className: 'form-label' }, `Standard Pictures (up to ${12 - standardPics.length} more)`),
              window.React.createElement('input', {
                type: 'file',
                accept: 'image/jpeg,image/png',
                multiple: true,
                onChange: (e) => handleFileChange(e, 'standard'),
                className: 'form-input mb-2',
                disabled: standardPics.length >= 12 || uploading
              }),
              window.React.createElement(
                'div',
                { className: 'pic-grid' },
                standardPics.filter(pic => pic.active).map(pic =>
                  window.React.createElement(
                    'div',
                    { key: pic.id },
                    window.React.createElement('img', {
                      src: pic.preview,
                      alt: 'Standard Picture',
                      className: 'standard-pic'
                    }),
                    window.React.createElement(
                      'div',
                      { className: 'image-actions' },
                      window.React.createElement(
                        'button',
                        {
                          type: 'button',
                          onClick: () => handleMarkInactive(pic.id, 'standard'),
                          className: 'bg-gray-500 text-white py-1 px-2 rounded-lg hover:bg-gray-600',
                          disabled: uploading
                        },
                        'Mark Inactive'
                      )
                    )
                  )
                )
              )
            )
          ),
          window.React.createElement(
            'div',
            { className: 'private-pic-container mt-4' },
            window.React.createElement('label', { className: 'form-label' }, 'Private Pictures'),
            window.React.createElement('input', {
              type: 'file',
              accept: 'image/jpeg,image/png',
              multiple: true,
              onChange: (e) => handleFileChange(e, 'private'),
              className: 'form-input mb-2',
              disabled: uploading
            }),
            window.React.createElement(
              'div',
              { className: 'pic-grid' },
              privatePics.filter(pic => pic.active).map(pic =>
                window.React.createElement(
                  'div',
                  { key: pic.id },
                  window.React.createElement('img', {
                    src: pic.preview,
                    alt: 'Private Picture',
                    className: 'private-pic'
                  }),
                  window.React.createElement(
                    'div',
                    { className: 'image-actions' },
                    window.React.createElement(
                      'button',
                      {
                        type: 'button',
                        onClick: () => handleMarkInactive(pic.id, 'private'),
                        className: 'bg-gray-500 text-white py-1 px-2 rounded-lg hover:bg-gray-600',
                        disabled: uploading
                      },
                      'Mark Inactive'
                    )
                  )
                )
              )
            )
          )
        ),
        // Basic Information
        window.React.createElement(
          'div',
          { className: 'col-span-full' },
          window.React.createElement('h3', { className: 'text-xl font-semibold text-dark section-divider' }, 'Basic Information'),
          window.React.createElement(
            'div',
            { className: 'signup-form-grid' },
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'First Name'),
              window.React.createElement('input', {
                type: 'text',
                placeholder: 'Enter first name',
                value: firstName,
                onChange: (e) => setFirstName(e.target.value),
                className: 'form-input'
              })
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Last Name'),
              window.React.createElement('input', {
                type: 'text',
                placeholder: 'Enter last name',
                value: lastName,
                onChange: (e) => setLastName(e.target.value),
                className: 'form-input'
              })
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Username *'),
              window.React.createElement('input', {
                type: 'text',
                placeholder: 'Enter username',
                value: username,
                onChange: (e) => setUsername(e.target.value),
                className: 'form-input',
                required: true
              })
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Email *'),
              window.React.createElement('input', {
                type: 'email',
                placeholder: 'Enter your email',
                value: email,
                onChange: (e) => setEmail(e.target.value),
                className: 'form-input',
                required: true,
                disabled: isUpdate
              })
            ),
            !isUpdate &&
              window.React.createElement(
                window.React.Fragment,
                null,
                window.React.createElement(
                  'div',
                  { className: 'form-group' },
                  window.React.createElement('label', { className: 'form-label' }, 'Password *'),
                  window.React.createElement('input', {
                    type: 'password',
                    placeholder: 'Enter password',
                    value: password,
                    onChange: (e) => setPassword(e.target.value),
                    className: `form-input ${passwordMatch === true ? 'password-match' : passwordMatch === false ? 'password-mismatch' : ''}`,
                    required: true
                  })
                ),
                window.React.createElement(
                  'div',
                  { className: 'form-group' },
                  window.React.createElement('label', { className: 'form-label' }, 'Confirm Password *'),
                  window.React.createElement('input', {
                    type: 'password',
                    placeholder: 'Confirm password',
                    value: confirmPassword,
                    onChange: (e) => setConfirmPassword(e.target.value),
                    className: `form-input ${passwordMatch === true ? 'password-match' : passwordMatch === false ? 'password-mismatch' : ''}`,
                    required: true
                  }),
                  passwordMatch === false &&
                    window.React.createElement('span', { className: 'text-red-600 text-xs' }, 'Passwords do not match'),
                  passwordMatch === true &&
                    window.React.createElement('span', { className: 'text-green-600 text-xs' }, 'Passwords match')
                )
              ),
            isUpdate &&
              window.React.createElement(
                window.React.Fragment,
                null,
                window.React.createElement(
                  'div',
                  { className: 'form-group' },
                  window.React.createElement('label', { className: 'form-label' }, 'New Password (Optional)'),
                  window.React.createElement('input', {
                    type: 'password',
                    placeholder: 'Enter new password',
                    value: password,
                    onChange: (e) => setPassword(e.target.value),
                    className: `form-input ${passwordMatch === true ? 'password-match' : passwordMatch === false ? 'password-mismatch' : ''}`
                  })
                ),
                window.React.createElement(
                  'div',
                  { className: 'form-group' },
                  window.React.createElement('label', { className: 'form-label' }, 'Confirm New Password (Optional)'),
                  window.React.createElement('input', {
                    type: 'password',
                    placeholder: 'Confirm new password',
                    value: confirmPassword,
                    onChange: (e) => setConfirmPassword(e.target.value),
                    className: `form-input ${passwordMatch === true ? 'password-match' : passwordMatch === false ? 'password-mismatch' : ''}`
                  }),
                  passwordMatch === false &&
                    window.React.createElement('span', { className: 'text-red-600 text-xs' }, 'Passwords do not match'),
                  passwordMatch === true &&
                    window.React.createElement('span', { className: 'text-green-600 text-xs' }, 'Passwords match')
                )
              ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Phone Number'),
              window.React.createElement('input', {
                type: 'tel',
                placeholder: '(xxx) xxx-xxxx',
                value: phoneNumber,
                onChange: handlePhoneNumberChange,
                className: 'form-input',
                maxLength: 14
              })
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Date of Birth'),
              window.React.createElement('input', {
                type: 'date',
                value: dateOfBirth,
                onChange: (e) => setDateOfBirth(e.target.value),
                className: 'form-input'
              })
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Gender Identity'),
              window.React.createElement(
                'select',
                {
                  value: genderIdentity,
                  onChange: (e) => setGenderIdentity(e.target.value),
                  className: 'form-input'
                },
                window.React.createElement('option', { value: '' }, 'Select Gender Identity'),
                window.React.createElement('option', { value: 'Male' }, 'Male'),
                window.React.createElement('option', { value: 'Female' }, 'Female'),
                window.React.createElement('option', { value: 'Non-Binary' }, 'Non-Binary'),
                window.React.createElement('option', { value: 'Transgender' }, 'Transgender'),
                window.React.createElement('option', { value: 'Other' }, 'Other')
              )
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Sexual Orientation'),
              window.React.createElement(
                'select',
                {
                  value: sexualOrientation,
                  onChange: (e) => setSexualOrientation(e.target.value),
                  className: 'form-input'
                },
                window.React.createElement('option', { value: '' }, 'Select Sexual Orientation'),
                window.React.createElement('option', { value: 'Straight' }, 'Straight'),
                window.React.createElement('option', { value: 'Gay' }, 'Gay'),
                window.React.createElement('option', { value: 'Lesbian' }, 'Lesbian'),
                window.React.createElement('option', { value: 'Bisexual' }, 'Bisexual'),
                window.React.createElement('option', { value: 'Pansexual' }, 'Pansexual'),
                window.React.createElement('option', { value: 'Other' }, 'Other')
              )
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Relationship Status'),
              window.React.createElement(
                'select',
                {
                  value: relationshipStatus,
                  onChange: (e) => setRelationshipStatus(e.target.value),
                  className: 'form-input'
                },
                window.React.createElement('option', { value: '' }, 'Select Relationship Status'),
                window.React.createElement('option', { value: 'Single' }, 'Single'),
                window.React.createElement('option', { value: 'Divorced' }, 'Divorced'),
                window.React.createElement('option', { value: 'Separated' }, 'Separated'),
                window.React.createElement('option', { value: 'Widowed' }, 'Widowed'),
                window.React.createElement('option', { value: 'Married' }, 'Married'),
                window.React.createElement('option', { value: 'Living Together' }, 'Living Together'),
                window.React.createElement('option', { value: 'Open Marriage' }, 'Open Marriage')
              )
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Interested In'),
              window.React.createElement(
                'select',
                {
                  value: interestedIn,
                  onChange: (e) => setInterestedIn(e.target.value),
                  className: 'form-input'
                },
                window.React.createElement('option', { value: '' }, 'Select Interested In'),
                window.React.createElement('option', { value: 'Men' }, 'Men'),
                window.React.createElement('option', { value: 'Women' }, 'Women'),
                window.React.createElement('option', { value: 'Everyone' }, 'Everyone'),
                window.React.createElement('option', { value: 'Non-Binary' }, 'Non-Binary')
              )
            )
          )
        ),
        // Physical Attributes
        window.React.createElement(
          'div',
          { className: 'col-span-full' },
          window.React.createElement('h3', { className: 'text-xl font-semibold text-dark section-divider' }, 'Physical Attributes'),
          window.React.createElement(
            'div',
            { className: 'signup-form-grid' },
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Height'),
              window.React.createElement(
                'select',
                {
                  value: height,
                  onChange: (e) => setHeight(e.target.value),
                  className: 'form-input'
                },
                window.React.createElement('option', { value: '' }, 'Select Height'),
                [...Array(55).keys()].map(i => {
                  const inches = 40 + i;
                  const feet = Math.floor(inches / 12);
                  const remainingInches = inches % 12;
                  return window.React.createElement(
                    'option',
                    { key: inches, value: inches },
                    `${feet}'${remainingInches}"`
                  );
                })
              )
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Body Type'),
              window.React.createElement(
                'select',
                {
                  value: bodyType,
                  onChange: (e) => setBodyType(e.target.value),
                  className: 'form-input'
                },
                window.React.createElement('option', { value: '' }, 'Select Body Type'),
                window.React.createElement('option', { value: 'Athletic' }, 'Athletic'),
                window.React.createElement('option', { value: 'Fit' }, 'Fit'),
                window.React.createElement('option', { value: 'Skinny' }, 'Skinny'),
                window.React.createElement('option', { value: 'Fat' }, 'Fat'),
                window.React.createElement('option', { value: 'Chunky' }, 'Chunky'),
                window.React.createElement('option', { value: 'Fluffy' }, 'Fluffy'),
                window.React.createElement('option', { value: 'Round' }, 'Round'),
                window.React.createElement('option', { value: 'Stick Figure' }, 'Stick Figure'),
                window.React.createElement('option', { value: 'Perfect' }, 'Perfect'),
                window.React.createElement('option', { value: 'Almost Perfect' }, 'Almost Perfect')
              )
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Hair Color'),
              window.React.createElement(
                'select',
                {
                  value: hairColor,
                  onChange: (e) => setHairColor(e.target.value),
                  className: 'form-input'
                },
                window.React.createElement('option', { value: '' }, 'Select Hair Color'),
                window.React.createElement('option', { value: 'Black' }, 'Black'),
                window.React.createElement('option', { value: 'Brown' }, 'Brown'),
                window.React.createElement('option', { value: 'Blonde' }, 'Blonde'),
                window.React.createElement('option', { value: 'Red' }, 'Red'),
                window.React.createElement('option', { value: 'Gray' }, 'Gray'),
                window.React.createElement('option', { value: 'Other' }, 'Other')
              )
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Eye Color'),
              window.React.createElement(
                'select',
                {
                  value: eyeColor,
                  onChange: (e) => setEyeColor(e.target.value),
                  className: 'form-input'
                },
                window.React.createElement('option', { value: '' }, 'Select Eye Color'),
                window.React.createElement('option', { value: 'Blue' }, 'Blue'),
                window.React.createElement('option', { value: 'Brown' }, 'Brown'),
                window.React.createElement('option', { value: 'Green' }, 'Green'),
                window.React.createElement('option', { value: 'Hazel' }, 'Hazel'),
                window.React.createElement('option', { value: 'Other' }, 'Other')
              )
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Ethnicity/Race'),
              window.React.createElement(
                'select',
                {
                  value: ethnicity,
                  onChange: (e) => setEthnicity(e.target.value),
                  className: 'form-input'
                },
                window.React.createElement('option', { value: '' }, 'Select Ethnicity'),
                window.React.createElement('option', { value: 'Asian' }, 'Asian'),
                window.React.createElement('option', { value: 'Black' }, 'Black'),
                window.React.createElement('option', { value: 'Hispanic' }, 'Hispanic'),
                window.React.createElement('option', { value: 'White' }, 'White'),
                window.React.createElement('option', { value: 'Other' }, 'Other')
              )
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Distinguishing Features'),
              window.React.createElement('input', {
                type: 'text',
                placeholder: 'e.g., Tattoos, Piercings',
                value: distinguishingFeatures,
                onChange: (e) => setDistinguishingFeatures(e.target.value),
                className: 'form-input'
              })
            )
          )
        ),
        // Lifestyle & Habits
        window.React.createElement(
          'div',
          { className: 'col-span-full' },
          window.React.createElement('h3', { className: 'text-xl font-semibold text-dark section-divider' }, 'Lifestyle & Habits'),
          window.React.createElement(
            'div',
            { className: 'signup-form-grid' },
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Drinking Habits'),
              window.React.createElement(
                'select',
                {
                  value: drinkingHabits,
                  onChange: (e) => setDrinkingHabits(e.target.value),
                  className: 'form-input'
                },
                window.React.createElement('option', { value: '' }, 'Select Drinking Habits'),
                window.React.createElement('option', { value: 'Never' }, 'Never'),
                window.React.createElement('option', { value: 'Socially' }, 'Socially'),
                window.React.createElement('option', { value: 'Regularly' }, 'Regularly'),
                window.React.createElement('option', { value: 'Nightly' }, 'Nightly'),
                window.React.createElement('option', { value: "It's 5 o'clock somewhere" }, "It's 5 o'clock somewhere")
              )
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Smoking Habits'),
              window.React.createElement(
                'select',
                {
                  value: smokingHabits,
                  onChange: (e) => setSmokingHabits(e.target.value),
                  className: 'form-input'
                },
                window.React.createElement('option', { value: '' }, 'Select Smoking Habits'),
                window.React.createElement('option', { value: 'Non-Smoker' }, 'Non-Smoker'),
                window.React.createElement('option', { value: 'Social Smoker' }, 'Social Smoker'),
                window.React.createElement('option', { value: 'Regular Smoker' }, 'Regular Smoker')
              )
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, '420 Friendly?'),
              window.React.createElement(
                'select',
                {
                  value: fourTwentyFriendly,
                  onChange: (e) => setFourTwentyFriendly(e.target.value),
                  className: 'form-input'
                },
                window.React.createElement('option', { value: '' }, 'Select Option'),
                window.React.createElement('option', { value: 'Yes' }, 'Yes'),
                window.React.createElement('option', { value: 'No' }, 'No')
              )
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Other Substance Use'),
              window.React.createElement('input', {
                type: 'text',
                placeholder: 'e.g., None, Occasional',
                value: otherSubstanceUse,
                onChange: (e) => setOtherSubstanceUse(e.target.value),
                className: 'form-input'
              })
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Occupation/Profession'),
              window.React.createElement('input', {
                type: 'text',
                placeholder: 'Enter occupation',
                value: occupation,
                onChange: (e) => setOccupation(e.target.value),
                className: 'form-input'
              })
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Languages Spoken'),
              window.React.createElement('input', {
                type: 'text',
                placeholder: 'e.g., English, Spanish',
                value: languagesSpoken,
                onChange: (e) => setLanguagesSpoken(e.target.value),
                className: 'form-input'
              })
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Pets/Pet Preferences'),
              window.React.createElement('input', {
                type: 'text',
                placeholder: 'e.g., Dogs, No pets',
                value: pets,
                onChange: (e) => setPets(e.target.value),
                className: 'form-input'
              })
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Children'),
              window.React.createElement(
                'select',
                {
                  value: children,
                  onChange: (e) => setChildren(e.target.value),
                  className: 'form-input'
                },
                window.React.createElement('option', { value: '' }, 'Select Option'),
                window.React.createElement('option', { value: 'Have Children' }, 'Have Children'),
                window.React.createElement('option', { value: "Don't Have Children" }, "Don't Have Children"),
                window.React.createElement('option', { value: 'Want Children' }, 'Want Children'),
                window.React.createElement('option', { value: "Don't Want Children" }, "Don't Want Children")
              )
            )
          )
        ),
        // Location & Logistics
        window.React.createElement(
          'div',
          { className: 'col-span-full' },
          window.React.createElement('h3', { className: 'text-xl font-semibold text-dark section-divider' }, 'Location & Logistics'),
          window.React.createElement(
            'div',
            { className: 'signup-form-grid' },
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'ZIP/Postal Code (US or Canada) *'),
              window.React.createElement('input', {
                type: 'text',
                placeholder: 'e.g., 10001 or K1A 0B1',
                value: zipCode,
                onChange: (e) => setZipCode(e.target.value),
                onBlur: handleZipCodeBlur,
                className: 'form-input',
                maxLength: 7,
                required: true
              }),
              locationInfo &&
                window.React.createElement('span', { className: 'text-xs text-gray-600' }, locationInfo)
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Current City/Town'),
              window.React.createElement('input', {
                type: 'text',
                placeholder: 'Enter city/town',
                value: currentCity,
                onChange: (e) => setCurrentCity(e.target.value),
                className: 'form-input'
              })
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Neighborhood'),
              window.React.createElement('input', {
                type: 'text',
                placeholder: 'Enter neighborhood',
                value: neighborhood,
                onChange: (e) => setNeighborhood(e.target.value),
                className: 'form-input'
              })
            )
          )
        ),
        // Interests & Lifestyle
        window.React.createElement(
          'div',
          { className: 'col-span-full' },
          window.React.createElement('h3', { className: 'text-xl font-semibold text-dark section-divider' }, 'Interests & Lifestyle'),
          window.React.createElement(
            'div',
            { className: 'signup-form-grid' },
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Favorite Activities'),
              window.React.createElement('input', {
                type: 'text',
                placeholder: 'e.g., Hiking, Reading',
                value: favoriteActivities,
                onChange: (e) => setFavoriteActivities(e.target.value),
                className: 'form-input'
              })
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Music Preferences'),
              window.React.createElement('input', {
                type: 'text',
                placeholder: 'e.g., Rock, Jazz',
                value: musicPreferences,
                onChange: (e) => setMusicPreferences(e.target.value),
                className: 'form-input'
              })
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Introvert/Extrovert'),
              window.React.createElement(
                'select',
                {
                  value: introvertExtrovert,
                  onChange: (e) => setIntrovertExtrovert(e.target.value),
                  className: 'form-input'
                },
                window.React.createElement('option', { value: '' }, 'Select Option'),
                window.React.createElement('option', { value: 'Introvert' }, 'Introvert'),
                window.React.createElement('option', { value: 'Extrovert' }, 'Extrovert'),
                window.React.createElement('option', { value: 'Ambivert' }, 'Ambivert')
              )
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Morning Person/Night Owl'),
              window.React.createElement(
                'select',
                {
                  value: morningNight,
                  onChange: (e) => setMorningNight(e.target.value),
                  className: 'form-input'
                },
                window.React.createElement('option', { value: '' }, 'Select Option'),
                window.React.createElement('option', { value: 'Morning Person' }, 'Morning Person'),
                window.React.createElement('option', { value: 'Night Owl' }, 'Night Owl')
              )
            )
          )
        ),
        // Relationship Preferences
        window.React.createElement(
          'div',
          { className: 'col-span-full' },
          window.React.createElement('h3', { className: 'text-xl font-semibold text-dark section-divider' }, 'Relationship Preferences'),
          window.React.createElement(
            'div',
            { className: 'signup-form-grid' },
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Deal-Breakers'),
              window.React.createElement('input', {
                type: 'text',
                placeholder: 'e.g., Smoking, Dishonesty',
                value: dealBreakers,
                onChange: (e) => setDealBreakers(e.target.value),
                className: 'form-input'
              })
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Must-Haves in a Partner'),
              window.React.createElement('input', {
                type: 'text',
                placeholder: 'e.g., Kindness, Humor',
                value: mustHaves,
                onChange: (e) => setMustHaves(e.target.value),
                className: 'form-input'
              })
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Living Arrangement Preferences'),
              window.React.createElement('input', {
                type: 'text',
                placeholder: 'e.g., Living alone, Roommates',
                value: livingArrangementPrefs,
                onChange: (e) => setLivingArrangementPrefs(e.target.value),
                className: 'form-input'
              })
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Communication Style'),
              window.React.createElement(
                'select',
                {
                  value: communicationStyle,
                  onChange: (e) => setCommunicationStyle(e.target.value),
                  className: 'form-input'
                },
                window.React.createElement('option', { value: '' }, 'Select Communication Style'),
                window.React.createElement('option', { value: 'Direct' }, 'Direct'),
                window.React.createElement('option', { value: 'Passive' }, 'Passive'),
                window.React.createElement('option', { value: 'Open' }, 'Open'),
                window.React.createElement('option', { value: 'Other' }, 'Other')
              )
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Attachment Style (Optional)'),
              window.React.createElement(
                'select',
                {
                  value: attachmentStyle,
                  onChange: (e) => setAttachmentStyle(e.target.value),
                  className: 'form-input'
                },
                window.React.createElement('option', { value: '' }, 'Select Attachment Style'),
                window.React.createElement('option', { value: 'Secure' }, 'Secure'),
                window.React.createElement('option', { value: 'Anxious' }, 'Anxious'),
                window.React.createElement('option', { value: 'Avoidant' }, 'Avoidant'),
                window.React.createElement('option', { value: 'Disorganized' }, 'Disorganized')
              )
            )
          )
        ),
        // Written Sections
        window.React.createElement(
          'div',
          { className: 'col-span-full' },
          window.React.createElement('h3', { className: 'text-xl font-semibold text-dark section-divider' }, 'Written Sections'),
          window.React.createElement(
            'div',
            { className: 'space-y-4' },
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'About Me/Bio'),
              window.React.createElement('textarea', {
                placeholder: 'Tell us about yourself',
                value: bio,
                onChange: (e) => setBio(e.target.value),
                className: 'form-input min-h-[100px]'
              })
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'What I’m Looking For'),
              window.React.createElement('textarea', {
                placeholder: 'Describe your ideal partner',
                value: lookingFor,
                onChange: (e) => setLookingFor(e.target.value),
                className: 'form-input min-h-[100px]'
              })
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Ideal First Date'),
              window.React.createElement('textarea', {
                placeholder: 'Describe your perfect first date',
                value: idealFirstDate,
                onChange: (e) => setIdealFirstDate(e.target.value),
                className: 'form-input min-h-[100px]'
              })
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Favorite Quote/Motto'),
              window.React.createElement('input', {
                type: 'text',
                placeholder: 'Enter your favorite quote',
                value: favoriteQuote,
                onChange: (e) => setFavoriteQuote(e.target.value),
                className: 'form-input'
              })
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Fun Fact About Yourself'),
              window.React.createElement('input', {
                type: 'text',
                placeholder: 'Share a fun fact',
                value: funFact,
                onChange: (e) => setFunFact(e.target.value),
                className: 'form-input'
              })
            ),
            window.React.createElement(
              'div',
              { className: 'form-group' },
              window.React.createElement('label', { className: 'form-label' }, 'Conversation Starters'),
              window.React.createElement('textarea', {
                placeholder: 'e.g., Favorite movie, Hobby',
                value: conversationStarters,
                onChange: (e) => setConversationStarters(e.target.value),
                className: 'form-input min-h-[100px]'
              })
            )
          )
        ),
        // Submit Button
        window.React.createElement(
          'div',
          { className: 'form-group col-span-full' },
          window.React.createElement(
            'button',
            {
              type: 'submit',
              className: `bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition w-full ${uploading ? 'uploading' : ''}`,
              disabled: passwordMatch === false || uploading
            },
            uploading ? 'Processing...' : isUpdate ? 'Update Profile' : 'Sign Up'
          )
        )
      )
  );
}