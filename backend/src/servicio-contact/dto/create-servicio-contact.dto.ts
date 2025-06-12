import { IsEmail, IsString, Length, IsInt } from 'class-validator';

export class CreateServicioContactDto {
  @IsString()
  @Length(1, 100)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(1, 1000)
  comment: string;

  @IsInt()
  servicioId: number;
}