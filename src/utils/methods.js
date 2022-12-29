export const setCookie = (name, value, props) => {
  props = props || {};

  let exp = props.expires;

  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }

  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }

  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }

  document.cookie = updatedCookie;
}

export const getCookie = (name) => {
  let cookies = document.cookie.split('; ').reduce((res, el) => {
    let cookie = el.split('=');   
    res[cookie[0]] = cookie[1];
    return res;
  }, {});

  return cookies[name];
}