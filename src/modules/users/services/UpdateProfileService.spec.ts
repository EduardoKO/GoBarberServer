import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository =  new FakeUsersRepository;
    fakeHashProvider =  new FakeHashProvider;
    updateProfile = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to update the profile', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123321'
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jhon Trê',
      email: 'jhontre@example.com'
    })

    expect(updatedUser.name).toBe('Jhon Trê');
    expect(updatedUser.email).toBe('jhontre@example.com');
  });

  it('should not be able to change to another user email', async () => {

    await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123321'
    });

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@example.com',
      password: '123456'
    })

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Jhon Doe',
      email: 'jhondoe@example.com'
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should be able to update the password', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123321'
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jhon Trê',
      email: 'jhontre@example.com',
      old_password:'123321',
      password: '123456'
    })

    expect(updatedUser.password).toBe('123456');
  });

  it('should not be able to update the password without old password', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123321'
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Jhon Trê',
      email: 'jhontre@example.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123321'
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Jhon Trê',
      email: 'jhontre@example.com',
      old_password:'wrong old password',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the profile non-existing user', async () => {
    expect(updateProfile.execute({
      user_id: 'non existing user id',
      name: 'Test',
      email: 'test@example.com'
    })).rejects.toBeInstanceOf(AppError)
  });

});
