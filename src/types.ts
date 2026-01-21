interface PersonCardInfo {
  id: number;
  documentId: string;
  firstName: string;
  lastName: string;
  party: {
    logo: {
      url: string;
    };
    name: string;
    deputats: PersonCardInfo[];
  };
  fraction: string;
  isCorrupt: boolean;
  placeOfEmployment: string;
  photo: {
    formats?: {
      small: {
        url: string;
      };
      thumbnail: {
        url: string;
      };
    };
    url: string;
  };
  shames: ShameCardInfo[];
  relatedBusinessess: {
    id: number;
    title: string;
  }[];
  otherIncomes: {
    id: number;
    title?: string;
  }[];
}

interface ShameCardInfo {
  id: number;
  documentId: string;
  date: string;
  title: string;
  description: string;
  details: any;
  deputats: PersonCardInfo[];
  resources: any[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale?: string;
  localizations?: any[];
}

export type { PersonCardInfo, ShameCardInfo };
