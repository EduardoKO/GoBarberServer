import User from '../infra/typeorm/entities/User';
import ICreateUserRepositoryDTO from '../dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>
  findByEmail(email: string): Promise<User | undefined>
  create(data: ICreateUserRepositoryDTO): Promise<User>
  save(user: User): Promise<User>
}
