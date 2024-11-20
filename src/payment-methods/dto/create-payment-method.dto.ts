import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreatePaymentMethodDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)    
    paymentMethod: string;

}
