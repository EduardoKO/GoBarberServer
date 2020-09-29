import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository, );
  });
  it('should be able to show the profile', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123321'
    });

    const profile = await showProfile.execute({
      user_id: user.id
    })

    expect(profile.name).toBe('Jhon Doe');
    expect(profile.email).toBe('jhondoe@example.com');
  });

  it('should not be able to show the profile non-existing user', async () => {
    expect(showProfile.execute({
      user_id: 'non existing user id'
    })).rejects.toBeInstanceOf(AppError)
  });
});
