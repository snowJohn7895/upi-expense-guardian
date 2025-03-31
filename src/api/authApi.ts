
import apiClient from './apiClient';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    isOnboarded: boolean;
  };
  token?: string;
}

export const login = async (credentials: LoginRequest) => {
  const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
  
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('isAuthenticated', 'true');
    
    if (response.data.data.isOnboarded) {
      localStorage.setItem('isOnboarded', 'true');
    }
  }
  
  return response.data;
};

export const register = async (userData: RegisterRequest) => {
  const response = await apiClient.post<AuthResponse>('/auth/register', userData);
  return response.data;
};

export const completeOnboarding = async (userId: string) => {
  const response = await apiClient.put<{success: boolean; data: {isOnboarded: boolean}}>(
    `/auth/onboarding/${userId}`,
    {}
  );
  
  if (response.data.success) {
    localStorage.setItem('isOnboarded', 'true');
  }
  
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('isOnboarded');
};
