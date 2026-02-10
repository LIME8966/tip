import React, { useState } from 'react';
import { Layout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useApp } from '@/context/AppContext';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Upload, 
  Star, 
  Trash2, 
  Download,
  Edit,
  Copy,
  Check,
  Sparkles,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

const ResumesPage = () => {
  const { resumes, setDefaultResume, deleteResume, addResume } = useApp();
  const [uploadDialog, setUploadDialog] = useState(false);
  const [tailorDialog, setTailorDialog] = useState({ open: false, resume: null });
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (file) => {
    if (file && (file.type === 'application/pdf' || file.type.includes('document'))) {
      // Mock adding a new resume
      addResume({
        name: file.name.replace(/\.[^/.]+$/, ''),
        lastModified: new Date().toISOString().split('T')[0],
        atsScore: Math.floor(Math.random() * 20) + 75,
        isDefault: false
      });
      setUploadDialog(false);
      toast.success('Resume uploaded successfully!');
    } else {
      toast.error('Please upload a PDF or DOC file');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleSetDefault = (resumeId) => {
    setDefaultResume(resumeId);
    toast.success('Default resume updated');
  };

  const handleDelete = (resumeId) => {
    deleteResume(resumeId);
    toast.success('Resume deleted');
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBg = (score) => {
    if (score >= 90) return 'bg-success/20';
    if (score >= 75) return 'bg-warning/20';
    return 'bg-destructive/20';
  };

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen bg-muted/30 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground">
                Resume Manager
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage and optimize your resumes
              </p>
            </div>
            <Button onClick={() => setUploadDialog(true)}>
              <Upload className="w-4 h-4 mr-2" />
              Upload Resume
            </Button>
          </motion.div>

          {/* Resume Cards */}
          <div className="space-y-4">
            {resumes.map((resume, index) => (
              <motion.div
                key={resume.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <FileText className="w-7 h-7 text-primary" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg text-foreground truncate">
                            {resume.name}
                          </h3>
                          {resume.isDefault && (
                            <Badge className="bg-primary/20 text-primary border-0">
                              <Star className="w-3 h-3 mr-1 fill-current" />
                              Default
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Last modified: {resume.lastModified}
                        </p>

                        {/* ATS Score */}
                        <div className="mt-3 flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">ATS Score:</span>
                            <span className={`font-semibold ${getScoreColor(resume.atsScore)}`}>
                              {resume.atsScore}%
                            </span>
                          </div>
                          <Progress 
                            value={resume.atsScore} 
                            className="w-32 h-2"
                          />
                          {resume.atsScore < 80 && (
                            <span className="text-xs text-warning flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              Room for improvement
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setTailorDialog({ open: true, resume })}
                        >
                          <Sparkles className="w-4 h-4 mr-1" />
                          Tailor
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        {!resume.isDefault && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleSetDefault(resume.id)}
                            >
                              <Star className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDelete(resume.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Tips Card */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Resume Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'Use action verbs to describe achievements',
                  'Quantify your accomplishments with numbers',
                  'Tailor your resume for each job application',
                  'Keep formatting clean and ATS-friendly'
                ].map((tip, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{tip}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upload Dialog */}
      <Dialog open={uploadDialog} onOpenChange={setUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Resume</DialogTitle>
          </DialogHeader>
          
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
              isDragging 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  Drag and drop your resume here
                </p>
                <p className="text-sm text-muted-foreground">
                  or click to browse (PDF, DOC, DOCX)
                </p>
              </div>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileUpload(e.target.files[0])}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tailor Dialog */}
      <Dialog open={tailorDialog.open} onOpenChange={(open) => setTailorDialog({ ...tailorDialog, open })}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              AI Resume Tailoring
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Select a job to tailor your resume for optimal matching. Our AI will:
            </p>
            <ul className="space-y-2">
              {[
                'Highlight relevant skills and experience',
                'Optimize keywords for ATS systems',
                'Adjust formatting for best visibility',
                'Generate a tailored cover letter'
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm font-medium text-foreground mb-2">Select a job posting:</p>
              <select className="w-full p-2 rounded-lg border border-input bg-background text-foreground">
                <option>Senior Frontend Developer - TechCorp</option>
                <option>Full Stack Engineer - CloudScale</option>
                <option>Product Designer - DesignFlow</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setTailorDialog({ open: false, resume: null })}>
              Cancel
            </Button>
            <Button onClick={() => {
              setTailorDialog({ open: false, resume: null });
              toast.success('Resume tailoring in progress...');
            }}>
              <Sparkles className="w-4 h-4 mr-2" />
              Tailor Resume
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default ResumesPage;
