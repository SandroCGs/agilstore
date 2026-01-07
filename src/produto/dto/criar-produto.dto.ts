import { IsInt, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CriarProdutoDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  categoria: string;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  quantidade: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  preco: number;
}
