export interface ProfileData {
  name: string;
  title: string;
  bio: string;
  achievements: string[];
  socials: {
    linkedin: string;
    github: string;
    instagram: string;
  };
}

export interface ProjectData {
  id: string;
  num: string;
  title: string;
  category: string;
  desc: string;
  tech: string;
  github_url: string;
  live_url?: string;
  gradientClass: string;
}

export interface SkillData {
  num: string;
  name: string;
  desc: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

const API_BASE_URL = '/api';

/**
 * Fetch health status of the backend API
 */
export async function getHealthStatus() {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    if (!res.ok) throw new Error('Health check failed');
    return await res.json();
  } catch (err) {
    console.warn('Backend API offline, operating in static fallback mode.', err);
    return { status: 'offline' };
  }
}

/**
 * Fetch profile information from FastAPI backend
 */
export async function fetchProfile() {
  try {
    const res = await fetch(`${API_BASE_URL}/profile`);
    if (!res.ok) throw new Error('Failed to fetch profile');
    return await res.json();
  } catch (err) {
    console.warn('Failed to fetch profile from API, using fallback data.', err);
    return null;
  }
}

/**
 * Fetch projects list from FastAPI backend
 */
export async function fetchProjects(): Promise<ProjectData[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/projects`);
    if (!res.ok) throw new Error('Failed to fetch projects');
    return await res.json();
  } catch (err) {
    console.warn('Failed to fetch projects from API, using fallback data.', err);
    return [];
  }
}

/**
 * Fetch skills list from FastAPI backend
 */
export async function fetchSkills(): Promise<SkillData[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/skills`);
    if (!res.ok) throw new Error('Failed to fetch skills');
    return await res.json();
  } catch (err) {
    console.warn('Failed to fetch skills from API, using fallback data.', err);
    return [];
  }
}

/**
 * Submit contact message to FastAPI backend
 */
export async function sendContactForm(payload: ContactPayload) {
  try {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || 'Failed to submit contact message');
    }

    return await res.json();
  } catch (err: any) {
    console.error('Error submitting contact form:', err);
    return {
      success: false,
      message: err.message || 'Network error, please try again.',
    };
  }
}
