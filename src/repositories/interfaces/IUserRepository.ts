import type User from "../../entities/User";
import type BaseRepository from "./BaseRepository";

/**
 * IUserRepository é a interface responsável por definir os métodos específicos para o repositório de usuários,
 * estendendo a interface BaseRepository para herdar os métodos básicos de um repositório.
 * @method save(objectToSave: User): User - Salva um usuário no repositório e retorna o usuário salvo.
 * @method findById(id: number): User | null - Busca um usuário no repositório pelo seu ID e retorna o usuário encontrado ou null se não encontrado.
 * @method findAll(): User[] - Retorna todos os usuários presentes no repositório.
 * @method search(strategy: SearchStrategy<User>, term: string): User[] - Realiza uma busca no repositório utilizando uma estratégia de busca fornecida e um termo de pesquisa, retornando os usuários encontrados.
 */
export default interface IUserRepository extends BaseRepository<User> {}