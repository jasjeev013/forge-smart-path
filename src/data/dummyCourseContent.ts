import { SkillLevel, MaterialType, QuizType } from '@/services/types';

export const dummyCourseContent = {
  "course": {
    "id": "course-id-001",
    "subjectId": "subject-id-001",
    "instructorId": "instructor-id-001",
    "title": "Mastering Java Programming",
    "description": "A comprehensive course to master Java programming, covering everything from basic syntax to advanced concepts.",
    "difficultyLevel": SkillLevel.ADVANCED,
    "thumbnailUrl": "http://example.com/java-thumbnail.jpg",
    "learningObjectives": [
      "Understand core Java syntax and concepts.",
      "Master object-oriented programming in Java.",
      "Work with Java collections and streams.",
      "Understand concurrency and multi-threading in Java.",
      "Build scalable applications using Java frameworks."
    ],
    "prerequisites": [
      "Basic understanding of program,lm=sming concepts.",
      "Familiarity with object-oriented programming."
    ],
    "estimatedDurationHours": 40,
    "isPublished": true,
    "isFeatured": true,
    "price": 299.99,
    "createdAt": "2025-10-01T09:00:00",
    "updatedAt": "2025-11-20T14:00:00"
  },
  "fullTopic": [
    {
      "topic": {
        "id": "topic-id-001",
        "courseId": "course-id-001",
        "parentTopicId": null,
        "title": "Introduction to Java",
        "description": "This topic covers the basics of Java programming, including syntax, data types, and control structures.",
        "orderIndex": 1,
        "difficultyLevel": SkillLevel.BEGINNER,
        "estimatedDurationMinutes": 180,
        "learningObjectives": [
          "Learn basic Java syntax and structure.",
          "Understand primitive data types and variables.",
          "Use control structures like loops and conditionals."
        ],
        "createdAt": "2025-10-05T10:00:00",
        "updatedAt": "2025-10-10T11:00:00"
      },
      "learningMaterial": [
        {
          "id": "material-id-001",
          "topicId": "topic-id-001",
          "title": "Java Basics: Syntax and Structure",
          "description": "An introduction to Java syntax, including how to write a simple Java program and run it.",
          "contentType": MaterialType.VIDEO,
          "contentUrl": "http://example.com/java-basics-video",
          "contentText": "Learn how to write and run your first Java program.",
          "durationMinutes": 20,
          "difficultyLevel": SkillLevel.BEGINNER,
          "tags": ["Java", "Syntax", "Programming Basics"],
          "orderIndex": 1,
          "isActive": true,
          "createdAt": "2025-10-05T10:15:00",
          "updatedAt": "2025-10-10T11:30:00"
        },
        {
          "id": "material-id-002",
          "topicId": "topic-id-001",
          "title": "Primitive Data Types in Java",
          "description": "A detailed explanation of Java's primitive data types and how to use them in programs.",
          "contentType": MaterialType.TEXT,
          "contentUrl": "http://example.com/primitive-data-types",
          "contentText": "This article covers the primitive types in Java, such as int, double, boolean, and more.",
          "durationMinutes": 30,
          "difficultyLevel": SkillLevel.BEGINNER,
          "tags": ["Java", "Data Types", "Programming Basics"],
          "orderIndex": 2,
          "isActive": true,
          "createdAt": "2025-10-06T09:45:00",
          "updatedAt": "2025-10-10T12:00:00"
        },
        {
          "id": "material-id-003",
          "topicId": "topic-id-001",
          "title": "Control Structures: If-Else and Loops",
          "description": "Learn how to use conditionals and loops in Java to control the flow of your programs.",
          "contentType": MaterialType.VIDEO,
          "contentUrl": "http://example.com/control-structures-video",
          "contentText": "This video tutorial explains how to use if-else statements and loops in Java.",
          "durationMinutes": 25,
          "difficultyLevel": SkillLevel.BEGINNER,
          "tags": ["Java", "Conditionals", "Loops"],
          "orderIndex": 3,
          "isActive": true,
          "createdAt": "2025-10-07T11:00:00",
          "updatedAt": "2025-10-10T13:00:00"
        },
        {
          "id": "material-id-004",
          "topicId": "topic-id-001",
          "title": "Understanding Arrays in Java",
          "description": "An introduction to arrays, how to declare, initialize, and access elements in an array.",
          "contentType": MaterialType.DOCUMENT,  // This is PDF type
          "contentUrl": "http://example.com/java-arrays",
          "contentText": "This article explains how to work with arrays in Java.",
          "durationMinutes": 40,
          "difficultyLevel": SkillLevel.BEGINNER,
          "tags": ["Java", "Arrays"],
          "orderIndex": 4,
          "isActive": true,
          "createdAt": "2025-10-08T12:30:00",
          "updatedAt": "2025-10-10T14:00:00"
        }
      ],
      "quizzes": [
        {
          "id": "quiz-id-001",
          "topicId": "topic-id-001",
          "instructorId": "instructor-id-001",
          "title": "Java Basics Quiz",
          "description": "Test your knowledge of Java basics",
          "quizType": QuizType.PRACTICE,
          "difficultyLevel": SkillLevel.BEGINNER,
          "timeLimitMinutes": 30,
          "totalQuestions": 10,
          "passingScore": 70,
          "isActive": true,
          "isAiGenerated": false,
          "aiGenerationPrompt": "",
          "createdAt": "2025-10-08T14:00:00",
          "updatedAt": "2025-10-10T15:00:00"
        }
      ]
    },
    {
      "topic": {
        "id": "topic-id-002",
        "courseId": "course-id-001",
        "parentTopicId": null,
        "title": "Object-Oriented Programming (OOP)",
        "description": "In this topic, you will learn about the principles of object-oriented programming in Java, such as classes, objects, inheritance, and polymorphism.",
        "orderIndex": 2,
        "difficultyLevel": SkillLevel.INTERMEDIATE,
        "estimatedDurationMinutes": 240,
        "learningObjectives": [
          "Understand the concept of classes and objects.",
          "Learn about inheritance and polymorphism.",
          "Use Java's OOP features to build more complex applications."
        ],
        "createdAt": "2025-10-10T10:00:00",
        "updatedAt": "2025-10-15T12:00:00"
      },
      "learningMaterial": [
        {
          "id": "material-id-005",
          "topicId": "topic-id-002",
          "title": "Introduction to OOP Concepts",
          "description": "This video explains the core concepts of object-oriented programming in Java, including classes, objects, inheritance, and polymorphism.",
          "contentType": MaterialType.VIDEO,
          "contentUrl": "http://example.com/oop-concepts-video",
          "contentText": "Watch this video to get an overview of OOP concepts in Java.",
          "durationMinutes": 35,
          "difficultyLevel": SkillLevel.INTERMEDIATE,
          "tags": ["Java", "OOP", "Programming Concepts"],
          "orderIndex": 1,
          "isActive": true,
          "createdAt": "2025-10-10T10:30:00",
          "updatedAt": "2025-10-15T12:30:00"
        },
        {
          "id": "material-id-006",
          "topicId": "topic-id-002",
          "title": "Working with Classes and Objects",
          "description": "Learn how to define and use classes and objects in Java, including constructors and methods.",
          "contentType": MaterialType.TEXT,
          "contentUrl": "http://example.com/classes-objects",
          "contentText": "This article explains how to define and work with classes and objects in Java.",
          "durationMinutes": 45,
          "difficultyLevel": SkillLevel.INTERMEDIATE,
          "tags": ["Java", "OOP", "Classes", "Objects"],
          "orderIndex": 2,
          "isActive": true,
          "createdAt": "2025-10-11T09:00:00",
          "updatedAt": "2025-10-15T13:00:00"
        },
        {
          "id": "material-id-007",
          "topicId": "topic-id-002",
          "title": "Inheritance and Polymorphism in Java",
          "description": "This tutorial dives into inheritance and polymorphism in Java, showing how to extend classes and use method overriding.",
          "contentType": MaterialType.VIDEO,
          "contentUrl": "http://example.com/inheritance-polymorphism-video",
          "contentText": "Watch this video to learn about inheritance and polymorphism in Java.",
          "durationMinutes": 40,
          "difficultyLevel": SkillLevel.INTERMEDIATE,
          "tags": ["Java", "Inheritance", "Polymorphism"],
          "orderIndex": 3,
          "isActive": true,
          "createdAt": "2025-10-12T11:00:00",
          "updatedAt": "2025-10-15T13:30:00"
        },
        {
          "id": "material-id-008",
          "topicId": "topic-id-002",
          "title": "Abstract Classes and Interfaces",
          "description": "Learn how to work with abstract classes and interfaces in Java, and understand when to use each.",
          "contentType": MaterialType.LINK,
          "contentUrl": "http://example.com/abstract-classes-interfaces",
          "contentText": "This article explains the differences between abstract classes and interfaces in Java.",
          "durationMinutes": 50,
          "difficultyLevel": SkillLevel.INTERMEDIATE,
          "tags": ["Java", "OOP", "Abstract Classes", "Interfaces"],
          "orderIndex": 4,
          "isActive": true,
          "createdAt": "2025-10-13T12:30:00",
          "updatedAt": "2025-10-15T14:00:00"
        }
      ],
      "quizzes": [
        {
          "id": "quiz-id-002",
          "topicId": "topic-id-002",
          "instructorId": "instructor-id-001",
          "title": "OOP Concepts Quiz",
          "description": "Test your understanding of OOP principles",
          "quizType": QuizType.ASSESSMENT,
          "difficultyLevel": SkillLevel.INTERMEDIATE,
          "timeLimitMinutes": 45,
          "totalQuestions": 15,
          "passingScore": 75,
          "isActive": true,
          "isAiGenerated": false,
          "aiGenerationPrompt": "",
          "createdAt": "2025-10-13T14:00:00",
          "updatedAt": "2025-10-15T15:00:00"
        }
      ]
    },
    {
      "topic": {
        "id": "topic-id-003",
        "courseId": "course-id-001",
        "parentTopicId": null,
        "title": "Advanced Java Programming",
        "description": "This topic explores advanced Java topics, including multithreading, streams, and the Java Collections Framework.",
        "orderIndex": 3,
        "difficultyLevel": SkillLevel.ADVANCED,
        "estimatedDurationMinutes": 300,
        "learningObjectives": [
          "Master multi-threading and concurrency in Java.",
          "Learn how to use Java streams and lambda expressions.",
          "Work with the Java Collections Framework."
        ],
        "createdAt": "2025-10-15T09:00:00",
        "updatedAt": "2025-10-20T14:00:00"
      },
      "learningMaterial": [
        {
          "id": "material-id-009",
          "topicId": "topic-id-003",
          "title": "Java Multithreading Basics",
          "description": "Learn the basics of multithreading in Java, including creating threads and managing synchronization.",
          "contentType": MaterialType.VIDEO,
          "contentUrl": "http://example.com/java-multithreading-video",
          "contentText": "Watch this video to learn how to work with threads in Java.",
          "durationMinutes": 45,
          "difficultyLevel": SkillLevel.ADVANCED,
          "tags": ["Java", "Multithreading", "Concurrency"],
          "orderIndex": 1,
          "isActive": true,
          "createdAt": "2025-10-15T09:30:00",
          "updatedAt": "2025-10-20T15:00:00"
        },
        {
          "id": "material-id-010",
          "topicId": "topic-id-003",
          "title": "Understanding Java Streams",
          "description": "This article explains Java streams and how they can be used to process collections in a functional style.",
          "contentType": MaterialType.TEXT,
          "contentUrl": "http://example.com/java-streams",
          "contentText": "Learn about Java streams and how to use them for functional programming.",
          "durationMinutes": 60,
          "difficultyLevel": SkillLevel.ADVANCED,
          "tags": ["Java", "Streams", "Functional Programming"],
          "orderIndex": 2,
          "isActive": true,
          "createdAt": "2025-10-16T10:00:00",
          "updatedAt": "2025-10-20T15:30:00"
        },
        {
          "id": "material-id-011",
          "topicId": "topic-id-003",
          "title": "Exploring the Java Collections Framework",
          "description": "A comprehensive guide to Java's Collections Framework, including lists, sets, maps, and iterators.",
          "contentType": MaterialType.VIDEO,
          "contentUrl": "http://example.com/java-collections-framework-video",
          "contentText": "This video covers the Java Collections Framework and how to use its classes.",
          "durationMinutes": 50,
          "difficultyLevel": SkillLevel.ADVANCED,
          "tags": ["Java", "Collections", "Data Structures"],
          "orderIndex": 3,
          "isActive": true,
          "createdAt": "2025-10-17T11:00:00",
          "updatedAt": "2025-10-20T16:00:00"
        }
      ],
      "quizzes": [
        {
          "id": "quiz-id-003",
          "topicId": "topic-id-003",
          "instructorId": "instructor-id-001",
          "title": "Advanced Java Final Exam",
          "description": "Comprehensive test of advanced Java concepts",
          "quizType": QuizType.FINAL_EXAM,
          "difficultyLevel": SkillLevel.ADVANCED,
          "timeLimitMinutes": 90,
          "totalQuestions": 25,
          "passingScore": 80,
          "isActive": true,
          "isAiGenerated": false,
          "aiGenerationPrompt": "",
          "createdAt": "2025-10-17T14:00:00",
          "updatedAt": "2025-10-20T17:00:00"
        }
      ]
    }
  ]
};
