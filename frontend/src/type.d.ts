type TCars = {
    id: number;
    name: string;
    lastname: string;
    midname: string;
    reg: string;
    brand: string;
    model: string;
    year: string;
    vin: string;
    color: string;
    descriptionCar: string;
    card: string;
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