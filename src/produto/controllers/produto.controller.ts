import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProdutoService } from '../services/produto.service';
import { CriarProdutoDto } from '../dto/criar-produto.dto';
import { AtualizarProdutoDto } from '../dto/atualizar-produto.dto';

@Controller('/produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<CriarProdutoDto[]> {
    return this.produtoService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED) //201
  create(@Body() dto: CriarProdutoDto): Promise<CriarProdutoDto> {
    return this.produtoService.create(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AtualizarProdutoDto,
  ): Promise<AtualizarProdutoDto> {
    return this.produtoService.update(id, dto);
  }
}
