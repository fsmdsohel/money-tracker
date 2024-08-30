import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ExpenseEditProps {}

export default function ExpenseNew({}: ExpenseEditProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          <span className="text-sm text-gray-500 ">+ New</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new category</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Input id="category" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="budget" className="text-right">
              Budget
            </Label>
            <Input id="budget" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Add New</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
