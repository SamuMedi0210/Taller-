import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchasesDto } from './create-purchase.dto';

export class UpdatePurchaseDto extends PartialType(CreatePurchasesDto) {}
