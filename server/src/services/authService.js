import { handleComparePassword, randomPassword } from '~/utils/handlePassword';
import { createRefreshToken, createToken } from '~/middlewares/auth';
import { UserModel } from '~/models/usersModel';
import { passwordForGG } from '~/utils/mailTemplate';
import { handleSendMail } from '~/utils/nodemailer';

const loginUser = async (data, role) => {
  const user = await UserModel.getUserChangePassword(data.username, 'username');
  if (!user) {
    throw new Error('User not found');
  }
  const isMatch = await  handleComparePassword(data.password, user.password);
  if (!isMatch) {
    throw new Error('Password is incorrect');
  }
  if (user.role !== role) {
    throw new Error(`User is not ${role}`);
  }
  const refreshToken = createRefreshToken({ username: user.username, role: user.role });
  const accessesToken = createToken({ username: user.username, role: user.role, userId: user._id });
  const update = await UserModel.updateToken(data.username, refreshToken);
  if (!update) {
    throw new Error('Error updating token');
  }
  delete user.password;
  user.accssesToken = accessesToken;
  return user;
};

const login = async (data) => {
  return loginUser(data, 'user');
};

const loginAdmin = async (data) => {
  return loginUser(data, 'admin');
};
const loginGG = async (data) => {
  try {
    const existedUser = await UserModel.getUserBy(data.email, 'email');
    if (!existedUser) {
      const { random, password } = await randomPassword();
      const refreshToken = createRefreshToken({ username: data.email, role: 'user' });
      const user = {
        username: data.email,
        email: data.email,
        name: data.name,
        avatar: data.avatar,
        password,
        refreshToken
      };
      const newUser = await UserModel.create(user);
      newUser.accssesToken = createToken({ username: newUser.username, role: 'user', userId: newUser._id });
      const templateRegister =  passwordForGG(newUser.username, random);
      await handleSendMail({
        to: newUser.email,
        subject: 'Register account',
        text: 'Register account',
        html: templateRegister

      })
      return  newUser
    }
    existedUser.accssesToken = createToken({ username: existedUser.username, role: 'user', userId: existedUser._id });
    return existedUser;
  } catch (error) {
    throw new Error(error);
  }
};
export const AuthService = {
  login,
  loginAdmin,
  loginGG
};