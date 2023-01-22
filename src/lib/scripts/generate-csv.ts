import { getOptionForId } from "./faker-wrapper";
import type { ColumnDetails } from "./types";

function generateDataForOption(optionId: string){
    const option = getOptionForId(optionId)
    return (option.generateFunction())
}

// could have another stage before this, why generates the json so all this does it write it
export function generateCSV(numRows: number, columnDeets: ColumnDetails[]){
    if(columnDeets.length === 1 && !columnDeets[0].columnName && !columnDeets[0].fixedOptionValue){
        return [];
    }
    const rows = Array(numRows).fill({});
    const rowsWithDataByColumnData = rows.map(_ => {
        const rowData: Record<string,string> = {}
        columnDeets.forEach(deet => {
            rowData[deet.columnName]= deet.fixedOptionValue || generateDataForOption(deet.optionId)
        })
        return rowData
    });

    return rowsWithDataByColumnData
}