import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SkillLevel, CourseDto } from '@/services/types';

interface CourseBasicInfoProps {
  courseData: Partial<CourseDto>;
  onChange: (updates: Partial<CourseDto>) => void;
}

export default function CourseBasicInfo({ courseData, onChange }: CourseBasicInfoProps) {
  return (
    <Card className="glass border-border/50 animate-slide-in">
      <CardHeader>
        <CardTitle>Course Details</CardTitle>
        <CardDescription>Provide basic information about your course</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Course Title *</Label>
          <Input
            id="title"
            placeholder="e.g., Complete Web Development Bootcamp"
            value={courseData.title || ''}
            onChange={(e) => onChange({ title: e.target.value })}
            className="bg-secondary"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            placeholder="Describe what students will learn in this course..."
            value={courseData.description || ''}
            onChange={(e) => onChange({ description: e.target.value })}
            className="bg-secondary min-h-[100px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="level">Difficulty Level *</Label>
            <Select 
              value={courseData.difficultyLevel} 
              onValueChange={(value) => onChange({ difficultyLevel: value as SkillLevel })}
            >
              <SelectTrigger className="bg-secondary">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={SkillLevel.BEGINNER}>Beginner</SelectItem>
                <SelectItem value={SkillLevel.INTERMEDIATE}>Intermediate</SelectItem>
                <SelectItem value={SkillLevel.ADVANCED}>Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price *</Label>
            <Input
              id="price"
              type="number"
              placeholder="99.99"
              value={courseData.price || ''}
              onChange={(e) => onChange({ price: parseFloat(e.target.value) })}
              className="bg-secondary"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Estimated Duration (hours) *</Label>
          <Input
            id="duration"
            type="number"
            placeholder="40"
            value={courseData.estimatedDurationHours || ''}
            onChange={(e) => onChange({ estimatedDurationHours: parseInt(e.target.value) })}
            className="bg-secondary"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="thumbnail">Course Thumbnail URL</Label>
          <Input
            id="thumbnail"
            placeholder="https://example.com/image.jpg"
            value={courseData.thumbnailUrl || ''}
            onChange={(e) => onChange({ thumbnailUrl: e.target.value })}
            className="bg-secondary"
          />
        </div>
      </CardContent>
    </Card>
  );
}
