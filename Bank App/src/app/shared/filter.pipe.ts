import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(value: any, filterString: string, propertyName: string) {
        const resultArray = [];
        if(value.length === 0){
            return value;
        }
        else if(filterString != "") {
            for(const item of value) {
                if(item[propertyName].toLowerCase().includes(filterString)) {
                    resultArray.push(item);
                }
            }
        }
        return resultArray;
    }

}