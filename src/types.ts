interface PersonCardInfo {
  id: number;
  documentId: string;
  firstName: string;
  lastName: string;
  party: string;
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
  };
  shames: any[];
  relatedBusinessess: any[];
  otherIncomes: any[];
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
