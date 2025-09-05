export const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };
  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed with status ${res.status}`);
  }
  return res.json();
}

export async function loginApi(email: string, password: string): Promise<{ token: string; user: any }> {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function signupApi(payload: { name: string; email: string; password: string; role: 'student' | 'warden' | 'maintenance' }): Promise<{ token: string; user: any }> {
  return apiRequest('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function createComplaintApi(payload: { title: string; description: string; category: string }): Promise<any> {
  return apiRequest('/complaints', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function listMyComplaintsApi(): Promise<any[]> {
  return apiRequest('/complaints/me', { method: 'GET' });
}


