import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateTopSetDto {
  @IsString()
  @IsNotEmpty()
  exerciseType: string;

  @IsNumber()
  @Min(1)
  topSetWeight: number;

  @IsNumber()
  @Min(1)
  topSetReps: number;
}

export class TopSetReponseDto {
  id: number;
  exerciseType: string;
  topSetWeight: number;
  topSetReps: number;
  volume: number;
  createdAt: Date;
}
