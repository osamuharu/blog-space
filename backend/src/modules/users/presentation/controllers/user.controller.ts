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
import { UserDto } from '../dtos/user.dto';

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
    type: [UserDto],
  })
  async getAll(): Promise<UserDto[]> {
    return await this.service.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({
    description: 'Tạo user thành công',
    type: UserDto,
  })
  async create(@Body() dto: CreateUserRequestDto): Promise<UserDto> {
    return await this.service.create(dto);
  }
}
