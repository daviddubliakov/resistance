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
    };
  };
  shames: any[];
  relatedBusinessess: any[];
  otherIncomes: any[];
}

interface ShameCardInfo {
  image: string;
  name: string;
  add: string;
  date: string;
  description: string;
}

export type { PersonCardInfo, ShameCardInfo };
