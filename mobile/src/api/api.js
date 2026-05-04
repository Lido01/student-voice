import { Platform } from 'react-native';

const DEFAULT_BASE_URL = Platform.select({
  android: 'http://10.0.2.2:8000/api',
  ios: 'http://localhost:8000/api',
  default: 'http://localhost:8000/api',
});

// Allow local development without editing source, while still supporting device testing.
const BASE_URL = String(process.env.EXPO_PUBLIC_API_BASE_URL || DEFAULT_BASE_URL).replace(/\/$/, '');

/**
 * Helper to handle fetch responses and ensure status is included
 */
async function handleResponse(response) {
  try {
    const data = await response.json();
    return { status: response.status, ...(Array.isArray(data) ? { data } : data) };
  } catch (e) {
    const text = await response.text().catch(() => '');
    return {
      status: response.status,
      detail: text || 'Unexpected response from server',
    };
  }
}

export async function login(username, password) {
  const response = await fetch(`${BASE_URL}/account/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return handleResponse(response);
}

export async function register(form) {
  const response = await fetch(`${BASE_URL}/account/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form)
  });
  return handleResponse(response);
}

export async function getFeedbacks(token) {
  const response = await fetch(`${BASE_URL}/feedbacks/`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return handleResponse(response);
}

/**
 * ADMIN/DEPT: Update feedback status and add response
 * Path: /api/feedbacks/{id}/
 */
export async function updateFeedbackStatus(token, id, payload) {
  const response = await fetch(`${BASE_URL}/feedbacks/${id}/`, {
    method: 'PATCH', // PATCH is best for partial updates like 'status'
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  return handleResponse(response);
}

/**
 * ADMIN: Delete feedback
 * Path: /api/feedbacks/{id}/
 */
export async function deleteFeedback(token, id) {
  try {
    const response = await fetch(`${BASE_URL}/feedbacks/${id}/`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (response.status === 204) return { status: 204, success: true };
    return handleResponse(response);
  } catch (error) {
    return { status: 500, detail: "Network error" };
  }
}

export async function submitFeedback(token, feedback) {
  const isFormData = feedback instanceof FormData;
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
  };

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(`${BASE_URL}/feedbacks/`, {
      method: 'POST',
      headers: headers,
      body: isFormData ? feedback : JSON.stringify(feedback)
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Fetch Error:", error);
    return { status: 500, detail: "Network error" };
  }
}

export async function getNotifications(token) {
  const response = await fetch(`${BASE_URL}/notifications/`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return handleResponse(response);
}

export async function getUsers(token, role) {
  let url = `${BASE_URL}/users/`;
  if (role) url += `?role=${role}`;
  const response = await fetch(url, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return handleResponse(response);
}
