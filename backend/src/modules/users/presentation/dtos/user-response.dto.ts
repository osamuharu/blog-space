import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  id: string;

  @Expose()
  @ApiProperty({ type: String })
  username: string;

  @Expose()
  @ApiProperty({ type: String })
  fullName: string;

  @Expose()
  @ApiProperty({ type: String })
  email: string;
}
