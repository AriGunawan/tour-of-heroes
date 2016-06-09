export class InMemoryDataService {
    createDb() {
        let heroes = [
            { "id": 11, "name": "Batman"},
            { "id": 12, "name": "Superman"},
            { "id": 13, "name": "Deadpool"},
            { "id": 14, "name": "Ironman"},
            { "id": 15, "name": "Flash"},
            { "id": 16, "name": "Spiderman"},
            { "id": 17, "name": "Thor"},
            { "id": 18, "name": "Hawkeye"},
            { "id": 19, "name": "Hulk"},
            { "id": 20, "name": "Quicksilver"}
        ];
        return {heroes};
    }
}