export const validEmail = new RegExp (
  '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
);

export const validName = new RegExp (
  "^([A-zÀ-ú]{2,}\\s[A-zÀ-ú]{1,}\\s?([A-zÀ-ú]{1,})?)"
);

export const validString = new RegExp (
  "^([A-zÀ-ú]{2,}\\s?([A-zÀ-ú]{1,})?)"
);