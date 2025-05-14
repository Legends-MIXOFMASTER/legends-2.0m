// Dashboard logic: fetch user bookings, courses, profile
window.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('user_email');
  document.getElementById('userEmail').textContent = email || '';
  // Bookings
  try {
    const res = await fetch('/api/bookings/user', { headers: { Authorization: `Bearer ${token}` } });
    const bookings = await res.json();
    document.getElementById('userBookings').innerHTML = bookings.map(b => `<tr><td>${b.date}</td><td>${b.time}</td><td>${b.service}</td></tr>`).join('');
  } catch {
    document.getElementById('userBookings').innerHTML = '<tr><td colspan="3">Failed to load</td></tr>';
  }
  // Courses
  try {
    const res = await fetch('/api/courses/user', { headers: { Authorization: `Bearer ${token}` } });
    const courses = await res.json();
    document.getElementById('userCourses').innerHTML = courses.map(c => `<tr><td>${c.course}</td><td>${c.status}</td><td>${c.certificateUrl ? `<a href='${c.certificateUrl}' target='_blank'>Download</a>` : '—'}</td></tr>`).join('');
  } catch {
    document.getElementById('userCourses').innerHTML = '<tr><td colspan="3">Failed to load</td></tr>';
  }
  // Profile update
  const profileForm = document.getElementById('profileForm');
  if (profileForm) {
    profileForm.onsubmit = async (e) => {
      e.preventDefault();
      const password = document.getElementById('profilePassword').value;
      if (!password) return;
      const res = await fetch('/api/user/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ password })
      });
      const result = await res.json().catch(()=>({}));
      document.getElementById('profileMsg').textContent = res.ok ? 'Password updated!' : (result.error || 'Failed to update');
    };
  }
  // Logout
  document.getElementById('logoutDash').onclick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_email');
    window.location = 'index.html';
  };
});
