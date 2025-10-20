import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCRtzONV0M1syCLTF6H5__cGEBgJxM13sM",
    authDomain: "adminpanel-93879.firebaseapp.com",
    projectId: "adminpanel-93879",
    storageBucket: "adminpanel-93879.appspot.com",
    messagingSenderId: "854889610123",
    appId: "1:854889610123:web:4522c7fc685e9864014d8e"
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// --- DOM Elements ---
const appWrapper = document.getElementById('app-wrapper');
const userEmailSpan = document.getElementById('user-email');
const openSidebarBtn = document.getElementById('open-sidebar-btn');
const closeSidebarBtn = document.getElementById('close-sidebar-btn');
const sidebar = document.getElementById('sidebar');
const sidebarNav = document.getElementById('sidebar-nav');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const logoutBtn = document.getElementById('logout-btn');

// --- Authentication ---
onAuthStateChanged(auth, user => {
    if (user) {
        if(appWrapper) appWrapper.style.display = 'block';
        if (userEmailSpan) {
            userEmailSpan.textContent = user.email;
        }
    } else {
        window.location.replace(new URL('login.html', window.location.href).href);
    }
});

// --- Sidebar Logic ---
function openSidebar() {
    if (!sidebar || !sidebarOverlay) return;
    sidebar.classList.remove('-translate-x-full');
    sidebarOverlay.classList.remove('hidden');
    setTimeout(() => sidebarOverlay.classList.remove('opacity-0'), 10);
}

function closeSidebar() {
    if (!sidebar || !sidebarOverlay) return;
    sidebar.classList.add('-translate-x-full');
    sidebarOverlay.classList.add('opacity-0');
    setTimeout(() => sidebarOverlay.classList.add('hidden'), 300);
}

if (openSidebarBtn) openSidebarBtn.addEventListener('click', openSidebar);
if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

// Close sidebar on navigation on mobile
if (sidebarNav) {
    sidebarNav.addEventListener('click', (e) => {
        if (e.target.closest('a') && window.innerWidth < 1024) {
            closeSidebar();
        }
    });
}

// --- Logout ---
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        signOut(auth).catch(error => console.error("Sign out error", error));
    });
}

