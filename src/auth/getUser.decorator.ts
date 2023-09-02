import { HttpException, createParamDecorator } from '@nestjs/common';
import { Auth } from './auth.entity';

export const getUser = createParamDecorator(async (data, req) => {
  const user = req.args[0].user;
  console.log(req.args[0].user);
  const userInDb = await Auth.findOne({
    where: {
      id: user.id,
    },
  });
  if (!userInDb) {
    throw new HttpException('User not found', 404);
  }

  req.user = user;
  return req.user;
});
