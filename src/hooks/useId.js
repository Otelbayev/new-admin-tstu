export const useId = () => {
  const timestamp = new Date().getTime();

  const randomNumber = Math.floor(Math.random() * 1000);

  const uniqueId = `${timestamp}-${randomNumber}`;

  return uniqueId;
};
