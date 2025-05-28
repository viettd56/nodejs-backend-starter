import { SampleModel } from "src/models/data/Sample.model";

export class SampleEntity {
    private id: string;
    private name: string;

    constructor({id, name}: {id: string, name: string}) {
        this.id = id;
        this.name = name;
    }

    public toObject() {
        return {
            id: this.id,
            name: this.name,
        };
    }

    public static fromObjectModel(obj: SampleModel) {
        return new SampleEntity({id: obj.id, name: obj.name});
    }

    public clearName(){
        this.name = ""
    }
}
