import { Injectable } from '@nestjs/common';

export type User = {
  id: string;
  email: string;
  name: string;
  password: string;
  address: string;
  phone: string;
  country?: string | undefined;
  city?: string | undefined;
};

//*BBDD
const users: User[] = [
  {
    id: '1',
    email: 'homer.simpson@springfield.com',
    name: 'Homer Simpson',
    password: 'donuts123',
    address: '742 Evergreen Terrace',
    phone: '555-0001',
    country: 'USA',
    city: 'Springfield',
  },
  {
    id: '2',
    email: 'marge.simpson@springfield.com',
    name: 'Marge Simpson',
    password: 'hairblue',
    address: '742 Evergreen Terrace',
    phone: '555-0002',
    country: 'USA',
    city: 'Springfield',
  },
  {
    id: '3',
    email: 'bart.simpson@springfield.com',
    name: 'Bart Simpson',
    password: 'eatmyshorts',
    address: '742 Evergreen Terrace',
    phone: '555-0003',
    country: 'USA',
    city: 'Springfield',
  },
  {
    id: '4',
    email: 'lisa.simpson@springfield.com',
    name: 'Lisa Simpson',
    password: 'saxophone',
    address: '742 Evergreen Terrace',
    phone: '555-0004',
    country: 'USA',
    city: 'Springfield',
  },
  {
    id: '5',
    email: 'maggie.simpson@springfield.com',
    name: 'Maggie Simpson',
    password: 'pacifier',
    address: '742 Evergreen Terrace',
    phone: '555-0005',
    country: 'USA',
    city: 'Springfield',
  },
  {
    id: '6',
    email: 'ned.flanders@springfield.com',
    name: 'Ned Flanders',
    password: 'hididdly',
    address: '744 Evergreen Terrace',
    phone: '555-0006',
    country: 'USA',
    city: 'Springfield',
  },
  {
    id: '7',
    email: 'moe.szyslak@springfield.com',
    name: 'Moe Szyslak',
    password: 'moesbar',
    address: "Moe's Tavern",
    phone: '555-0007',
    country: 'USA',
    city: 'Springfield',
  },
  {
    id: '8',
    email: 'apu.nahasapeemapetilon@springfield.com',
    name: 'Apu Nahasapeemapetilon',
    password: 'kwikemart',
    address: 'Kwik-E-Mart',
    phone: '555-0008',
    country: 'USA',
    city: 'Springfield',
  },
  {
    id: '9',
    email: 'mr.burns@springfield.com',
    name: 'Charles Montgomery Burns',
    password: 'excellent',
    address: 'Burns Manor',
    phone: '555-0009',
    country: 'USA',
    city: 'Springfield',
  },
  {
    id: '10',
    email: 'smithers@springfield.com',
    name: 'Waylon Smithers',
    password: 'assistant1',
    address: 'Burns Manor',
    phone: '555-0010',
    country: 'USA',
    city: 'Springfield',
  },
  {
    id: '11',
    email: 'krusty@springfield.com',
    name: 'Krusty the Clown',
    password: 'krustyburger',
    address: 'Krusty Studios',
    phone: '555-0011',
    country: 'USA',
    city: 'Springfield',
  },
  {
    id: '12',
    email: 'milhouse.vanhouten@springfield.com',
    name: 'Milhouse Van Houten',
    password: 'falloutboy',
    address: 'Van Houten House',
    phone: '555-0012',
    country: 'USA',
    city: 'Springfield',
  },
  {
    id: '13',
    email: 'ralph.wiggum@springfield.com',
    name: 'Ralph Wiggum',
    password: 'imhelping',
    address: 'Wiggum House',
    phone: '555-0013',
    country: 'USA',
    city: 'Springfield',
  },
  {
    id: '14',
    email: 'chief.wiggum@springfield.com',
    name: 'Chief Wiggum',
    password: 'police123',
    address: 'Police Station',
    phone: '555-0014',
    country: 'USA',
    city: 'Springfield',
  },
  {
    id: '15',
    email: 'edna.krabappel@springfield.com',
    name: 'Edna Krabappel',
    password: 'teacherlife',
    address: 'Springfield Elementary',
    phone: '555-0015',
    country: 'USA',
    city: 'Springfield',
  },
  {
    id: '16',
    email: 'skinner@springfield.com',
    name: 'Seymour Skinner',
    password: 'steamedhams',
    address: 'Springfield Elementary',
    phone: '555-0016',
    country: 'USA',
    city: 'Springfield',
  },
  {
    id: '17',
    email: 'lenny@springfield.com',
    name: 'Lenny Leonard',
    password: 'nuclearguy',
    address: 'Springfield',
    phone: '555-0017',
    country: 'USA',
    city: 'Springfield',
  },
  {
    id: '18',
    email: 'carl@springfield.com',
    name: 'Carl Carlson',
    password: 'nuclearguy2',
    address: 'Springfield',
    phone: '555-0018',
    country: 'USA',
    city: 'Springfield',
  },
  {
    id: '19',
    email: 'otto@springfield.com',
    name: 'Otto Mann',
    password: 'rockon',
    address: 'Springfield Bus',
    phone: '555-0019',
    country: 'USA',
    city: 'Springfield',
  },
  {
    id: '20',
    email: 'comicbookguy@springfield.com',
    name: 'Comic Book Guy',
    password: 'worstepisode',
    address: "Android's Dungeon",
    phone: '555-0020',
    country: 'USA',
    city: 'Springfield',
  },
];

@Injectable()
export class UsersRepository {
  //* Métodos:
  async getAllUsers(
    page: number,
    limit: number,
  ): Promise<Omit<User, 'password'>[]> {
    const start = (page - 1) * limit;
    const end = start + limit;

    const userList = users.slice(start, end);

    return await userList.map(
      ({ password, ...userNoPassword }) => userNoPassword,
    );
  }

  getUserById(id: string) {
    const foundUser = users.find((user) => user.id === id);
    // foundUser: {...} || undefined(falsy)
    if (!foundUser) return `No se encontró usuario con id: ${id}`;
    const { password, ...userNoPassword } = foundUser;
    return userNoPassword;
  }

  getUserByEmail(email: string) {
    const foundUser = users.find((user) => user.email === email);
    return foundUser;
  }

  addUser(userNewData: any) {
    users.push({ ...userNewData, id: userNewData.email });
    return userNewData.email;
  }

  updateUser(id: string, userNewData: any) {
    const foundUser = users.find((user) => user.id === id);
    if (!foundUser) return `No se encontró usuario con id: ${id}`;
    Object.assign(foundUser, userNewData);
    return id;
  }

  deleteUser(id: string) {
    const foundIndex = users.findIndex((user) => user.id === id);
    // INDEX || -1
    if (foundIndex === -1) return `No se encontró usuario con id: ${id}`;
    users.splice(foundIndex, 1);
    return id;
  }
}
