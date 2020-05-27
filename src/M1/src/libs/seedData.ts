import  UserRepository  from '../repositories/user/UserRepository';
import * as mongoose from 'mongoose';

const userRepository = new UserRepository();

function generateObjectId() {
  return String(mongoose.Types.ObjectId());
}

export default async () => {
  const user = {
    keyCount: 4,
    depth: 3,
    size: '1kb',
    createdAt: new Date(),
  };

  const count = await userRepository.count();

  if (!count) {
    const authId = '5e577abc417c5b3a22164a8c';
    return userRepository.create( user, authId ).then((result) => {
      console.log('User Added Successfully', result);
    });
  }
  // console.log('User already seeded');
};
