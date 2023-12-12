import BoardDefectsLog from "../../../model/defects/BoardDefectsLog";

class DefectsDataPrepare {
    defectsData: BoardDefectsLog[];

    constructor(defectsData: BoardDefectsLog[]) {
        this.defectsData = defectsData;
    }

    getSummary() {
        const defectSummary: {[key: string]: number} = {}

        this.defectsData.forEach((item) => {
            const defectType = item.defects.defectTypes.name;

            if (!defectSummary[defectType]) {
                defectSummary[defectType] = 0;
            }
            defectSummary[defectType] += item.value;
        });
        const sortedValues = Object.values(defectSummary).sort((a, b) => b - a);
        Object.keys(defectSummary).forEach((key, index) => {
            defectSummary[key] = sortedValues[index];
        });
        return defectSummary;
    }
}
export default DefectsDataPrepare;