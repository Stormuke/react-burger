export const setCookie = (
  name: string,
  value: string,
  props?: Record<string, string | number | Date | boolean>,
): void => {
  let expValue = props?.expires;
  if (typeof expValue === 'number' && expValue) {
    const d = new Date();
    expValue = d.setTime(d.getTime() + expValue * 1000);
  }
  if (expValue && (expValue as Date).toUTCString && props) {
    props.expires = (expValue as Date).toUTCString();
  }
  const encodeValue = encodeURIComponent(value);
  document.cookie = `${name}=${encodeValue}`;
};

export const getCookie = (name: string): string | undefined => {
  const matches = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`,
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const deleteCookie = (name: string): void => {
  setCookie(name, '', { expires: -1 });
};
