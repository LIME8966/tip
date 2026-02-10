import React, { useState } from 'react';
import { Layout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  Bookmark, 
  Send, 
  Calendar, 
  Gift,
  GripVertical,
  MoreVertical,
  StickyNote,
  Trash2,
  Clock,
  Building2
} from 'lucide-react';

const STATUS_COLUMNS = [
  { id: 'saved', title: 'Saved', icon: Bookmark, color: 'text-muted-foreground' },
  { id: 'applied', title: 'Applied', icon: Send, color: 'text-info' },
  { id: 'interview', title: 'Interview', icon: Calendar, color: 'text-warning' },
  { id: 'offer', title: 'Offer', icon: Gift, color: 'text-success' },
];

// Sortable Application Card
const SortableApplicationCard = ({ application, onNotesClick, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: application.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-background rounded-lg border border-border p-4 hover:border-primary/30 transition-colors"
    >
      <div className="flex items-start gap-2">
        <button
          {...attributes}
          {...listeners}
          className="mt-1 text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-4 h-4" />
        </button>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground truncate">
            {application.jobTitle}
          </h4>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <Building2 className="w-3 h-3" />
            {application.company}
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <Clock className="w-3 h-3" />
            {application.appliedDate}
          </p>
          
          {application.nextStep && (
            <div className="mt-2 p-2 bg-muted/50 rounded text-xs text-muted-foreground">
              {application.nextStep}
            </div>
          )}

          <div className="flex items-center gap-1 mt-3">
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-7 px-2"
              onClick={() => onNotesClick(application)}
            >
              <StickyNote className="w-3 h-3" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-7 px-2 text-destructive hover:text-destructive"
              onClick={() => onDelete(application.id)}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Application Card (for drag overlay)
const ApplicationCard = ({ application }) => (
  <div className="bg-background rounded-lg border-2 border-primary shadow-lg p-4">
    <h4 className="font-semibold text-foreground">{application.jobTitle}</h4>
    <p className="text-sm text-muted-foreground">{application.company}</p>
  </div>
);

const ApplicationsPage = () => {
  const { applications, updateApplicationStatus, updateApplicationNotes } = useApp();
  const [activeId, setActiveId] = useState(null);
  const [notesDialog, setNotesDialog] = useState({ open: false, application: null });
  const [notes, setNotes] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getApplicationsByStatus = (status) => {
    return applications.filter(app => app.status === status);
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    // Find which column was dropped on
    const overColumn = STATUS_COLUMNS.find(col => col.id === over.id);
    if (overColumn) {
      updateApplicationStatus(active.id, overColumn.id);
      toast.success(`Moved to ${overColumn.title}`);
    }
  };

  const handleNotesClick = (application) => {
    setNotes(application.notes || '');
    setNotesDialog({ open: true, application });
  };

  const saveNotes = () => {
    if (notesDialog.application) {
      updateApplicationNotes(notesDialog.application.id, notes);
      toast.success('Notes saved');
    }
    setNotesDialog({ open: false, application: null });
  };

  const handleDelete = (appId) => {
    // In real app, would delete from state
    toast.success('Application removed');
  };

  const activeApplication = activeId 
    ? applications.find(app => app.id === activeId) 
    : null;

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen bg-muted/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-heading text-3xl font-bold text-foreground">
              Application Tracker
            </h1>
            <p className="text-muted-foreground mt-1">
              Track and manage your job applications
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {STATUS_COLUMNS.map((col) => {
              const count = getApplicationsByStatus(col.id).length;
              return (
                <Card key={col.id}>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${col.color}`}>
                      <col.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{count}</p>
                      <p className="text-sm text-muted-foreground">{col.title}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Kanban Board */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {STATUS_COLUMNS.map((column) => {
                const columnApps = getApplicationsByStatus(column.id);
                
                return (
                  <div
                    key={column.id}
                    className="bg-muted/30 rounded-xl p-4 min-h-[400px]"
                  >
                    {/* Column Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <column.icon className={`w-5 h-5 ${column.color}`} />
                        <h3 className="font-semibold text-foreground">{column.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {columnApps.length}
                        </Badge>
                      </div>
                    </div>

                    {/* Droppable Area */}
                    <SortableContext
                      items={columnApps.map(app => app.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div 
                        id={column.id}
                        className="space-y-3 min-h-[300px]"
                      >
                        {columnApps.map((application) => (
                          <SortableApplicationCard
                            key={application.id}
                            application={application}
                            onNotesClick={handleNotesClick}
                            onDelete={handleDelete}
                          />
                        ))}
                        
                        {columnApps.length === 0 && (
                          <div className="border-2 border-dashed border-border rounded-lg p-4 text-center text-muted-foreground text-sm">
                            Drop applications here
                          </div>
                        )}
                      </div>
                    </SortableContext>
                  </div>
                );
              })}
            </div>

            <DragOverlay>
              {activeApplication ? (
                <ApplicationCard application={activeApplication} />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>

      {/* Notes Dialog */}
      <Dialog open={notesDialog.open} onOpenChange={(open) => setNotesDialog({ ...notesDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Application Notes</DialogTitle>
          </DialogHeader>
          
          {notesDialog.application && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">{notesDialog.application.jobTitle}</h4>
                <p className="text-sm text-muted-foreground">{notesDialog.application.company}</p>
              </div>
              
              <Textarea
                placeholder="Add notes about this application..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[150px]"
              />
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setNotesDialog({ open: false, application: null })}>
              Cancel
            </Button>
            <Button onClick={saveNotes}>
              Save Notes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default ApplicationsPage;
