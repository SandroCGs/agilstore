import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProdutoService } from '../services/produto.service';
import { CriarProdutoDto } from '../dto/criar-produto.dto';
import { AtualizarProdutoDto } from '../dto/atualizar-produto.dto';
import { ProdutoPersistido } from '../dto/produto.types';

@Controller('/produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get('/buscar')
  @HttpCode(HttpStatus.OK)
  findByName(@Query('nome') nome: string): Promise<ProdutoPersistido[]> {
    return this.produtoService.findByName(nome);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<ProdutoPersistido> {
    return this.produtoService.findById(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<ProdutoPersistido[]> {
    return this.produtoService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED) //201
  create(@Body() dto: CriarProdutoDto): Promise<ProdutoPersistido> {
    return this.produtoService.create(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AtualizarProdutoDto,
  ): Promise<ProdutoPersistido> {
    return this.produtoService.update(id, dto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.produtoService.delete(id);
  }
}
