import type React from "react";

import { useState, useRef } from "react";
import { Camera, Upload, X, Check, RefreshCw } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useUpload } from "@/services/base";
import { useUpdateUser } from "@/services/profile";
import { getFileFromDiv } from "@/utils/fileFromDiv";

interface AvatarUploadProps {
  currentAvatar?: string;
  username: string;
  size?: "sm" | "md" | "lg" | "xl";
  onAvatarChange?: (avatarUrl: string) => void;
}

export function AvatarUpload({
  currentAvatar = "/placeholder.svg?height=200&width=200",
  username,
  size = "md",
  onAvatarChange,
}: AvatarUploadProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [zoom, setZoom] = useState([1]);
  const [rotation, setRotation] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { uploadFn } = useUpload();
  const { updateUserFn } = useUpdateUser();

  // Size mapping for avatar
  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-32 w-32",
    xl: "h-40 w-40",
  };

  // Size mapping for edit button
  const buttonSizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
    xl: "h-12 w-12",
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Create a preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewUrl(event.target.result as string);
          setActiveTab("edit");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);

      // Create a preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewUrl(event.target.result as string);
          setActiveTab("edit");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const divRef = useRef<HTMLDivElement>(null);
  const handleSaveAvatar = async () => {
    setIsUploading(true);

    if (divRef.current) {
      try {
        // const newAvatarUrl = previewUrl || currentAvatar;
        const file = await getFileFromDiv(divRef.current);
        const form = new FormData();
        form.append("file", file);
        const data = await uploadFn(form, {
          onSuccess: (url: string) => {
            if (onAvatarChange) onAvatarChange(url);
          },
        });
        await updateUserFn({ avatarUrl: data });
      } catch (e) {
        toast.error(e as string);
      }
      setIsUploading(false);
      setIsOpen(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      setZoom([1]);
      setRotation(0);
    }
  };

  const resetEditor = () => {
    setZoom([1]);
    setRotation(0);
  };

  return (
    <div className="relative inline-block">
      <Avatar className={sizeClasses[size]}>
        <AvatarImage
          className=" object-cover object-center"
          src={currentAvatar}
          alt={username}
        />
        <AvatarFallback>{username.charAt(0)}</AvatarFallback>
      </Avatar>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            variant="secondary"
            className={` cursor-pointer absolute bottom-0 right-0 ${buttonSizeClasses[size]} rounded-full`}
          >
            <Camera className="h-4 w-4" />
            <span className="sr-only">Change avatar</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>上传个人头像</DialogTitle>
            <DialogDescription>
              从电脑文件夹中选择一张图片上传
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload" className=" cursor-pointer">
                上传
              </TabsTrigger>
              <TabsTrigger
                value="edit"
                className=" cursor-pointer"
                disabled={!previewUrl}
              >
                编辑
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="py-4">
              <div
                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={triggerFileInput}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm font-medium mb-1">
                  点击或者拖拽图片来上传
                </p>
                <p className="text-xs text-muted-foreground">
                  SVG, PNG, JPG 或 GIF (最大 2MB)
                </p>
              </div>

              <div className="mt-4 flex justify-end">
                <Button
                  className=" cursor-pointer"
                  variant="outline"
                  onClick={() => {
                    setIsOpen(false);
                    setPreviewUrl("");
                  }}
                >
                  取消
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="edit" className="py-4">
              {previewUrl && (
                <div className="space-y-4">
                  <div className="relative mx-auto w-48 h-48 overflow-hidden rounded-full border">
                    <div
                      ref={divRef}
                      className="w-full h-full"
                      style={{
                        transform: `rotate(${rotation}deg)`,
                        transition: "transform 0.2s ease-in-out",
                      }}
                    >
                      <Avatar className="w-full h-full">
                        <AvatarImage
                          src={previewUrl || "/placeholder.svg"}
                          alt="Preview"
                          className="object-cover object-center"
                        />
                        <AvatarFallback>{username.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">缩放</span>
                        <span className="text-sm text-muted-foreground">
                          {Math.round(zoom[0] * 100)}%
                        </span>
                      </div>
                      <Slider
                        value={zoom}
                        min={0.5}
                        max={2}
                        step={0.01}
                        onValueChange={setZoom}
                      />
                    </div> */}

                    <div className="flex justify-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleRotate}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={resetEditor}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <DialogFooter className="mt-4">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("upload")}
                >
                  返回
                </Button>
                <Button
                  className=" cursor-pointer"
                  onClick={handleSaveAvatar}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <span className="animate-spin mr-2">
                        <RefreshCw className="h-4 w-4" />
                      </span>
                      保存中...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      保存
                    </>
                  )}
                </Button>
              </DialogFooter>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
