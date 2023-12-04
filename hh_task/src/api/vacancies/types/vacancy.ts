type Adress = {
    city?: string;
    raw?: string;
};

type Area = {
    name: string;
};

type Salary = {
    from?: number;
    to?: number;
    currency?: string;
};

type Metro = {
    station_name: string;
    line_name: string;
};

type Logos = {
    original?: string;
};

type Employer = {
    name: string;
    logo_urls?: Logos;
};

type Experience = {
    name?: string;
};

type Employment = {
    name?: string;
};

export type Item = {
    id: string;
    name: string;
    area: Area;
    address: Adress;
    salary: Salary;
    merto_stations: Metro;
    employer: Employer;
    experience: Experience;
    employment: Employment;
    url: string;
    alternate_url: string;
};

export type Data = {
    items: Item[];
    pages: number;
};
