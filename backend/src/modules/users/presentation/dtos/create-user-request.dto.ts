import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ type: String })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  password: string;
}
