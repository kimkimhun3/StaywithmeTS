import { API_BASE_URL, API_KEY } from '../utils/constants';
import type { UploadResponse, ListMDXResponse, DeleteResponse, ApiError } from '../types/api';

class ApiService {
  private baseURL: string;
  private apiKey: string;

  constructor(baseURL: string, apiKey: string) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
  }

  private getHeaders(): HeadersInit {
    return {
      'X-API-Key': this.apiKey,
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.detail || `HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
  }

  async uploadMDX(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${this.baseURL}/upload-mdx/`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: formData,
    });

    return this.handleResponse<UploadResponse>(response);
  }

  async uploadImage(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${this.baseURL}/upload-image/`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: formData,
    });

    return this.handleResponse<UploadResponse>(response);
  }

  async listMDXFiles(): Promise<ListMDXResponse> {
    const response = await fetch(`${this.baseURL}/list-mdx/`);
    return this.handleResponse<ListMDXResponse>(response);
  }

  async getMDXContent(filename: string): Promise<string> {
    const response = await fetch(`${this.baseURL}/get-mdx/${encodeURIComponent(filename)}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${filename}`);
    }
    return response.text();
  }

  async deleteMDXFile(filename: string): Promise<DeleteResponse> {
    const response = await fetch(
      `${this.baseURL}/delete-mdx/?filename=${encodeURIComponent(filename)}`,
      {
        method: 'DELETE',
        headers: this.getHeaders(),
      }
    );

    return this.handleResponse<DeleteResponse>(response);
  }

  getMDXDownloadURL(filename: string): string {
    return `${this.baseURL}/get-mdx/${encodeURIComponent(filename)}`;
  }

  getImageURL(filename: string): string {
    return `${this.baseURL}/images/${filename}`;
  }
}

export const apiService = new ApiService(API_BASE_URL, API_KEY);