export const codes = {
  // success
  ok: 200,
  created: 201,
  accepted: 202,
  nonAuthoritative: 203,
  noContent: 204,
  resetContent: 205,
  partialContent: 206,
  // redirect
  moved: 301,
  found: 302,
  notModified: 304,
  tempRedirect: 307,
  permRedirect: 308,
  // error - client
  bad: 400,
  unauth: 401,
  forbidden: 403,
  notFound: 404,
  timeout: 408,
  conflict: 409,
  gone: 410,
  precondition: 412,
  tooMany: 429,
  // error - server
  internal: 500,
  badGateway: 502,
  unavailable: 503,
  gatewayTimeout: 504,
};

export default {
  codes,
};
