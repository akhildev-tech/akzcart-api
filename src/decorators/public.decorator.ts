import { SetMetadata } from '@nestjs/common';
import { PUBLIC_METADATA } from '../shared/constants';

export const Public = () => SetMetadata(PUBLIC_METADATA, true);
