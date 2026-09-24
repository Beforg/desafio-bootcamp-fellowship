import Book from "../../entities/Book.ts";
import type Loan from "../../entities/Loan.ts";
import User from "../../entities/User.ts";
import type BaseRepository from "./BaseRepository.ts";

/**
 * A interface ILoanRepository define os métodos para a manipulação de dados de empréstimos,
 * estende a interface BaseRepository para herdar os métodos básicos de um repositório.
 * @method remove(user: User, book: Book): Loan | null - Remove um empréstimo do repositório com base no usuário e no livro fornecidos, retornando o empréstimo removido ou null se não encontrado.
 * @method removeById(loanId: number): Loan | null - Remove um empréstimo do repositório pelo ID fornecido, retornando o empréstimo removido ou null se não encontrado.
 * @method save(objectToSave: Loan): Loan - Salva um empréstimo no repositório e retorna o empréstimo salvo.
 * @method findById(id: number): Loan | null - Busca um empréstimo no repositório pelo seu ID e retorna o empréstimo encontrado ou null se não encontrado.
 * @method findAll(): Loan[] - Retorna todos os empréstimos presentes no repositório.
 */
export default interface ILoanRepository extends BaseRepository<Loan> {
    remove(user: User, book: Book): Loan | null;
    removeById(loanId: number): Loan | null;
}