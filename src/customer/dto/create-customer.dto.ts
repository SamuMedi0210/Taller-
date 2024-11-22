import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";

export class CreateCustomerDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)  
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)  
    contact: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(3)  
    address: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)  
    city: string;

    @IsNumber()
    @IsOptional()
    @Min(0)
    postalCode?: number = 0;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)  
    country: string;

}
