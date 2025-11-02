import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Upload, Video, FileText, Image, GripVertical } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';

interface Section {
  id: string;
  title: string;
  items: SectionItem[];
}

interface SectionItem {
  id: string;
  type: 'video' | 'document' | 'image';
  title: string;
  subtitle: string;
  file: File | null;
  fileName: string;
}

export default function CreateCourse() {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    level: '',
    price: '',
    thumbnail: null as File | null,
  });
  const [sections, setSections] = useState<Section[]>([]);

  const addSection = () => {
    const newSection: Section = {
      id: Date.now().toString(),
      title: '',
      items: [],
    };
    setSections([...sections, newSection]);
  };

  const updateSectionTitle = (sectionId: string, title: string) => {
    setSections(sections.map(section => 
      section.id === sectionId ? { ...section, title } : section
    ));
  };

  const deleteSection = (sectionId: string) => {
    setSections(sections.filter(section => section.id !== sectionId));
  };

  const addItemToSection = (sectionId: string, type: 'video' | 'document' | 'image') => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        const newItem: SectionItem = {
          id: Date.now().toString(),
          type,
          title: '',
          subtitle: '',
          file: null,
          fileName: '',
        };
        return { ...section, items: [...section.items, newItem] };
      }
      return section;
    }));
  };

  const updateItem = (sectionId: string, itemId: string, updates: Partial<SectionItem>) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          items: section.items.map(item =>
            item.id === itemId ? { ...item, ...updates } : item
          ),
        };
      }
      return section;
    }));
  };

  const deleteItem = (sectionId: string, itemId: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          items: section.items.filter(item => item.id !== itemId),
        };
      }
      return section;
    }));
  };

  const handleFileSelect = (sectionId: string, itemId: string, file: File) => {
    updateItem(sectionId, itemId, { file, fileName: file.name });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!courseData.title || !courseData.description || !courseData.level || !courseData.price) {
      toast.error('Please fill in all course details');
      return;
    }

    if (sections.length === 0) {
      toast.error('Please add at least one section');
      return;
    }

    // Validate sections
    for (const section of sections) {
      if (!section.title) {
        toast.error('All sections must have a title');
        return;
      }
      if (section.items.length === 0) {
        toast.error('Each section must have at least one item');
        return;
      }
      for (const item of section.items) {
        if (!item.title || !item.file) {
          toast.error('All items must have a title and file');
          return;
        }
      }
    }

    toast.success('Course created successfully!');
    setTimeout(() => navigate('/instructor/dashboard'), 1000);
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-5 h-5" />;
      case 'document': return <FileText className="w-5 h-5" />;
      case 'image': return <Image className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 px-4 md:px-6 pb-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2 animate-fade-in">
            <h1 className="text-4xl font-bold gradient-text">Create New Course</h1>
            <p className="text-muted-foreground">Build an engaging learning experience for your students</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Course Details */}
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
                    value={courseData.title}
                    onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                    className="bg-secondary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what students will learn in this course..."
                    value={courseData.description}
                    onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                    className="bg-secondary min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="level">Course Level *</Label>
                    <Select value={courseData.level} onValueChange={(value) => setCourseData({ ...courseData, level: value })}>
                      <SelectTrigger className="bg-secondary">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="99.99"
                      value={courseData.price}
                      onChange={(e) => setCourseData({ ...courseData, price: e.target.value })}
                      className="bg-secondary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thumbnail">Course Thumbnail</Label>
                  <Input
                    id="thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCourseData({ ...courseData, thumbnail: e.target.files?.[0] || null })}
                    className="bg-secondary"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Course Content */}
            <Card className="glass border-border/50 animate-slide-in" style={{ animationDelay: '100ms' }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Course Content</CardTitle>
                    <CardDescription>Organize your course into sections and add learning materials</CardDescription>
                  </div>
                  <Button type="button" onClick={addSection} variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Section
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {sections.map((section, sectionIndex) => (
                  <Card key={section.id} className="border-border/50">
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-3">
                        <GripVertical className="w-5 h-5 text-muted-foreground mt-2" />
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-2">
                            <Input
                              placeholder={`Section ${sectionIndex + 1} title`}
                              value={section.title}
                              onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                              className="bg-secondary"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteSection(section.id)}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>

                          {/* Section Items */}
                          <div className="space-y-2 pl-4">
                            {section.items.map((item) => (
                              <Card key={item.id} className="border-border/30">
                                <CardContent className="p-4 space-y-3">
                                  <div className="flex items-center gap-2">
                                    {getItemIcon(item.type)}
                                    <span className="text-sm font-medium capitalize">{item.type}</span>
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <Input
                                      placeholder="Item title"
                                      value={item.title}
                                      onChange={(e) => updateItem(section.id, item.id, { title: e.target.value })}
                                      className="bg-secondary"
                                    />
                                    <Input
                                      placeholder="Item subtitle (optional)"
                                      value={item.subtitle}
                                      onChange={(e) => updateItem(section.id, item.id, { subtitle: e.target.value })}
                                      className="bg-secondary"
                                    />
                                    
                                    <div className="flex items-center gap-2">
                                      <Input
                                        type="file"
                                        accept={item.type === 'video' ? 'video/*' : item.type === 'document' ? '.pdf,.doc,.docx' : 'image/*'}
                                        onChange={(e) => e.target.files && handleFileSelect(section.id, item.id, e.target.files[0])}
                                        className="bg-secondary"
                                      />
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => deleteItem(section.id, item.id)}
                                      >
                                        <Trash2 className="w-4 h-4 text-destructive" />
                                      </Button>
                                    </div>
                                    
                                    {item.fileName && (
                                      <p className="text-xs text-muted-foreground">
                                        Selected: {item.fileName}
                                      </p>
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            ))}

                            {/* Add Item Buttons */}
                            <div className="flex gap-2 pt-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addItemToSection(section.id, 'video')}
                              >
                                <Video className="w-4 h-4 mr-2" />
                                Add Video
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addItemToSection(section.id, 'document')}
                              >
                                <FileText className="w-4 h-4 mr-2" />
                                Add Document
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addItemToSection(section.id, 'image')}
                              >
                                <Image className="w-4 h-4 mr-2" />
                                Add Image
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}

                {sections.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Upload className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No sections yet. Click "Add Section" to start building your course.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => navigate('/instructor/dashboard')}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90 glow-hover">
                Create Course
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
