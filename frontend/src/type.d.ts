type TClient = {
  id: number;
  licencePlate: string;
  stamp?: string;
  model?: string;
  year: string;
  bodyNumber?: string;
  oil?: string;
  odometer?: number;
  visits?: TVisit[];
};

type TJob = {
  id: number;
  name: string;
  description: string;
  price: number;
  done: boolean;
  isTemplate: boolean;
};

type TVisit = {
  id: number;
  visitDate: string;
  jobs: TJob[];
  comment: string;
  clientId: number;
};

type SortType = {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
};

type PageableType = {
  pageNumber: number;
  pageSize: number;
  offset: number;
  sort: SortType[];
  paged: boolean;
  unpaged: boolean;
};

type TClientPagination = {
  totalPages: number;
  totalElements: number;
  pageable: PageableType;
  first: boolean;
  size: number;
  content: TClient[];
  number: number;
  sort: SortType[];
  numberOfElements: number;
  last: boolean;
  empty: boolean;
};

type TCalendarVisits = {
  clientId: number;
  visitId: number;
  licencePlate: string;
  stamp?: string;
  model?: string;
  visitDate: string;
};
