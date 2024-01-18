export const Constants = {
    BY_PASS_URLS: ['/auth/login', '/auth/reset-password', '/auth/reset-pass', '/user/signup']
}

export const JWT_SECRET = process.env.JWT_PRIVATE_KEY;

export enum STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export const STATUS_LIST = Object.keys(STATUS);


export const SORT_ORDER = {
  ASC: 'ASC',
  DESC: 'DESC',
};

export const SORT_ORDER_LIST = (() => Object.keys(SORT_ORDER))();



