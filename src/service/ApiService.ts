import Plan from "../model/gypsumBoard/Plan";
import BoardProduction from "../model/production/BoardProduction";

class ApiService {
    private static baseUrl = process.env.REACT_APP_API_URL;

    static async fetchTodayPlan(): Promise<Plan[]> {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/planData`);
            if (!response.ok) {
                throw new Error(`Ошибка при запросе: ${response.status} ${response.statusText}`);
            }
            return await response.json();
        } catch (error: any) {
            console.error(`Произошла ошибка: ${error.message}`);
            throw error;
        }
    }

    static async fetchTodayBoardProduction(): Promise<BoardProduction[]> {

        try {
            const now = new Date();
            const params = new URLSearchParams({

                    startDate: this.getFormattedDate(new Date(now.getFullYear(), now.getMonth(), 1)),
                    endDate: this.getFormattedDate(now)
                    // startDate: this.getFormattedDate(new Date(2023, 12, 1)),
                    // endDate: this.getFormattedDate(new Date(2023,12, 10))
                })
            ;

            const response = await fetch(`${process.env.REACT_APP_API_URL}/allboard/production?${params.toString()}`);
            return await response.json();
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