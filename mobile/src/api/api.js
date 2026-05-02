// IMPORTANT: Set this to your computer's LAN IP, e.g. 'http://192.168.1.42:8000/api'
const BASE_URL = 'http://10.240.41.31:8000/api';

export async function login(username, password) {
  const response = await fetch(`${BASE_URL}/account/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await response.json();
  return { status: response.status, ...data };
}

export async function register(form) {
  const response = await fetch(`${BASE_URL}/account/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form)
  });
  const data = await response.json();
  return { status: response.status, ...data };
}

export async function getFeedbacks(token) {
  const response = await fetch(`${BASE_URL}/feedbacks/`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await response.json();
  return { status: response.status, data };
}

export async function submitFeedback(token, feedback) {
  const isFormData = feedback instanceof FormData;
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json', // Add this to tell Django you want JSON back
  };

  // ONLY set Content-Type if it's NOT FormData
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(`${BASE_URL}/feedbacks/`, {
      method: 'POST',
      headers: headers,
      body: isFormData ? feedback : JSON.stringify(feedback)
    });

    const data = await response.json();
    // This ensures that res.status is always available for checking
    return { ...data, status: response.status };
  } catch (error) {
    console.error("Fetch Error:", error);
    return { status: 500, detail: "Network error" };
  }
}

export async function getNotifications(token) {
  const response = await fetch(`${BASE_URL}/notifications/`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await response.json();
  return { status: response.status, data };
}

export async function getUsers(token, role) {
  let url = `${BASE_URL}/users/`;
  if (role) url += `?role=${role}`;
  const response = await fetch(url, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await response.json();
  return { status: response.status, data };
}
