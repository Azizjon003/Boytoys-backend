import { HttpException, createParamDecorator } from '@nestjs/common';
import { Auth } from './auth.entity';

export const getUser = createParamDecorator(async (data, req) => {
  const user = req.args[0].user;
  const request = req.switchToHttp().getRequest();
  const token = request.headers.authorization.split(' ')[1];
  console.log(req.args[0].user);
  const userInDb = await Auth.findOne({
    where: {
      id: user.id,
      token: token,
    },
  });
  if (!userInDb) {
    throw new HttpException('User not found', 404);
  }

  req.user = user;
  return req.user;
});
