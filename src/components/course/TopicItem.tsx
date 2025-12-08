import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Video, FileText, Image, HelpCircle, GripVertical, Plus, Sparkles, Loader2 } from 'lucide-react';
import { TopicDto, LearningMaterialDto, QuizDto, SkillLevel, MaterialType, QuizQuestionDto } from '@/services/types';
import { generateQuizQuestions } from '@/services/api/quiz';
import { toast } from 'sonner';

type QuestionType = "MCQ" | "TRUE_FALSE";

export interface QuizWithQuestions extends QuizDto {
  questions: QuizQuestionDto[];
}

interface TopicItemProps {
  topic: TopicDto & { materials: (LearningMaterialDto & { file?: File })[]; quizzes: QuizWithQuestions[] };
  onUpdate: (updates: Partial<TopicDto>) => void;
  onDelete: () => void;
  onAddMaterial: (type: MaterialType) => void;
  onAddQuiz: () => void;
  onUpdateMaterial: (materialId: string, updates: Partial<LearningMaterialDto & { file?: File }>) => void;
  onDeleteMaterial: (materialId: string) => void;
  onUpdateQuiz: (quizId: string, updates: Partial<QuizWithQuestions>) => void;
  onDeleteQuiz: (quizId: string) => void;
  onAddQuizQuestion: (quizId: string) => void;
  onUpdateQuizQuestion: (quizId: string, questionId: string, updates: Partial<QuizQuestionDto>) => void;
  onDeleteQuizQuestion: (quizId: string, questionId: string) => void;
  topicIndex: number;
}

export default function TopicItem({
  topic,
  onUpdate,
  onDelete,
  onAddMaterial,
  onAddQuiz,
  onUpdateMaterial,
  onDeleteMaterial,
  onUpdateQuiz,
  onDeleteQuiz,
  onAddQuizQuestion,
  onUpdateQuizQuestion,
  onDeleteQuizQuestion,
  topicIndex
}: TopicItemProps) {
  const [generatingQuizId, setGeneratingQuizId] = useState<string | null>(null);

  const getIconForType = (type: MaterialType) => {
    switch (type) {
      case MaterialType.VIDEO: return <Video className="w-4 h-4" />;
      case MaterialType.DOCUMENT: return <FileText className="w-4 h-4" />;
      case MaterialType.IMAGE: return <Image className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const handleOptionChange = (question: QuizQuestionDto, key: string, value: string, quizId: string) => {
    const newOptions = { ...question.options, [key]: value };
    onUpdateQuizQuestion(quizId, question.id, { options: newOptions });
  };

  const addOption = (question: QuizQuestionDto, quizId: string) => {
    const optionKeys = Object.keys(question.options || {});
    const nextKey = String.fromCharCode(65 + optionKeys.length); // A, B, C, D...
    const newOptions = { ...question.options, [nextKey]: '' };
    onUpdateQuizQuestion(quizId, question.id, { options: newOptions });
  };

  const removeOption = (question: QuizQuestionDto, key: string, quizId: string) => {
    const newOptions = { ...question.options };
    delete newOptions[key];
    onUpdateQuizQuestion(quizId, question.id, { options: newOptions });
  };

  const handleGenerateQuestions = async (quiz: QuizWithQuestions) => {
    if (!quiz.title || !quiz.description) {
      toast.error('Please enter quiz title and description first');
      return;
    }

    setGeneratingQuizId(quiz.id);
    try {
      const response = await generateQuizQuestions({
        title: quiz.title,
        description: quiz.description
      });

      if (response.result && response.object) {
        const generatedQuestions = response.object.questions;
        
        // Convert AI generated questions to QuizQuestionDto format
        const newQuestions: Partial<QuizQuestionDto>[] = generatedQuestions.map((q, index) => ({
          id: `temp_${Date.now()}_${index}`,
          quizId: quiz.id,
          questionType: q.questionType,
          questionText: q.questionText,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          points: q.points,
          orderIndex: q.orderIndex
        }));

        // Update quiz with generated questions
        onUpdateQuiz(quiz.id, { 
          questions: [...(quiz.questions || []), ...newQuestions] as QuizQuestionDto[],
          totalQuestions: (quiz.questions?.length || 0) + newQuestions.length
        });
        
        toast.success(`Generated ${newQuestions.length} questions successfully!`);
      } else {
        toast.error('Failed to generate questions');
      }
    } catch (error) {
      console.error('Error generating questions:', error);
      toast.error('Failed to generate questions');
    } finally {
      setGeneratingQuizId(null);
    }
  };

  return (
    <Card className="border-border/50">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-start gap-3">
          <GripVertical className="w-5 h-5 text-muted-foreground mt-2" />
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <Input
                placeholder={`Topic ${topicIndex + 1} title`}
                value={topic.title}
                onChange={(e) => onUpdate({ title: e.target.value })}
                className="bg-secondary"
              />
              <Button type="button" variant="ghost" size="icon" onClick={onDelete}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>

            <Input
              placeholder="Topic description"
              value={topic.description}
              onChange={(e) => onUpdate({ description: e.target.value })}
              className="bg-secondary"
            />

            <div className="grid grid-cols-2 gap-2">
              <Select 
                value={topic.difficultyLevel} 
                onValueChange={(value) => onUpdate({ difficultyLevel: value as SkillLevel })}
              >
                <SelectTrigger className="bg-secondary">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={SkillLevel.BEGINNER}>Beginner</SelectItem>
                  <SelectItem value={SkillLevel.INTERMEDIATE}>Intermediate</SelectItem>
                  <SelectItem value={SkillLevel.ADVANCED}>Advanced</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Duration (mins)"
                value={topic.estimatedDurationMinutes || ''}
                onChange={(e) => onUpdate({ estimatedDurationMinutes: parseInt(e.target.value) })}
                className="bg-secondary"
              />
            </div>

            {/* Learning Materials */}
            <div className="space-y-2 pl-4">
              {topic.materials.map((material) => (
                <Card key={material.id} className="border-border/30">
                  <CardContent className="p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      {getIconForType(material.contentType)}
                      <span className="text-sm font-medium capitalize">{material.contentType.toLowerCase()}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="ml-auto"
                        onClick={() => onDeleteMaterial(material.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                    <Input
                      placeholder="Material title"
                      value={material.title}
                      onChange={(e) => onUpdateMaterial(material.id, { title: e.target.value })}
                      className="bg-secondary"
                    />
                    <div className="space-y-2">
                      <Input
                        type="file"
                        accept={material.contentType === MaterialType.VIDEO ? 'video/*' : material.contentType === MaterialType.IMAGE ? 'image/*' : '.pdf,.doc,.docx,.ppt,.pptx'}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            onUpdateMaterial(material.id, { file });
                          }
                        }}
                        className="bg-secondary"
                      />
                      {material.file && (
                        <p className="text-xs text-muted-foreground">
                          Selected: {material.file.name}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Quizzes */}
              {topic.quizzes.map((quiz) => (
                <Card key={quiz.id} className="border-border/30 bg-accent/5">
                  <CardContent className="p-3 space-y-3">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Quiz</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="ml-auto"
                        onClick={() => onDeleteQuiz(quiz.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                    
                    {/* Quiz Basic Info */}
                    <Input
                      placeholder="Quiz title"
                      value={quiz.title}
                      onChange={(e) => onUpdateQuiz(quiz.id, { title: e.target.value })}
                      className="bg-secondary"
                    />
                    <Textarea
                      placeholder="Quiz description"
                      value={quiz.description}
                      onChange={(e) => onUpdateQuiz(quiz.id, { description: e.target.value })}
                      className="bg-secondary"
                      rows={2}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        placeholder="Total questions"
                        value={quiz.totalQuestions || ''}
                        onChange={(e) => onUpdateQuiz(quiz.id, { totalQuestions: parseInt(e.target.value) })}
                        className="bg-secondary"
                      />
                      <Input
                        type="number"
                        placeholder="Passing score (%)"
                        value={quiz.passingScore || ''}
                        onChange={(e) => onUpdateQuiz(quiz.id, { passingScore: parseInt(e.target.value) })}
                        className="bg-secondary"
                      />
                    </div>

                    {/* Quiz Questions */}
                    <div className="space-y-3 mt-4">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-sm font-medium text-muted-foreground">Questions</span>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleGenerateQuestions(quiz)}
                            disabled={generatingQuizId === quiz.id}
                            className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 hover:border-purple-500/50"
                          >
                            {generatingQuizId === quiz.id ? (
                              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                            ) : (
                              <Sparkles className="w-3 h-3 mr-1" />
                            )}
                            Generate with AI
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => onAddQuizQuestion(quiz.id)}
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Add Question
                          </Button>
                        </div>
                      </div>

                      {quiz.questions?.map((question, qIndex) => (
                        <Card key={question.id} className="border-border/20 bg-background/50">
                          <CardContent className="p-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-muted-foreground">Question {qIndex + 1}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => onDeleteQuizQuestion(quiz.id, question.id)}
                              >
                                <Trash2 className="w-3 h-3 text-destructive" />
                              </Button>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <Select
                                value={question.questionType}
                                onValueChange={(value) => onUpdateQuizQuestion(quiz.id, question.id, { questionType: value as QuestionType })}
                              >
                                <SelectTrigger className="bg-secondary">
                                  <SelectValue placeholder="Question Type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="MCQ">Multiple Choice</SelectItem>
                                  <SelectItem value="TRUE_FALSE">True/False</SelectItem>
                                </SelectContent>
                              </Select>
                              <Input
                                type="number"
                                placeholder="Points"
                                value={question.points || ''}
                                onChange={(e) => onUpdateQuizQuestion(quiz.id, question.id, { points: parseInt(e.target.value) })}
                                className="bg-secondary"
                              />
                            </div>

                            <Textarea
                              placeholder="Question text"
                              value={question.questionText}
                              onChange={(e) => onUpdateQuizQuestion(quiz.id, question.id, { questionText: e.target.value })}
                              className="bg-secondary"
                              rows={2}
                            />

                            {/* Options */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">Options</span>
                                {question.questionType === 'MCQ' && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 text-xs"
                                    onClick={() => addOption(question, quiz.id)}
                                  >
                                    <Plus className="w-3 h-3 mr-1" />
                                    Add Option
                                  </Button>
                                )}
                              </div>
                              
                              {question.questionType === 'TRUE_FALSE' ? (
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="flex items-center gap-2 p-2 rounded bg-secondary">
                                    <span className="text-sm">A: True</span>
                                  </div>
                                  <div className="flex items-center gap-2 p-2 rounded bg-secondary">
                                    <span className="text-sm">B: False</span>
                                  </div>
                                </div>
                              ) : (
                                <div className="space-y-1">
                                  {Object.entries(question.options || {}).map(([key, value]) => (
                                    <div key={key} className="flex items-center gap-2">
                                      <span className="text-xs font-medium w-4">{key}:</span>
                                      <Input
                                        placeholder={`Option ${key}`}
                                        value={value}
                                        onChange={(e) => handleOptionChange(question, key, e.target.value, quiz.id)}
                                        className="bg-secondary flex-1"
                                      />
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={() => removeOption(question, key, quiz.id)}
                                      >
                                        <Trash2 className="w-3 h-3 text-destructive" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            <Input
                              placeholder={question.questionType === 'TRUE_FALSE' ? "Correct answer (True/False)" : "Correct answer (e.g., A)"}
                              value={question.correctAnswer}
                              onChange={(e) => onUpdateQuizQuestion(quiz.id, question.id, { correctAnswer: e.target.value })}
                              className="bg-secondary"
                            />

                            <Textarea
                              placeholder="Explanation (optional)"
                              value={question.explanation}
                              onChange={(e) => onUpdateQuizQuestion(quiz.id, question.id, { explanation: e.target.value })}
                              className="bg-secondary"
                              rows={2}
                            />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Add Content Buttons */}
              <div className="flex gap-2 flex-wrap pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onAddMaterial(MaterialType.VIDEO)}
                >
                  <Video className="w-4 h-4 mr-2" />
                  Video
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onAddMaterial(MaterialType.DOCUMENT)}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Document
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onAddMaterial(MaterialType.IMAGE)}
                >
                  <Image className="w-4 h-4 mr-2" />
                  Image
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onAddQuiz}
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Quiz
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
