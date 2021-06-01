import {Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'centerSearch'
})
export class CenterSearchPipe implements PipeTransform {
    transform(items:any[], avlSearch: any, eighteen_plus: any, fortyfive_plus: any, free_status: any){
        if (items && items.length){
            return items.filter(item =>{

                if (avlSearch && item['available_capacity']===0){
                    return false;
                }
                if (eighteen_plus && item['min_age_limit']!==18){
                    return false;
                }
                if (fortyfive_plus && item['min_age_limit']!==45){
                    return false;
                }
                if (free_status && item['fee_type']!=='Free'){
                    return false;
                }
                return true;
           })
        }
        else{
            return items;
        }
    }
}