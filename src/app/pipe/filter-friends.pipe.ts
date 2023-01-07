import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterFriends'
})
export class FilterFriendsPipe implements PipeTransform {

  transform(userFriends: any, filterFriends: String ) {
    if(!userFriends || !filterFriends) {
      return userFriends
    }
    return userFriends.filter( (friend:any) => friend.firstname.toLowerCase().indexOf(filterFriends.toLowerCase()) !== -1)
  }

}
