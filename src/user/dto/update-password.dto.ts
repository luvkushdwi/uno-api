import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdatePasswordUserDto {
    
    @IsString()
    @ApiProperty()
    oldPassword: string;

    @IsString()
    @ApiProperty()
    newPassword: string;

    @IsString()
    @ApiProperty()
    confirmPassword: string;
}
