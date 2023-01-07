import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterAll'
})
export class FilterPipe implements PipeTransform {

  transform(users: any, filterUser: String) {
    if(!users || !filterUser) {
    return users
    }
    return users.filter( (user:any) => 
      user.firstname.toLowerCase().indexOf(filterUser.toLowerCase()) !== -1)
  }
}
