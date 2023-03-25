export interface SessionResource {
  id: string;
  createdAt: string;
  currentSession: boolean;
  ipAddress: string;
  countryCode: string;
  country: string;
  regionName: string;
  latitude: number;
  longitude: number;
  city: string;
}
