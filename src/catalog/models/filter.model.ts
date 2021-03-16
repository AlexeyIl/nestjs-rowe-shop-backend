import { Document } from "mongoose"

export class FilterModel { 
    filterSettingsDB: FilterSettingsDBInterface
    constructor(filterSettings: FilterSettingsInterface) {
        this.filterSettingsDB = {
            ABC: filterSettings.ABC,
            code: filterSettings.code,
            pack: {$in: filterSettings.pack},
            category: {$in: filterSettings.category},
            group: filterSettings.group,
            name: filterSettings.name,
            sae: {$in: filterSettings.sae}
        }
    }
    get getFilter(): FilterSettingsDBInterface{        
        for (const key in this.filterSettingsDB) {
            if(this.filterSettingsDB[key] === undefined){
                delete this.filterSettingsDB[key]
            }
            else if(typeof(this.filterSettingsDB[key]) === 'object' ? !Array.isArray(this.filterSettingsDB[key]['$in']) : false) {
                delete this.filterSettingsDB[key]
            }
        }
        return this.filterSettingsDB
    }
}

export interface FilterSettingsInterface {
    ABC?: number,
    code?: string,
    pack?: [number],
    category?: [string],
    group?: string,
    name?: string,
    sae?: [string]
}

export interface FilterSettingsDBInterface {
    ABC?: number,
    code?: string,
    pack?: {$in: [number]},
    category?: {$in: [string]},
    group?: string,
    name?: string,
    sae?: {$in: [string]}
}

export interface FilterListInteface {
    all?: CategoryFilterInterface,
    auto?: CategoryFilterInterface,
    moto?: CategoryFilterInterface,
    transmission?: CategoryFilterInterface,
    commercial?: CategoryFilterInterface,
    agriculture?: CategoryFilterInterface,
    antifreeze?: CategoryFilterInterface,
    grease?: CategoryFilterInterface,
    brake?: CategoryFilterInterface,
    industrial?: CategoryFilterInterface,
    marine?: CategoryFilterInterface
}

export interface CategoryFilterInterface {
    sae?: [string],
    pack?: [number]
}

export interface FilterListDB extends Document {
    all?: CategoryFilterInterface,
    auto?: CategoryFilterInterface,
    moto?: CategoryFilterInterface,
    transmission?: CategoryFilterInterface,
    commercial?: CategoryFilterInterface,
    agriculture?: CategoryFilterInterface,
    antifreeze?: CategoryFilterInterface,
    grease?: CategoryFilterInterface,
    brake?: CategoryFilterInterface,
    industrial?: CategoryFilterInterface,
    marine?: CategoryFilterInterface
}