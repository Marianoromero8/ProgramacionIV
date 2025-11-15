import axios, { AxiosInstance } from 'axios';
import {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  Product,
  TransferData,
  CaptchaData,
  UploadResponse,
  User
} from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class ApiService {
  private api: AxiosInstance;
  private csrfToken: string | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });

    // Interceptor para agregar el token a las peticiones
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }


  //CSRF: obtener token (con caching simple)
  private async getCsrfToken(): Promise<string> {
    if (this.csrfToken) {
      return this.csrfToken;
    }

    const resp = await this.api.get<{ csrfToken: string }>('/api/csrf-token');
    const token = resp.data?.csrfToken;
    if (!token) throw new Error('No CSRF token returned from server');
    this.csrfToken = token;
    return token;
  }


  // Autenticación
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/api/login', credentials);
    return response.data;
  }

  async register(data: RegisterData): Promise<{ message: string }> {
    const response = await this.api.post<{ message: string }>('/api/register', data);
    return response.data;
  }

  async verifyToken(): Promise<{ valid: boolean; user: User }> {
    const response = await this.api.post<{ valid: boolean; user: User }>('/api/auth/verify');
    return response.data;
  }

  // Vulnerabilidad: Brute Force / Blind SQL Injection
  async checkUsername(username: string): Promise<{ exists: boolean }> {
    const response = await this.api.post<{ exists: boolean }>('/api/check-username', { username });
    return response.data;
  }

  // Vulnerabilidad: Command Injection
  async ping(host: string): Promise<{ output: string }> {
    const response = await this.api.post<{ output: string }>('/api/ping', { host });
    return response.data;
  }

  // Vulnerabilidad: CSRF
  // --- Transfer protegido con CSRF ---
  async transfer(data: TransferData): Promise<{ message: string }> {
    const csrfToken = await this.getCsrfToken();
    const response = await this.api.post<{ message: string }>(
      '/api/transfer',
      data,
      {
        headers: {
          'X-CSRF-Token': csrfToken
        }
      }
    );
    return response.data;
  }
  // Vulnerabilidad: SQL Injection
  async getProducts(params: { category?: string; search?: string }): Promise<Product[]> {
    const response = await this.api.get<Product[]>('/api/products', { params });
    return response.data;
  }

  // Vulnerabilidad: File Inclusion
  async readFile(filename: string): Promise<string> {
    const response = await this.api.get<string>('/api/file', {
      params: { filename },
      responseType: 'text' as any
    });
    return response.data;
  }

  // Vulnerabilidad: File Upload
  async uploadFile(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.api.post<UploadResponse>('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }

  // Vulnerabilidad: Insecure CAPTCHA
  async getCaptcha(): Promise<CaptchaData> {
    const response = await this.api.get<CaptchaData>('/api/captcha');
    return response.data;
  }

  async verifyCaptcha(captchaId: string, captchaText: string): Promise<{ valid: boolean }> {
    const response = await this.api.post<{ valid: boolean }>('/api/verify-captcha', {
      captchaId,
      captchaText
    });
    return response.data;
  }
}

export default new ApiService();
