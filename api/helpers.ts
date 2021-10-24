export function isNotFoundError(err: any) {
  return err.statusCode === 404;
}
