export const computeSHA256 = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};

export const errorMessage = (error: any, msg: string) => {
  console.error(error);
  return { error: msg };
};

export const isDateExpired = (date: Date | null): boolean =>
  date ? !!(new Date().getTime() - date.getTime()) : false;

export const hasDuplicates = (array: any[]): boolean => {
  return new Set(array).size !== array.length;
};
