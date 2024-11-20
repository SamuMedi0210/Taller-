import { IsEnum, IsNotEmpty, IsString} from "class-validator";
import { PurchaseStatus } from "src/common/enums/purchase-status.enum";

export class CreatePurchasesDto {
    @IsEnum(PurchaseStatus)
    @IsNotEmpty()    
    status: PurchaseStatus;
    
    @IsString()
    @IsNotEmpty()
    paymentMethod: string;

}
