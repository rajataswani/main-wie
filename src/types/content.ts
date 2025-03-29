
export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  location: string;
  imageUrl: string;
  ieeeCount?: number;
  nonIeeeCount?: number;
}

export interface Award {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
}
