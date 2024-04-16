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

type TAttachment = {
    id: number;
    name: string;
}

type TWorks = {
    id: number;
    name: string;
    price: string;
    date: string;
}

type TVisits = {
    id: number;
    description: string;
    attachments: TAttachment[];
    works: TWorks[];
}