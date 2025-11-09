import { CourseDto, SkillLevel, TopicDto, LearningMaterialDto, QuizDto, MaterialType, QuizType } from '@/services/types';

export const dummyCourses: CourseDto[] = [
  {
    id: '1',
    subjectId: 'web-dev',
    instructorId: 'inst-1',
    title: 'Complete Web Development Bootcamp',
    description: 'Master modern web development from scratch. Learn HTML, CSS, JavaScript, React, Node.js, and build real-world projects.',
    difficultyLevel: SkillLevel.BEGINNER,
    thumbnailUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    learningObjectives: [
      'Build responsive websites with HTML5 and CSS3',
      'Master JavaScript ES6+ and modern frameworks',
      'Create full-stack applications with React and Node.js',
      'Deploy applications to cloud platforms'
    ],
    prerequisites: ['Basic computer skills', 'Passion for learning'],
    estimatedDurationHours: 60,
    isPublished: true,
    isFeatured: true,
    price: 99.99,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    subjectId: 'data-science',
    instructorId: 'inst-2',
    title: 'Data Science & Machine Learning Masterclass',
    description: 'Comprehensive guide to data science, machine learning, and AI. Learn Python, statistics, ML algorithms, and deploy models.',
    difficultyLevel: SkillLevel.INTERMEDIATE,
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    learningObjectives: [
      'Master Python for data analysis',
      'Understand statistical concepts and ML algorithms',
      'Build and train neural networks',
      'Deploy ML models in production'
    ],
    prerequisites: ['Basic Python knowledge', 'High school mathematics'],
    estimatedDurationHours: 80,
    isPublished: true,
    isFeatured: true,
    price: 149.99,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z'
  },
  {
    id: '3',
    subjectId: 'mobile-dev',
    instructorId: 'inst-3',
    title: 'React Native Mobile App Development',
    description: 'Build native mobile apps for iOS and Android using React Native. Learn navigation, state management, and app deployment.',
    difficultyLevel: SkillLevel.INTERMEDIATE,
    thumbnailUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
    learningObjectives: [
      'Build cross-platform mobile applications',
      'Master React Native components and APIs',
      'Implement navigation and state management',
      'Publish apps to App Store and Google Play'
    ],
    prerequisites: ['JavaScript knowledge', 'React fundamentals'],
    estimatedDurationHours: 50,
    isPublished: true,
    isFeatured: false,
    price: 79.99,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '4',
    subjectId: 'cloud',
    instructorId: 'inst-1',
    title: 'AWS Cloud Architecture & DevOps',
    description: 'Learn cloud computing with AWS. Master EC2, S3, Lambda, Docker, Kubernetes, and CI/CD pipelines.',
    difficultyLevel: SkillLevel.ADVANCED,
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    learningObjectives: [
      'Design scalable cloud architectures',
      'Master AWS core services',
      'Implement containerization with Docker',
      'Build automated CI/CD pipelines'
    ],
    prerequisites: ['Backend development experience', 'Linux basics'],
    estimatedDurationHours: 70,
    isPublished: true,
    isFeatured: true,
    price: 129.99,
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-01-05T10:00:00Z'
  },
  {
    id: '5',
    subjectId: 'ui-ux',
    instructorId: 'inst-4',
    title: 'UI/UX Design Complete Course',
    description: 'Master user interface and experience design. Learn Figma, design systems, prototyping, and user research.',
    difficultyLevel: SkillLevel.BEGINNER,
    thumbnailUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    learningObjectives: [
      'Create stunning user interfaces',
      'Conduct user research and testing',
      'Build interactive prototypes',
      'Design comprehensive design systems'
    ],
    prerequisites: ['Creative mindset', 'Basic computer skills'],
    estimatedDurationHours: 45,
    isPublished: true,
    isFeatured: false,
    price: 69.99,
    createdAt: '2024-01-25T10:00:00Z',
    updatedAt: '2024-01-25T10:00:00Z'
  },
  {
    id: '6',
    subjectId: 'blockchain',
    instructorId: 'inst-2',
    title: 'Blockchain & Smart Contract Development',
    description: 'Learn blockchain technology and build decentralized applications. Master Solidity, Web3, and smart contracts.',
    difficultyLevel: SkillLevel.ADVANCED,
    thumbnailUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
    learningObjectives: [
      'Understand blockchain fundamentals',
      'Write smart contracts with Solidity',
      'Build decentralized applications (DApps)',
      'Deploy on Ethereum and other networks'
    ],
    prerequisites: ['JavaScript proficiency', 'Programming experience'],
    estimatedDurationHours: 55,
    isPublished: true,
    isFeatured: true,
    price: 159.99,
    createdAt: '2024-01-12T10:00:00Z',
    updatedAt: '2024-01-12T10:00:00Z'
  }
];

export const dummyTopics: Record<string, TopicDto[]> = {
  '1': [
    {
      id: 't1-1',
      courseId: '1',
      parentTopicId: null,
      title: 'Introduction to Web Development',
      description: 'Get started with web development fundamentals',
      orderIndex: 0,
      difficultyLevel: SkillLevel.BEGINNER,
      estimatedDurationMinutes: 120,
      learningObjectives: ['Understand web basics', 'Set up development environment'],
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z'
    },
    {
      id: 't1-2',
      courseId: '1',
      parentTopicId: null,
      title: 'HTML5 Fundamentals',
      description: 'Master HTML5 elements and semantic markup',
      orderIndex: 1,
      difficultyLevel: SkillLevel.BEGINNER,
      estimatedDurationMinutes: 180,
      learningObjectives: ['Create semantic HTML', 'Use forms and inputs'],
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z'
    }
  ],
  '2': [
    {
      id: 't2-1',
      courseId: '2',
      parentTopicId: null,
      title: 'Python for Data Science',
      description: 'Learn Python programming for data analysis',
      orderIndex: 0,
      difficultyLevel: SkillLevel.INTERMEDIATE,
      estimatedDurationMinutes: 240,
      learningObjectives: ['Master NumPy and Pandas', 'Data manipulation techniques'],
      createdAt: '2024-01-10T10:00:00Z',
      updatedAt: '2024-01-10T10:00:00Z'
    }
  ]
};

export const dummyMaterials: Record<string, LearningMaterialDto[]> = {
  't1-1': [
    {
      id: 'm1-1-1',
      topicId: 't1-1',
      title: 'Welcome to Web Development',
      description: 'Introduction video covering course overview',
      contentType: MaterialType.VIDEO,
      contentUrl: 'https://example.com/video1.mp4',
      contentText: '',
      durationMinutes: 15,
      difficultyLevel: SkillLevel.BEGINNER,
      tags: ['introduction', 'overview'],
      orderIndex: 0,
      isActive: true,
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z'
    },
    {
      id: 'm1-1-2',
      topicId: 't1-1',
      title: 'Setup Guide',
      description: 'Step-by-step development environment setup',
      contentType: MaterialType.DOCUMENT,
      contentUrl: 'https://example.com/setup.pdf',
      contentText: '',
      durationMinutes: 30,
      difficultyLevel: SkillLevel.BEGINNER,
      tags: ['setup', 'tools'],
      orderIndex: 1,
      isActive: true,
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z'
    }
  ]
};

export const dummyQuizzes: Record<string, QuizDto[]> = {
  't1-1': [
    {
      id: 'q1-1-1',
      topicId: 't1-1',
      instructorId: 'inst-1',
      title: 'Web Development Basics Quiz',
      description: 'Test your understanding of web development fundamentals',
      quizType: QuizType.PRACTICE,
      difficultyLevel: SkillLevel.BEGINNER,
      timeLimitMinutes: 20,
      totalQuestions: 10,
      passingScore: 70,
      isActive: true,
      isAiGenerated: false,
      aiGenerationPrompt: '',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z'
    }
  ]
};
