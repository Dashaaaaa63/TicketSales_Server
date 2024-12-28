import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UserAuthPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value user', value);
    if(!value || !(value.password && value.login)) {
      throw new BadRequestException('Неверный парметр запроса')
    }
    return value;
  }
}
