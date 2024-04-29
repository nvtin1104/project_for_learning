// import jwt from 'jsonwebtoken';
// import { env } from '~/config/environment';

// module.exports = (request, response, next) => {
//   const token = request.header('auth-token');
//   if (!token) return response.status(401).send('Access Denied');
//   try {
//     const verified = jwt.verify(token, env.TOKEN_SECRET);
//     request.verifiedData = verified;
//     next();
//   } catch (err) {
//     return response.status(400).send('Invalid Token');
//   }
// };
