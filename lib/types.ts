// Tipe domain untuk daftar layanan & proyek (dipakai Hub Section + API).

export interface Service {
  id: number;
  slug: string;
  name: string;
  description: string;
  image: string;
  href: string;
  sortOrder: number;
  isActive: boolean;
}

export interface Project {
  id: number;
  slug: string;
  number: string; // nomor tampil, mis. "01"
  title: string;
  client: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  sortOrder: number;
  isActive: boolean;
}

// Payload tanpa field yang di-generate DB.
export type ServiceInput = Omit<Service, "id">;
export type ProjectInput = Omit<Project, "id">;
