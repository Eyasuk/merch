//this routes can be accessed with out authentication used for authorization
const authenticationRoutes = {
  signin: '/signin',
  signup: '/signup',
};

//this routes needed for authentication purposes

// this routes need authentication for accessing
const authorizedRoutes = {
  //home: '/',
  send: '/send',
  swap: '/swap',
};

export const Routes = {
  authorizedRoutes,
  authenticationRoutes,
};
