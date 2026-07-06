import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../../application/services/users.service';
import { CreateUserRequestDto } from '../dtos/create-user-request.dto';
import { UserResponseDto } from '../dtos/user-response.dto';
import { UserMapper } from '../../application/mappers/user.mapper';

@ApiTags('Users')
@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Lấy thông tin tất cả user thành công',
    type: [UserResponseDto],
  })
  async getAll(): Promise<UserResponseDto[]> {
    return (await this.service.findAll()).map((user) => UserMapper.toDto(user));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({
    description: 'Tạo user thành công',
    type: UserResponseDto,
  })
  async create(@Body() dto: CreateUserRequestDto): Promise<UserResponseDto> {
    return UserMapper.toDto(await this.service.create(dto));
  }
}
