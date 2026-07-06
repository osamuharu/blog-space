import { JwtPayload } from 'jsonwebtoken';
import { User } from '../../users/domain/entities/user.entity';

export type JwtPayloadType = Pick<User, 'username'> & JwtPayload;
