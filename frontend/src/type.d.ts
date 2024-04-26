type TCar = {
  id: number;
  licencePlate: string;
  stamp: string;
  model: string;
  year: string;
  bodyNumber: string;
  oil: string;
  odometer: number;
  visits: TVisit[];
};

type TJob = {
  id: number;
  type: string;
  description: string;
  price: number;
  done: boolean;
};

type TVisit = {
  id: number;
  visitDate: string;
  jobs: TJob[];
  comment: string;
  carId: number;
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

type TCarPagination = {
  totalPages: number;
  totalElements: number;
  pageable: PageableType;
  first: boolean;
  size: number;
  content: TCar[];
  number: number;
  sort: SortType[];
  numberOfElements: number;
  last: boolean;
  empty: boolean;
};
