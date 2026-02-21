// Deputy types
interface PersonCardInfo {
  id: number;
  documentId: string;
  firstName: string;
  lastName: string;
  party: Party;
  fraction: string;
  placeOfEmployment: string;
  photo: Photo;
  shames: ShameCardInfo[];
  relatedBusinessess: Title[];
  otherIncomes: Title[];
  hasCorruptOfficialsDatabase: string;
}

type Title = {
  id: number;
  title?: string;
};
interface Photo {
  formats?: {
    small: {
      url: string;
    };
    thumbnail: {
      url: string;
    };
  };
  url: string;
}
interface Party {
  logo: {
    url: string;
  };
  name: string;
  deputats: PersonCardInfo[];
}

// Shame types
interface ShameCardInfo {
  id: number;
  documentId: string;
  date: string;
  title: string;
  description: string;
  details: DetailParagraph[];
  deputats: PersonCardInfo[];
  resources: Resource[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale?: string;

  localizations?: Localizations[];
}

type Resource = {
  id: number;
  subtitle?: string;
  title: string;
  url: string;
};
interface Localizations {
  id: number | string;
  documentId: string;
}

interface TextChild {
  text: string;
  type: 'text';
}

interface DetailParagraph {
  type: 'paragraph';
  children: TextChild[];
}
export type { PersonCardInfo, ShameCardInfo };
