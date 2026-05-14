export const tags = [
  // Frontend
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'Frontend Architecture',
  'State Management',
  'Forms',
  'Design Systems',
  'Accessibility',
  'Performance',
  'Testing',
  'Storybook',

  // Backend / API
  'Node.js',
  'Backend',
  'REST API',
  'GraphQL',
  'Databases',
  'PostgreSQL',
  'Caching',
  'Message Queues',
  'Microservices',
  'API Design',

  // DevOps / Platform
  'DevOps',
  'CI/CD',
  'Docker',
  'Kubernetes',
  'Observability',
  'Monitoring',
  'Logging',
  'Cloud',
  'Infrastructure',
  'Security',

  // Product / Process
  'Product',
  'UX',
  'Analytics',
  'A/B Testing',
  'Team Processes',
  'Engineering Management',
  'Hiring',
  'Mentoring',
  'Code Review',

  // AI / Data
  'AI',
  'Machine Learning',
  'LLM',
  'Data Engineering',
  'Data Visualization',

  // Mobile / Cross-platform
  'Mobile',
  'React Native',
  'Cross-platform',

  // General
  'Architecture',
  'Scalability',
  'Legacy',
  'Refactoring',
  'Open Source',
  'Case Study',
] as const;

export type Tag = (typeof tags)[number];
