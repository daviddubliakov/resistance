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

type Resource = {
  id: number;
  subtitle: string;
  title: string;
  url: string;
};

interface ShameCardInfo {
  id: number;
  documentId: string;
  date: string;
  title: string;
  description: string;
  details: unknown[];
  deputats: PersonCardInfo[];
  resources: Resource[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  localizations?: any[];
}

export type { PersonCardInfo, ShameCardInfo };
