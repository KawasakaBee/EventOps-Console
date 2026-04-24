export const tags = [
  'Frontend',
  'Backend',
  'CEO',
  'DevOps',
  'HTML',
  'CSS',
  'JavaScript',
  'React',
] as const;

export type Tag = (typeof tags)[number];
