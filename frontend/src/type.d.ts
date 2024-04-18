type TCar = {
    id: number;
    licencePlate: string;
    stamp: string;
    model: string;
    year: string;
    bodyNumber: string;
    oil: string;
    odometer: number;
    carVisit: TCarVisit[]
}

type TCarVisit = {
    visitDate: string;
    comment: string;
    carId: number;
    jobs: TJobs[];
}

type TJobs = {
    type: string;
    description: string;
    price: number;
    isDone: boolean;
}

type TVisits = {
    id: number;
    visitDate: string;
    jobs: TJobs[];
    comment: string;
    carId: number;
}