export class InMemoryDataService {
    createDb() {
        let heroes = [
            { "id": 11, "name": "Batman", "power": "Fighter"},
            { "id": 12, "name": "Superman", "power": "Fighter"},
            { "id": 13, "name": "Deadpool", "power": "Fighter"},
            { "id": 14, "name": "Ironman", "power": "Fighter"},
            { "id": 15, "name": "Flash", "power": "Fighter"},
            { "id": 16, "name": "Spiderman", "power": "Fighter"},
            { "id": 17, "name": "Thor", "power": "Fighter"},
            { "id": 18, "name": "Hawkeye", "power": "Fighter"},
            { "id": 19, "name": "Hulk", "power": "Fighter"},
            { "id": 20, "name": "Quicksilver", "power": "Fighter"}
        ];
        return {heroes};
    }
}