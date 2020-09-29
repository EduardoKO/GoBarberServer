import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviders = new ListProvidersService(fakeUsersRepository, fakeCacheProvider);
  });
  it('should be able to list the providers', async () => {

    const user1 = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123321'
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Jhon Trê',
      email: 'jhontre@example.com',
      password: '123321'
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Jhon Qua',
      email: 'jhonqua@example.com',
      password: '123321'
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id
    })

    expect(providers).toEqual([
      user1,
      user2
    ])
  });
});
