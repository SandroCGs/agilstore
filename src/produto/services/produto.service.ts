import { Injectable, NotFoundException } from '@nestjs/common';
import { CriarProdutoDto } from '../dto/criar-produto.dto';
import { AtualizarProdutoDto } from '../dto/atualizar-produto.dto';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import { ProdutoPersistido } from '../dto/produto.types';

@Injectable()
export class ProdutoService {
  private readonly PRODUTOS_PATH = path.resolve(
    process.cwd(),
    'data',
    'produtos.json',
  );

  async findAll(): Promise<ProdutoPersistido[]> {
    try {
      const data = await fs.readFile(this.PRODUTOS_PATH, 'utf-8');
      if (!data.trim()) {
        return [];
      }
      const produtos: ProdutoPersistido[] = JSON.parse(data);
      return produtos;
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

  async findById(id: number): Promise<ProdutoPersistido> {
    const produtos = await this.findAll();
    const produto = produtos.find((p) => p.id === id);
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }
    return produto;
  }

  async findByName(nome: string): Promise<ProdutoPersistido[]> {
    const produtos = await this.findAll();
    const resultados = produtos.filter((p) =>
      p.nome.toLowerCase().includes(nome.toLowerCase()),
    );
    if (resultados.length === 0) {
      throw new NotFoundException('Nenhum produto encontrado com esse nome');
    }
    return resultados;
  }

  async create(dto: CriarProdutoDto): Promise<ProdutoPersistido> {
    const produtos = await this.findAll();
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
    const produtos = await this.findAll();
    const index = produtos.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException('Produto não encontrado');
    }
    produtos[index] = {
      ...produtos[index],
      ...dto,
    };
    await fs.writeFile(this.PRODUTOS_PATH, JSON.stringify(produtos, null, 2));
    return produtos[index];
  }

  async delete(id: number): Promise<void> {
    const produtos = await this.findAll();
    const index = produtos.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException('Produto não encontrado');
    }
    produtos.splice(index, 1);
    await fs.writeFile(this.PRODUTOS_PATH, JSON.stringify(produtos, null, 2));
  }
}
