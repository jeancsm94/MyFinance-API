import { describe, expect, it, test } from "vitest";
import { AppService } from "../app-service/app.service";
import { MongoService } from "../mongo/mongo.service";
import { LancamentoService } from "./lancamento.service";
import { RepositoryBase } from "../../repositories/repositoryBase";
import { Lancamentos } from "../../entities/lancamentos";
import { faker as Faker } from '@faker-js/faker';
import { ObjectId } from "mongodb";

// c19c54ac0000000000000000
describe("CRUD Lançamentos", async () => {
    const app = new AppService(new MongoService(), new LancamentoService(new RepositoryBase(new MongoService(),new Lancamentos())));
    const lancamentoService = new LancamentoService(new RepositoryBase(new MongoService(),new Lancamentos()));
    await app.initApp();
    await test("CREATE: Insert Lançamento", async () => {
        let lancamento: Lancamentos =  new Lancamentos();
        lancamento ={
            _id: new ObjectId(),
            nome: Faker.finance.currency().name,
            data: new Date(),
            valor: parseInt(Faker.finance.amount()),
            dataPagamento: new Date(),
            formaPagamento: "PIX",
            categoria:"undefined",
            tipoLancamento: {
                categoriaLancamento: "Despesa",
                tipo: "Variável"
            }
        }
        
        const result = await lancamentoService.insert(lancamento);
        
        expect(result.acknowledged).toBe(true);
    });
    await test("READ: GetbyId Lançamento id: c19c54ac0000000000000000", async () => {
        const lancamento = await lancamentoService.getById('c19c54ac0000000000000000');
        expect(lancamento.nome).eq('Salário');
    });
    await  test("READ: Getall Lançamentos", async () => {
        const lancamento = await lancamentoService.getAll();
        expect(lancamento.length).gt(0);
    });
    await test("UPDATE: UPDATE Lançamento id: c1ded7840000000000000000", async () => {
        let lancamento = await lancamentoService.getById('c1ded7840000000000000000');

        lancamento = {
            nome: Faker.finance.currency().name,
            data: new Date(),
            valor: parseInt(Faker.finance.amount()),
            dataPagamento: new Date(),
            formaPagamento: "PIX",
            categoria:"undefined",
            tipoLancamento: {
                categoriaLancamento: "Despesa",
                tipo: "Variável"
            }
        }
        const updateLancamento = await lancamentoService.update('c1e00c480000000000000000', lancamento);
        expect(updateLancamento.ok).toBe(1);
        
    });
    await test("DELETE: Lançamento id: c1e00c480000000000000000", async () => {
        const result = await lancamentoService.delete('c1ded7840000000000000000');
        expect(result).toBe(true);
    });
});
