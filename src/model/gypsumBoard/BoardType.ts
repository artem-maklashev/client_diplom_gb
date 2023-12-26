class BoardType {
    id: number;
    name: string;
    description?: String;

    constructor(id: number, name: string, description: String) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}
export default BoardType;