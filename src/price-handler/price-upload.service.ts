import { Injectable } from '@nestjs/common';
import { createWriteStream, constants, promises } from 'fs';
import { listToReplace } from './data/listToReplace';
import { mergeMap, toArray, filter, map, distinct, tap } from 'rxjs/operators';
import { from } from 'rxjs';
import { readFile} from 'xlsx';
import { PriceHandlerDbService } from './price-handler-db.service';

@Injectable()
export class PriceUploadService {
    constructor(
        private priceHandlerDbService: PriceHandlerDbService
    ){}

    parsePrice(files): Promise<boolean>{
        return new Promise((res, rej) => {
            let count = 0
            for (const key in files) {
                if (Object.prototype.hasOwnProperty.call(files, key)) {
                    const element = files[key];
                    element.then(vl => vl.createReadStream()
                    .pipe(createWriteStream(`${key}.xls`))
                    .on('finish', () => {
                        count += 1;
                        if(count === 2){
                            this.checkFileExists().then(() => {
                                this.getStock(this.parseXls('epz.xls', 'B', 'I'), this.parseXls('rowe.xls', 'B', 'F')).subscribe((vl) => {
                                    this.deleteFiles().then(() => res(true))
                                })
                            })
                        }
                    })
                    .on('error', () => rej(false)))
                }
            }
            })
    }

    async checkFileExists(){
        const epz = await promises.access('epz.xls', constants.F_OK).then( () => true).catch(() => false);
        const rowe = await promises.access('rowe.xls', constants.F_OK).then( () => true).catch(() => false);
        return epz && rowe
    }

    async deleteFiles(){
        const epz = await promises.unlink('epz.xls').then(() => true).catch(() => false)
        const rowe = await promises.unlink('rowe.xls').then(() => true).catch(() => false)
        return epz && rowe
    }

    private findSheet(obj) {
        if(Object.keys(obj['Sheets']).includes('TDSheet')){
            return obj['Sheets']['TDSheet']
        }
        if(Object.keys(obj['Sheets']).length > 0){
            const list = Object.keys(obj['Sheets'])[0];
            return obj['Sheets'][list]
        }
    }
    
    private deletDuplicates(firstArray, secondArray) {
        const arr = [...firstArray, ...secondArray,];
        const res = []
        for (const item of arr) {
            let findedItem = -1;
            if(res.length > 0) {
                findedItem = res.findIndex(vl => vl.code === item.code);
            }
            if(findedItem > -1){
                res[findedItem].quantity += item.quantity
            } else {
                res.push(item)
            }
        }
        return res
    }

    private codeReplace(code: string, replaceList): string{
        let newCode = code;    
        replaceList.forEach(vl => newCode = newCode.replace(vl.old, vl.new))
        return newCode
    }
    
    parseXls(stock, codeCharacter, quantityCharacter ) {
        const xlsSheets = this.findSheet(readFile(stock))
        const stockLength = []
        for (const key in xlsSheets) {
            if (Object.prototype.hasOwnProperty.call(xlsSheets, key)) {
                stockLength.push(key.replace(/./,'').replace(/ref/, '').replace(/rows/, '').replace(/margin/,''))
            }
        }
        return from(stockLength).pipe(
            distinct(),
            map((vl) => {
                if( xlsSheets[`${codeCharacter}${vl}`] && xlsSheets[`${quantityCharacter}${vl}`]) {
                    return {
                        code: this.codeReplace(xlsSheets[`${codeCharacter}${vl}`]['v'], listToReplace),
                        quantity: xlsSheets[`${quantityCharacter}${vl}`]['v']
                    }
                }    
            }),
            filter(vl => vl != undefined),
            filter(vl => vl.quantity != 0 && vl.code != 'Артикул'),
            toArray()
        )
    }
    
    private getStock(firstStock, secondStock) {
        return firstStock.pipe(
            mergeMap(() => secondStock, (f:any, s:any) => this.deletDuplicates(f,s)),
            mergeMap((vl: any) => from(vl)),
            tap((vl: any) => this.priceHandlerDbService.updateQuantityByCode(vl.code,vl.quantity)),
            toArray()
        )
    }

}
