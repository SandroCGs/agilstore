import { Injectable } from '@nestjs/common';
import { CriarProdutoDto } from '../dto/criar-produto.dto';
import { AtualizarProdutoDto } from '../dto/atualizar-produto.dto';
import * as fs from 'node:fs/promises';
import path from 'node:path';

@Injectable()
export class ProdutoService {
  private readonly PRODUTOS_PATH = path.resolve(
    process.cwd(),
    'data',
    'produtos.json',
  );
  //await fs.readFile(PRODUTOS_PATH, 'utf-8');
  //await fs.writeFile(PRODUTOS_PATH, json);

  async findAll(): Promise<CriarProdutoDto[]> {
    try {
      const data = await fs.readFile(this.PRODUTOS_PATH, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (
        error instanceof Error &&
        (error as NodeJS.ErrnoException).code === 'ENOENT'
      ) {
        return [];
      }
      throw error;
    }
  }

  async create(dto: CriarProdutoDto): Promise<ProdutoPersistido> {
    const produtos = (await this.findAll()) as ProdutoPersistido[];

    const novoProduto: ProdutoPersistido = {
      id: Date.now(),
      ...dto,
    };

    produtos.push(novoProduto);

    await fs.writeFile(this.PRODUTOS_PATH, JSON.stringify(produtos, null, 2));

    return novoProduto;
  }

  async update(
    id: number,
    dto: AtualizarProdutoDto,
  ): Promise<ProdutoPersistido> {
    const produtos = (await this.findAll()) as ProdutoPersistido[];

    const index = produtos.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error('Produto não encontrado');
    }

    produtos[index] = {
      ...produtos[index],
      ...dto,
    };

    await fs.writeFile(this.PRODUTOS_PATH, JSON.stringify(produtos, null, 2));

    return produtos[index];
  }
}
