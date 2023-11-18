import { HttpException } from '@nestjs/common';
import { toCamel } from 'src/utils/utils';
import { ERROR_CODE } from '../shared/constants/error-codes';

export class DatabaseException extends HttpException {
  constructor(props: any, context: any) {
    if (context.includes('duplicate key value violates unique constraint')) {
      props = {
        statusCode: ERROR_CODE.INPUT.statusCode,
        message: [
          `${toCamel(props.detail.split(/[()]/, 2)[1])} should be unique`,
        ],
      };
    } else if (context.includes('violates foreign key constraint')) {
      props = {
        statusCode: ERROR_CODE.INPUT.statusCode,
        message: [`${toCamel(props.detail.split(/[()]/, 2)[1])} is invalid`],
      };
    } else if (context.includes('violates check constraint')) {
      props = {
        statusCode: ERROR_CODE.INPUT.statusCode,
        message: [
          `${toCamel(
            context.split(/"(.*?)"/g, 2)[1],
          )} should be a allowed value`,
        ],
      };
    }

    super(props, 400);
  }
}
