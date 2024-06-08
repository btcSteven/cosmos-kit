import { ClientNotExistError } from '@cosmos-kit/core';

import { Mork } from './types';

interface MorkWindow {
  mork?: Mork;
}

export const getMorkFromExtension: () => Promise<
  Mork | undefined
> = async () => {
  if (typeof window === 'undefined') {
    return void 0;
  }

  const mork = (window as MorkWindow).mork;

  if (mork) {
    return mork;
  }

  if (document.readyState === 'complete') {
    if (mork) {
      return mork;
    } else {
      throw ClientNotExistError;
    }
  }

  return new Promise((resolve, reject) => {
    const documentStateChange = (event: Event) => {
      if (
        event.target &&
        (event.target as Document).readyState === 'complete'
      ) {
        if (mork) {
          resolve(mork);
        } else {
          reject(ClientNotExistError.message);
        }
        document.removeEventListener('readystatechange', documentStateChange);
      }
    };

    document.addEventListener('readystatechange', documentStateChange);
  });
};
