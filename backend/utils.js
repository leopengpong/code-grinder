

module.exports.badRequest = message => {
  let e = new Error(message);
  e.status = 400;
  return e;
}