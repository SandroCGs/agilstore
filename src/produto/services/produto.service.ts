import { Injectable } from "@nestjs/common";

@Injectable()
export class ProdutoService {
    
    async findAll(): Promise</*!Produto*/> {
        return await //!buscar no JSON
    }

}