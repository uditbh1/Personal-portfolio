import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cvPath } from "@/data/portfolioData";
import { Download, EyeOff } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const ResumeModal = ({ isOpen, onOpenChange }: ResumeModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline text-primary">Resume Preview</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            You can download the CV for the best viewing experience.
          </DialogDescription>
        </DialogHeader>
        <div className="my-6 p-4 border border-dashed border-border rounded-md min-h-[200px] flex flex-col items-center justify-center text-center">
          {/* Placeholder for PDF preview. Actual PDF rendering can be complex. */}
          <EyeOff className="w-16 h-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            In-browser PDF preview is not available in this demonstration.
          </p>
          <p className="text-sm text-muted-foreground">Please use the download button below.</p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button asChild>
          <a href={cvPath} target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-4 w-4" /> View CV
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeModal;
