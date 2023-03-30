type TCookieProps = {
  path?: string;
  expires?: Date | string | number;
  domain?: string;
  httpOnly?: boolean;
  sameSite?: boolean;
  secure?: boolean;
  overwrite?: boolean;
  maxAge?: number;
}

export const setCookie = (name: string, value: string, props?: TCookieProps) => {
  props = {
    path: '/',
    ...props
  };

  let exp = props.expires;

  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }

  if (exp && exp instanceof Date) {
    props.expires = exp.toUTCString();
  }

  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  
  let propName: keyof TCookieProps;

  for (propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }

  document.cookie = updatedCookie;
}

export const getCookie = (name: string) => {
  let cookies = document.cookie.split('; ').reduce((res : any, el) => {
    let cookie: Array<string> = el.split('=');

    res[cookie[0]] = cookie[1];
    return res;
  }, {});

  return cookies[name];
}

export const getAccessToken = (accessToken: string) => {
 return accessToken.split('Bearer ')[1];
}
