import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository =  new FakeUsersRepository;
    fakeHashProvider = new FakeHashProvider

    authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
  })
  it('should be able to authenticate', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123321'
    });

    const response = await authenticateUser.execute({
      email: 'jhondoe@example.com',
      password: '123321'
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate with none existing user', async () => {

    await expect(authenticateUser.execute({
      email: 'jhondoe@example.com',
      password: '123321'
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to authenticate with wrong password', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123321'
    });

    await expect(authenticateUser.execute({
      email: 'jhondoe@example.com',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(AppError);
  });
});
