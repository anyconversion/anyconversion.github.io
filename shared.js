// RealVibin shared.js - Fixed for 'Failed to load or parse shared.js' error (May 2025, v2)
console.log('shared.js: File loaded');

if (!window.React) {
  console.error('React not found on window. Ensure React script is loaded.');
  throw new Error('React is not available');
}

export async function initializeFirebase() {
  if (window.firebaseInitialized) {
    console.log('Firebase already initialized, skipping');
    return window.firebase;
  }
  window.firebaseInitialized = true;

  try {
    console.log('Loading Firebase modules...');
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js');
    const { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } = await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js');
    const { getFirestore, collection, addDoc, onSnapshot, orderBy, query, serverTimestamp, getDoc, doc, setDoc } = await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js');

    const firebaseConfig = {
      apiKey: "AIzaSyCZavBCNmUx2lX4SqdXlYdloCdwmw-hYT8",
      authDomain: "realvibin-9aac1.firebaseapp.com",
      projectId: "realvibin-9aac1",
      messagingSenderId: "155907884818",
      appId: "1:155907884818:web:d499ac21bc81c3273d55cb"
    };

    console.log('Initializing Firebase...');
    window.firebaseApp = window.firebaseApp || initializeApp(firebaseConfig);
    window.firebaseAuth = window.firebaseAuth || getAuth(window.firebaseApp);
    window.firebaseDb = window.firebaseDb || getFirestore(window.firebaseApp);
    console.log('Firebase initialized successfully');

    window.CLOUDINARY_CLOUD_NAME = "ddmrplnut";
    window.CLOUDINARY_UPLOAD_PRESET = "realvibin_unsigned";

    window.firebase = {
      auth: window.firebaseAuth,
      db: window.firebaseDb,
      signInWithEmailAndPassword,
      createUserWithEmailAndPassword,
      signOut,
      collection,
      addDoc,
      onSnapshot,
      orderBy,
      query,
      serverTimestamp,
      onAuthStateChanged,
      getDoc,
      doc,
      setDoc
    };

    console.log('window.firebase contents:', window.firebase);
    return window.firebase;
  } catch (error) {
    console.error('Firebase Initialization Error:', { message: error.message, code: error.code, stack: error.stack });
    throw error;
  }
}

export function Header({ user, setUser }) {
  const [isMenuOpen, setIsMenuOpen] = window.React.useState(false);
  const { auth, signInWithEmailAndPassword, signOut } = window.firebase || {};

  const AuthSection = () => {
    const [email, setEmail] = window.React.useState('');
    const [password, setPassword] = window.React.useState('');

    const debounce = (fn, delay) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
      };
    };

    const handleLogin = async (e) => {
      e.preventDefault();
      if (!auth) {
        console.error('Auth not available');
        alert('Authentication service not available.');
        return;
      }
      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in');
        setEmail('');
        setPassword('');
      } catch (error) {
        console.error('Login error:', error.message, error.code, error.stack);
        alert(`Login error: ${error.message}`);
      }
    };

    const handleLogout = debounce(async () => {
      if (!auth) {
        console.error('Auth not available');
        return;
      }
      try {
        await signOut(auth);
        setUser(null);
        console.log('User logged out');
      } catch (error) {
        console.error('Logout error:', error.message, error.code, error.stack);
        alert(`Logout error: ${error.message}`);
      }
    }, 300);

    console.log('AuthSection: Rendering with user:', user ? user.uid : 'No user');
    return window.React.createElement(
      'div',
      { className: 'auth-section flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-2' },
      user ? (
        [
          window.React.createElement(
            'a',
            {
              href: 'signup.html',
              className: 'text-white font-semibold hover:underline w-full text-center md:w-auto'
            },
            user.profile?.username || 'User'
          ),
          window.React.createElement(
            'button',
            {
              type: 'button',
              className: 'bg-secondary text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition w-full md:w-auto',
              onClick: handleLogout
            },
            'Logout'
          )
        ]
      ) : (
        [
          window.React.createElement(
            'form',
            {
              onSubmit: handleLogin,
              className: 'auth-form flex flex-col space-y-2 w-full md:flex-row md:space-y-0 md:space-x-2'
            },
            window.React.createElement('input', {
              type: 'email',
              placeholder: 'Email',
              value: email,
              onChange: (e) => setEmail(e.target.value),
              className: 'form-input w-full',
              required: true,
              autoComplete: 'email'
            }),
            window.React.createElement('input', {
              type: 'password',
              placeholder: 'Password',
              value: password,
              onChange: (e) => setPassword(e.target.value),
              className: 'form-input w-full',
              required: true,
              autoComplete: 'current-password'
            }),
            window.React.createElement(
              'button',
              {
                type: 'submit',
                className: 'bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition w-full',
                style: { color: 'white', fontWeight: 'bold' }
              },
              'Login'
            )
          ),
          window.React.createElement(
            'a',
            {
              href: 'signup.html',
              className: 'bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition w-full text-center md:w-auto text-sm'
            },
            'Need an account?'
          )
        ]
      )
    );
  };

  return window.React.createElement(
    'nav',
    { className: 'bg-primary shadow-md sticky top-0 z-50' },
    window.React.createElement(
      'div',
      { className: 'container flex items-center justify-between h-16 px-2 sm:px-4' },
      window.React.createElement(
        'div',
        { className: 'logo-container' },
        window.React.createElement(
          'a',
          { href: '/' },
          window.React.createElement('img', {
            src: './img/RealVibin.png',
            alt: 'RealVibin Logo',
            className: 'h-12 sm:h-16 md:h-[100px] w-auto'
          })
        )
      ),
      window.React.createElement(
        'div',
        { className: 'auth-container hidden md:flex items-center space-x-4' },
        window.React.createElement(AuthSection)
      ),
      window.React.createElement(
        'div',
        { className: 'md:hidden flex items-center' },
        window.React.createElement(
          'button',
          {
            onClick: () => setIsMenuOpen(!isMenuOpen),
            className: 'text-white hover:text-white focus:outline-none',
            type: 'button'
          },
          window.React.createElement(
            'svg',
            { className: 'h-6 w-6', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
            window.React.createElement('path', {
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '2',
              d: isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'
            })
          )
        )
      )
    ),
    isMenuOpen &&
      window.React.createElement(
        'div',
        { className: 'md:hidden bg-primary shadow-md px-2 py-4' },
        window.React.createElement(AuthSection)
      )
  );
}

export function Footer() {
  return window.React.createElement(
    'footer',
    { className: 'bg-dark text-white py-8 mt-auto' },
    window.React.createElement(
      'div',
      { className: 'container text-center px-2 sm:px-4' },
      window.React.createElement('p', null, '© 2025 RealVibin. All rights reserved.'),
      window.React.createElement(
        'div',
        { className: 'mt-4 flex justify-center space-x-4' },
        window.React.createElement(
          'a',
          { href: '#', className: 'text-gray-400 hover:text-white' },
          'Privacy Policy'
        ),
        window.React.createElement(
          'a',
          { href: '#', className: 'text-gray-400 hover:text-white' },
          'Terms of Service'
        ),
        window.React.createElement(
          'a',
          { href: '#', className: 'text-gray-400 hover:text-white' },
          'Contact'
        )
      )
    )
  );
}

console.log('shared.js exports:', { initializeFirebase, Header, Footer });
console.log('shared.js loaded successfully');