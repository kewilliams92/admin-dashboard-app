import { useForm } from "@refinedev/react-hook-form";
import { useBack, type BaseRecord, type HttpError } from "@refinedev/core";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ImageIcon } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreateView } from "@/components/refine-ui/views/create-view";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { classSchema } from "@/lib/schema";
import { Subject } from "@/types";

type ClassFormValues = z.infer<typeof classSchema>;

type Teacher = { id: string; name: string };

const subjects: Subject[] = [
  { id: 1, name: "Algebra", code: "ALG", description: "", department: "" },
  { id: 2, name: "Biology", code: "BIO", description: "", department: "" },
  {
    id: 3,
    name: "World History",
    code: "WHIST",
    description: "",
    department: "",
  },
];

const teachers: Teacher[] = [
  { id: "t1", name: "Dr. Karen Mills" },
  { id: "t2", name: "Mr. James Carter" },
  { id: "t3", name: "Ms. Priya Nair" },
];

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Closed" },
];

const Create = () => {
  const back = useBack();

  const form = useForm<BaseRecord, HttpError, ClassFormValues>({
    resolver: zodResolver(classSchema),
    refineCoreProps: {
      resource: "classes",
      action: "create",
    },
    defaultValues: {
      status: "active",
      capacity: 1,
    },
  });

  const onSubmit = (data: ClassFormValues) => {
    console.log(data);
  };

  return (
    <CreateView>
      <Breadcrumb />
      <h1 className="page-title">Create Class</h1>

      <div className="intro-row">
        <p>Provide the details of the class you want to create.</p>
        <Button variant="outline" onClick={back}>
          Go back
        </Button>
      </div>

      <Separator />

      <div className="flex my-4 justify-center">
        <Card className="class-form-card">
          {/* Banner Image Section */}
          <div className="flex items-center justify-center h-36 w-full bg-muted rounded-t-md">
            <ImageIcon className="size-12 text-muted-foreground/30" />
          </div>

          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Fill out the form
            </CardTitle>
          </CardHeader>

          <Separator />

          <CardContent className="mt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Banner Image — Cloudinary upload coming soon */}
                <FormField
                  control={form.control}
                  name="bannerUrl"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel>Banner Image</FormLabel>
                      <div className="flex flex-col items-center justify-center gap-2 min-h-28 rounded-md border-2 border-dashed border-foreground/20 bg-muted/30">
                        <ImageIcon className="size-7 text-muted-foreground/40" />
                        <p className="text-sm text-muted-foreground">
                          Image upload coming soon
                        </p>
                      </div>
                      <input
                        type="hidden"
                        {...field}
                        value={field.value ?? ""}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Class Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Class Name <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Introduction to Algebra"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Subject */}
                  <FormField
                    control={form.control}
                    name="subjectId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Subject <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Select
                            value={field.value ? String(field.value) : ""}
                            onValueChange={(val) => field.onChange(Number(val))}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent>
                              {subjects.map((subject) => (
                                <SelectItem
                                  key={subject.id}
                                  value={String(subject.id)}
                                >
                                  {subject.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Teacher */}
                  <FormField
                    control={form.control}
                    name="teacherId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Teacher <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Select
                            value={field.value ?? ""}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a teacher" />
                            </SelectTrigger>
                            <SelectContent>
                              {teachers.map((teacher) => (
                                <SelectItem key={teacher.id} value={teacher.id}>
                                  {teacher.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Capacity */}
                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacity</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            placeholder="e.g. 30"
                            {...field}
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(
                                isNaN(e.target.valueAsNumber)
                                  ? undefined
                                  : e.target.valueAsNumber
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Status */}
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Status <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Select
                            value={field.value ?? ""}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                            <SelectContent>
                              {statusOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the class objectives, topics covered, and what students will learn throughout the course..."
                          className="min-h-[120px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Create Class
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </CreateView>
  );
};

export default Create;
