const getAvatarInitials = (name: string) => {
  const initials = name
    .split(' ')
    .map((str) => str[0].toUpperCase())
    .join('')
    .slice(0, 2);
  return initials.slice(0, 2);
};

export default getAvatarInitials;
