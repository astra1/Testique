
export interface WeekStats {
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
    saturday: number;
    sunday: number;
}

export interface Item {
    id: number;
    name: string;
    category: string;
    weekStats: WeekStats;
    balance: number;
    monthBalance: number;
}

