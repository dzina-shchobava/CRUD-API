import { validate, version } from 'uuid';

export const checkId = (id: string): boolean => {
  return validate(id) && version(id) === 4;
}
