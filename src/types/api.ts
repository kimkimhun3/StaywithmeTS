// src/types/api.ts
export interface UploadResponse {
  message: string;
  filename?: string;
  url?: string;
}

export interface ListMDXResponse {
  files: string[];
}

export interface DeleteResponse {
  message: string;
}

export interface ApiError {
  detail: string;
}