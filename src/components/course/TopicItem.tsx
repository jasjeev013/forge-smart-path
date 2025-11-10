import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Video, FileText, Image, HelpCircle, GripVertical } from 'lucide-react';
import { TopicDto, LearningMaterialDto, QuizDto, SkillLevel, MaterialType, QuizType } from '@/services/types';

interface TopicItemProps {
  topic: TopicDto & { materials: (LearningMaterialDto & { file?: File })[]; quizzes: QuizDto[] };
  onUpdate: (updates: Partial<TopicDto>) => void;
  onDelete: () => void;
  onAddMaterial: (type: MaterialType) => void;
  onAddQuiz: () => void;
  onUpdateMaterial: (materialId: string, updates: Partial<LearningMaterialDto & { file?: File }>) => void;
  onDeleteMaterial: (materialId: string) => void;
  onUpdateQuiz: (quizId: string, updates: Partial<QuizDto>) => void;
  onDeleteQuiz: (quizId: string) => void;
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
  topicIndex
}: TopicItemProps) {
  const getIconForType = (type: MaterialType) => {
    switch (type) {
      case MaterialType.VIDEO: return <Video className="w-4 h-4" />;
      case MaterialType.DOCUMENT: return <FileText className="w-4 h-4" />;
      case MaterialType.IMAGE: return <Image className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
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
                  <CardContent className="p-3 space-y-2">
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
                    <Input
                      placeholder="Quiz title"
                      value={quiz.title}
                      onChange={(e) => onUpdateQuiz(quiz.id, { title: e.target.value })}
                      className="bg-secondary"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        placeholder="Time limit (mins)"
                        value={quiz.timeLimitMinutes || ''}
                        onChange={(e) => onUpdateQuiz(quiz.id, { timeLimitMinutes: parseInt(e.target.value) })}
                        className="bg-secondary"
                      />
                      <Input
                        type="number"
                        placeholder="Total questions"
                        value={quiz.totalQuestions || ''}
                        onChange={(e) => onUpdateQuiz(quiz.id, { totalQuestions: parseInt(e.target.value) })}
                        className="bg-secondary"
                      />
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
