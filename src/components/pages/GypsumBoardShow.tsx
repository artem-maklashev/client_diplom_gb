import {GypsumBoardPlanFactTable} from "./gypsumBoardElements/GypsumBoardPlanFactTable";
import React from "react";


function GypsumBoardShow(){
    let monthIndex: number = 4;
    let year: number = 2023;
    let result = GypsumBoardPlanFactTable(monthIndex,year);

    return (
        <div className="container">
            <result />
        </div>

    );

}

export default GypsumBoardShow;
