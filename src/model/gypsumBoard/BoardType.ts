class BoardType {
    id: number;
    name: String;
    description?: String;

    constructor(id: number, name: String, description: String) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}
export default BoardType;