import { RepositoriesMockData } from './../services/api/dto/responses/RepositoriesDTO';

export class CommonUtils {

    static getRepositoriesMockData(): RepositoriesMockData[] {
        return [
            {
                "id": 1,
                "state": 604
            },
            {
                "id": 2,
                "state": 605
            },
            {
                "id": 3,
                "state": 606
            }
        ];
    }
}