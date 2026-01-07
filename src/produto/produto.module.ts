import { Module } from '@nestjs/common';
import { ProdutoService } from './services/produto.service';
import { ProdutoController } from './controllers/produto.controller';

@Module({
  imports: [],
  providers: [ProdutoService],
  controllers: [ProdutoController],
  exports: [],
})
export class ProdutoModule {}
