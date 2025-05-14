// Navigation Dropdowns
// (No extra JS needed for CSS dropdowns, but can add mobile toggle if needed)

// Animated Hero Section
window.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    const heroTagline = document.querySelector('.hero-tagline');
    setTimeout(() => heroTitle.classList.add('animate'), 200);
    setTimeout(() => heroTagline.classList.add('animate'), 600);
});

// Gallery Lightbox, Cycling, and Admin Upload
let galleryImages = [];
const galleryGrid = document.getElementById('galleryGrid');
const uploadBtn = document.getElementById('uploadBtn');
const uploadInput = document.getElementById('uploadInput');

async function fetchGalleryImages() {
    try {
        const res = await fetch('/api/gallery');
        galleryImages = await res.json();
    } catch {
        galleryImages = [];
    }
}

function renderGallery() {
    galleryGrid.innerHTML = '';
    galleryImages.forEach((img, idx) => {
        const image = document.createElement('img');
        image.src = img.src;
        image.alt = img.alt;
        image.dataset.idx = idx;
        image.onclick = () => openLightbox(idx);
        galleryGrid.appendChild(image);
    });
}

// On page load, fetch and render gallery
window.addEventListener('DOMContentLoaded', async () => {
    await fetchGalleryImages();
    renderGallery();
});

// Lightbox logic
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.innerHTML = `<span class="close">&times;</span><img src="" alt="lightbox" />`;
document.body.appendChild(lightbox);
const lightboxImg = lightbox.querySelector('img');
const closeBtn = lightbox.querySelector('.close');
let currentIdx = 0;

function openLightbox(idx) {
    currentIdx = idx;
    lightboxImg.src = galleryImages[currentIdx].src;
    lightbox.classList.add('active');
}
closeBtn.onclick = () => lightbox.classList.remove('active');

// Admin upload logic
uploadBtn.onclick = () => uploadInput.click();
uploadInput.onchange = async (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async function(ev) {
            const src = ev.target.result;
            const alt = file.name;
            const token = localStorage.getItem('token');
            const res = await fetch('/api/gallery/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ src, alt })
            });
            if (res.ok) {
                await fetchGalleryImages();
                renderGallery();
            } else {
                alert('Upload failed.');
            }
        };
        reader.readAsDataURL(file);
    }
};

// Booking slot management
const bookingDate = document.getElementById('bookingDate');
const bookingTime = document.getElementById('bookingTime');
const bookingSubmit = document.getElementById('bookingSubmit');

async function fetchAvailableSlots(date) {
    if (!date) return [];
    try {
        const res = await fetch(`/api/bookings/slots?date=${date}`);
        const data = await res.json();
        return data.available || [];
    } catch {
        return [];
    }
}

if (bookingDate && bookingTime && bookingSubmit) {
    bookingDate.addEventListener('change', async (e) => {
        const date = e.target.value;
        bookingTime.innerHTML = '<option value="">Loading...</option>';
        const slots = await fetchAvailableSlots(date);
        bookingTime.innerHTML = slots.length
            ? `<option value=\"\">Select Time</option>` + slots.map(s => `<option value=\"${s}\">${s}</option>`).join('')
            : '<option value="">No slots available</option>';
        bookingTime.disabled = slots.length === 0;
        bookingSubmit.disabled = slots.length === 0;
    });
}

// Booking Form Submission
const bookingForm = document.getElementById('bookingForm');
const bookingMsg = document.getElementById('bookingMsg');
if (bookingForm) {
    bookingForm.onsubmit = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(bookingForm));
        const res = await fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const msg = await res.text();
        bookingMsg.textContent = msg;
        bookingForm.reset();
    };
}

// Auth logic: login/register toggle, session, admin mode
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginMsg = document.getElementById('loginMsg');
const toggleAuthMode = document.getElementById('toggleAuthMode');
const loginTitle = document.getElementById('loginTitle');
const logoutBtn = document.getElementById('logoutBtn');

function setAdminMode(isAdmin) {
    document.body.classList.toggle('admin', isAdmin);
    logoutBtn.style.display = isAdmin ? 'inline-block' : 'none';
    const adminDash = document.getElementById('admin-dashboard');
    if (adminDash) adminDash.style.display = isAdmin ? '' : 'none';
    if (isAdmin) {
        loginForm.style.display = 'none';
        registerForm.style.display = 'none';
        toggleAuthMode.style.display = 'none';
        loginTitle.textContent = 'Admin Dashboard';
        renderAdminDashboard();
    } else {
        loginForm.style.display = '';
        registerForm.style.display = 'none';
        toggleAuthMode.style.display = '';
        loginTitle.textContent = 'Login';
        if (adminDash) adminDash.style.display = 'none';
    }
}

// Admin dashboard logic
async function renderAdminDashboard() {
    const bookingsTable = document.getElementById('adminBookingsTable').querySelector('tbody');
    const galleryTable = document.getElementById('adminGalleryTable').querySelector('tbody');
    const coursesTable = document.getElementById('adminCoursesTable').querySelector('tbody');
    const calendarDiv = document.getElementById('adminCalendar');
    const exportBtn = document.getElementById('exportBookingsBtn');
    const dayBookingsDiv = document.getElementById('calendarDayBookings');
    const token = localStorage.getItem('token');
    // Render bookings
    let bookings = [];
    try {
        const res = await fetch('/api/bookings/all', {
            headers: { Authorization: `Bearer ${token}` }
        });
        bookings = await res.json();
        bookingsTable.innerHTML = bookings.map(b => `
            <tr>
                <td>${b.date}</td>
                <td>${b.time}</td>
                <td>${b.name}</td>
                <td>${b.service}</td>
                <td><button onclick="deleteBooking('${b._id}')">Delete</button></td>
            </tr>
        `).join('');
    } catch {
        bookingsTable.innerHTML = '<tr><td colspan="5">Failed to load bookings</td></tr>';
    }
    // Render calendar
    if (calendarDiv) {
        // Fetch grouped bookings for calendar
        let calendarData = {};
        try {
            const res = await fetch('/api/bookings/calendar', {
                headers: { Authorization: `Bearer ${token}` }
            });
            calendarData = await res.json();
        } catch {}
        // Render simple calendar (current month)
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        let html = `<div style='font-weight:600;text-align:center;margin-bottom:0.5rem;'>${now.toLocaleString('default',{month:'long'})} ${year}</div>`;
        html += "<table class='admin-table' style='min-width:240px;text-align:center;font-size:1rem;'><tr>";
        ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(d=>{html+=`<th>${d}</th>`});
        html += "</tr><tr>";
        for(let i=0;i<firstDay.getDay();i++) html+='<td></td>';
        for(let d=1;d<=lastDay.getDate();d++){
            const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
            const hasBookings = calendarData[dateStr] && calendarData[dateStr].length;
            html += `<td style='cursor:pointer;${hasBookings?"background:#ffd700;color:#181c23;font-weight:700;":''}' onclick='showDayBookings("${dateStr}")'>${d}</td>`;
            if((firstDay.getDay()+d)%7===0) html+='</tr><tr>';
        }
        html += "</tr></table>";
        calendarDiv.innerHTML = html;
    }
    // Export CSV
    if (exportBtn) {
        exportBtn.onclick = () => {
            window.open('/api/bookings/export', '_blank');
        };
    }
    // Show bookings for selected day
    window.showDayBookings = function(dateStr) {
        if (!dateStr) return;
        const dayBookings = bookings.filter(b => b.date === dateStr);
        if (!dayBookings.length) {
            dayBookingsDiv.style.display = 'none';
            dayBookingsDiv.innerHTML = '';
            return;
        }
        dayBookingsDiv.style.display = '';
        dayBookingsDiv.innerHTML = `<div style='background:#232a34;padding:1rem;border-radius:8px;box-shadow:0 2px 8px #0006;'><strong>Bookings for ${dateStr}:</strong><ul style='margin:0.5rem 0 0 0;padding-left:1.2em;'>`+
            dayBookings.map(b=>`<li>${b.time} - ${b.name} (${b.service})</li>`).join('')+
            '</ul></div>';
    };
    // Render gallery
    try {
        const res = await fetch('/api/gallery/all', {
            headers: { Authorization: `Bearer ${token}` }
        });
        const images = await res.json();
        galleryTable.innerHTML = images.map(img => `
            <tr style="${!img.approved?'background:#ffd70022;':''}">
                <td><img src="${img.src}" alt="${img.alt}" style="width:80px;"></td>
                <td>
                    <input type="text" value="${img.alt||''}" id="caption_${img._id}" style="width:120px;" />
                    <input type="text" value="${(img.tags||[]).join(', ')}" id="tags_${img._id}" style="width:90px;" placeholder="tags" />
                </td>
                <td>
                    ${!img.approved?`<button onclick="approveGalleryImage('${img._id}')">Approve</button>`:''}
                    <button onclick="editGalleryImage('${img._id}')">Edit</button>
                    <button onclick="deleteGalleryImage('${img._id}')">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch {
        galleryTable.innerHTML = '<tr><td colspan="3">Failed to load images</td></tr>';
    }
    // Edit/Approve logic
    window.editGalleryImage = async function(id) {
        const alt = document.getElementById('caption_'+id).value;
        const tags = document.getElementById('tags_'+id).value.split(',').map(t=>t.trim()).filter(Boolean);
        const token = localStorage.getItem('token');
        await fetch(`/api/gallery/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ alt, tags })
        });
        await renderAdminDashboard();
    };
    window.approveGalleryImage = async function(id) {
        const token = localStorage.getItem('token');
        await fetch(`/api/gallery/approve/${id}`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` }
        });
        await renderAdminDashboard();
    };
    // Bulk upload
    const bulkForm = document.getElementById('bulkGalleryUploadForm');
    if (bulkForm) {
        bulkForm.onsubmit = async (e) => {
            e.preventDefault();
            const files = document.getElementById('bulkGalleryFiles').files;
            const captions = document.getElementById('bulkGalleryCaptions').value.split(',');
            const tags = document.getElementById('bulkGalleryTags').value.split(',').map(t=>t.trim()).filter(Boolean);
            // For demo, use FileReader to convert to base64 (in prod, use real file upload)
            const images = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                images.push(await new Promise(resolve => {
                    reader.onload = () => resolve({ src: reader.result, alt: captions[i]||'', tags });
                    reader.readAsDataURL(file);
                }));
            }
            const token = localStorage.getItem('token');
            await fetch('/api/gallery/bulk-upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ images })
            });
            await renderAdminDashboard();
        };
    }

    // Render course enrollments
    try {
        const res = await fetch('/api/courses/enrollments', {
            headers: { Authorization: `Bearer ${token}` }
        });
        const enrollments = await res.json();
        coursesTable.innerHTML = enrollments.map(e => `
            <tr>
                <td>${e.email}</td>
                <td>${e.course}</td>
            </tr>
        `).join('');
    } catch {
        coursesTable.innerHTML = '<tr><td colspan="2">Failed to load enrollments</td></tr>';
    }
}


// Contact form logic
const contactForm = document.getElementById('contactForm');
const contactMsg = document.getElementById('contactMsg');
if (contactForm) {
    contactForm.onsubmit = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(contactForm));
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await res.json().catch(() => ({}));
        if (res.ok && result.success) {
            showToast('Message sent! We will get back to you soon.');
            contactForm.reset();
            contactForm.querySelector('input,textarea,button').focus();
        } else {
            showToast(result.error || 'Failed to send message.');
        }
    };
}


// ==== THEME TOGGLE & TOAST NOTIFICATIONS ====

// Theme toggle logic
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  const setTheme = (theme) => {
    document.body.classList.toggle('light-theme', theme === 'light');
    document.body.classList.toggle('dark-theme', theme === 'dark');
    localStorage.setItem('hl_theme', theme);
    themeToggle.innerHTML = theme === 'light'
      ? '<i class="fa fa-moon"></i>'
      : '<i class="fa fa-sun"></i>';
  };
  // Initialize
  const stored = localStorage.getItem('hl_theme');
  setTheme(stored || 'dark');
  themeToggle.onclick = () => {
    const current = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    setTheme(current === 'light' ? 'dark' : 'light');
  };
}

// Toast notification
window.showToast = function(msg, duration=3000) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className = 'show';
  setTimeout(() => { toast.className = ''; }, duration);
};

// Animate fade-in for all sections
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.section, .course-card, .gallery-section, .admin-table, .modal-content').forEach(el => {
    el.style.animationDelay = (Math.random() * 0.3 + 0.1) + 's';
  });
});

// ==== COURSE QUIZ & CERTIFICATE LOGIC ====

const quizSets = {
  Basics: [
    {
      q: "Which of the following is NOT a classic IBA cocktail?",
      options: ["Martini", "Margarita", "Cosmopolitan", "Irish Coffee"],
      answer: 2 // Cosmopolitan is a Contemporary Classic
    },
    {
      q: "What is the correct technique for a Negroni?",
      options: ["Shake", "Stir", "Blend", "Muddle"],
      answer: 1
    },
    {
      q: "Which tool is used to measure spirits?",
      options: ["Jigger", "Muddler", "Shaker", "Strainer"],
      answer: 0
    },
    {
      q: "What is the garnish for a classic Old Fashioned?",
      options: ["Olive", "Orange Peel", "Lime Wheel", "Mint Sprig"],
      answer: 1
    },
    {
      q: "What is the main spirit in a Daiquiri?",
      options: ["Vodka", "Gin", "Rum", "Tequila"],
      answer: 2
    }
  ],
  Pro: [
    {
      q: "Which ingredient is NOT typically in a Mai Tai?",
      options: ["White Rum", "Orgeat", "Blue Curaçao", "Lime Juice"],
      answer: 2
    },
    {
      q: "Which advanced technique involves layering spirits?",
      options: ["Muddling", "Building", "Floating", "Shaking"],
      answer: 2
    },
    {
      q: "What is a key feature of IBA World Championship competitions?",
      options: ["Speed Pour", "Blind Tasting", "Flair Bartending", "Wine Pairing"],
      answer: 2
    },
    {
      q: "Which cocktail uses espresso as an ingredient?",
      options: ["Espresso Martini", "Penicillin", "Bloody Mary", "Negroni"],
      answer: 0
    },
    {
      q: "For high-volume events, which is most important?",
      options: ["Speed & Accuracy", "Garnish Variety", "Signature Menu", "Glassware Selection"],
      answer: 0
    }
  ]
};

let currentQuizCourse = null;

window.showQuizModal = function(course) {
  currentQuizCourse = course;
  document.getElementById('quizTitle').textContent = `${course} Quiz`;
  const questions = quizSets[course];
  const quizDiv = document.getElementById('quizQuestions');
  quizDiv.innerHTML = questions.map((q, i) => `
    <div class='quiz-q' style='margin-bottom:1rem;'>
      <div style='font-weight:600;'>${i+1}. ${q.q}</div>
      ${q.options.map((opt, j) => `
        <label style='display:block;margin-left:1em;'>
          <input type='radio' name='q${i}' value='${j}' required /> ${opt}
        </label>
      `).join('')}
    </div>
  `).join('');
  document.getElementById('quizMsg').textContent = '';
  document.getElementById('quizModal').style.display = '';
  document.body.style.overflow = 'hidden';
};

window.closeQuizModal = function() {
  document.getElementById('quizModal').style.display = 'none';
  document.body.style.overflow = '';
};

const quizForm = document.getElementById('quizForm');
if (quizForm) {
  quizForm.onsubmit = async function(e) {
    e.preventDefault();
    const questions = quizSets[currentQuizCourse];
    const answers = questions.map((q,i) => {
      const selected = quizForm[`q${i}`].value;
      return { correct: String(q.answer) === selected };
    });
    if (answers.some(a => !a.correct)) {
      document.getElementById('quizMsg').textContent = 'Some answers are incorrect. Please review and try again!';
      return;
    }
    // Request certificate
    const email = prompt('Enter your email for the certificate:');
    if (!email) return;
    document.getElementById('quizMsg').textContent = 'Submitting...';
    const res = await fetch('/api/certificates/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, course: currentQuizCourse, answers })
    });
    const result = await res.json().catch(()=>({}));
    if (res.ok && result.success) {
      document.getElementById('quizMsg').textContent = 'Congratulations! Your certificate will be sent to your email.';
    } else {
      document.getElementById('quizMsg').textContent = result.error || 'Failed to issue certificate.';
    }
  };
}

// Course enroll/certificate logic
window.enrollCourse = async function(course) {
    const emailInput = document.getElementById(`course${course}Email`);
    const msgSpan = emailInput.parentElement.querySelector('.courseMsg');
    const certBtn = emailInput.parentElement.querySelector('button[onclick^="requestCertificate"]');
    msgSpan.textContent = '';
    certBtn.style.display = 'none';
    const email = emailInput.value.trim();
    if (!email) {
        msgSpan.textContent = 'Enter your email.';
        return;
    }
    const res = await fetch('/api/courses/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, course })
    });
    const result = await res.json();
    if (res.ok && result.success) {
        msgSpan.textContent = 'Enrolled! You may now request a certificate.';
        certBtn.style.display = '';
    } else {
        msgSpan.textContent = result.error || 'Enrollment failed.';
    }
};

window.requestCertificate = async function(course) {
    const emailInput = document.getElementById(`course${course}Email`);
    const msgSpan = emailInput.parentElement.querySelector('.courseMsg');
    msgSpan.textContent = '';
    const email = emailInput.value.trim();
    if (!email) {
        msgSpan.textContent = 'Enter your email.';
        return;
    }
    const res = await fetch('/api/courses/certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, course })
    });
    const result = await res.json();
    if (res.ok && result.success) {
        msgSpan.textContent = 'Certificate sent! (mock)';
    } else {
        msgSpan.textContent = result.error || 'Certificate request failed.';
    }
};

window.deleteBooking = async function(id) {
    if (!confirm('Delete this booking?')) return;
    const token = localStorage.getItem('token');
    await fetch(`/api/bookings/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
    });
    renderAdminDashboard();
};

window.deleteGalleryImage = async function(id) {
    if (!confirm('Delete this image?')) return;
    const token = localStorage.getItem('token');
    await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
    });
    renderAdminDashboard();
};


let authMode = 'login';
toggleAuthMode.onclick = () => {
    authMode = authMode === 'login' ? 'register' : 'login';
    loginForm.style.display = authMode === 'login' ? '' : 'none';
    registerForm.style.display = authMode === 'register' ? '' : 'none';
    toggleAuthMode.textContent = authMode === 'login' ? 'Switch to Register' : 'Switch to Login';
    loginMsg.textContent = '';
};

if (loginForm) {
    loginForm.onsubmit = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(loginForm));
        const res = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await res.json().catch(() => ({}));
        if (res.ok && result.token) {
            localStorage.setItem('token', result.token);
            setAdminMode(true);
            loginMsg.textContent = 'Login successful!';
        } else {
            loginMsg.textContent = result.error || 'Login failed.';
        }
        loginForm.reset();
    };
}

if (registerForm) {
    registerForm.onsubmit = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(registerForm));
        const res = await fetch('/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await res.json().catch(() => ({}));
        if (res.ok && result.email) {
            loginMsg.textContent = result.message || 'Registration successful! Please check your email to verify.';
            authMode = 'login';
            loginForm.style.display = '';
            registerForm.style.display = 'none';
            toggleAuthMode.textContent = 'Switch to Register';
        } else {
            loginMsg.textContent = result.error || 'Registration failed.';
            // Show resend verification if applicable
            if (result.error && result.error.includes('verify')) {
                document.getElementById('resendVerificationBtn').style.display = '';
            }
        }
        registerForm.reset();
    };
    // Resend verification logic
    const resendBtn = document.getElementById('resendVerificationBtn');
    if (resendBtn) {
        resendBtn.onclick = async () => {
            const email = registerForm.querySelector('input[name="email"]').value;
            if (!email) {
                loginMsg.textContent = 'Enter your email above.';
                return;
            }
            const res = await fetch('/api/email/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const result = await res.json().catch(() => ({}));
            if (res.ok && result.success) {
                loginMsg.textContent = 'Verification email resent.';
            } else {
                loginMsg.textContent = result.error || 'Failed to resend verification.';
            }
        };
    }
}

if (logoutBtn) {
    logoutBtn.onclick = () => {
        localStorage.removeItem('token');
        setAdminMode(false);
        loginMsg.textContent = 'Logged out.';
    };
}

// Auto-login as admin if token exists
if (localStorage.getItem('token')) setAdminMode(true);
