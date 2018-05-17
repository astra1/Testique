export interface Company {
    id: number;
    name: string;
    type: string;
    revenuePerWeek: RevenuePerWeek;
    revenue: number;
    monthRevenue: number;
}

export interface RevenuePerWeek {
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
    saturday: number;
    sunday: number;
}
