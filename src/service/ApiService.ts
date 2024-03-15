import Plan from "../model/gypsumBoard/Plan";
import {api} from "./Api";
import BoardProduction from "../model/production/BoardProduction";

class ApiService {
    private static baseUrl = process.env.REACT_APP_API_URL;

    static async fetchTodayPlan(): Promise<Plan[]> {
        try {
            const response = await api.get(`${this.baseUrl}/planData`);
            return response.data;
        } catch (error: any) {
            console.error(`Произошла ошибка: ${error.message}`);
            throw error;
        }
    }

    static async fetchTodayBoardProduction(): Promise<BoardProduction[]> {
        try {
            const now = new Date();
            const params = {
                startDate: this.getFormattedDate(new Date(now.getFullYear(), now.getMonth(), 1)),
                endDate: this.getFormattedDate(now)
            };

            const response = await api.get(`${this.baseUrl}/allboard/production`, { params });
            return response.data;
        } catch (error: any) {
            console.error(`Произошла ошибка: ${error.message}`);
            throw error;
        }
    }

    static getFormattedDate(date: Date): string {
        const year = date.getUTCFullYear();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = date.getUTCDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
}

export default ApiService;
