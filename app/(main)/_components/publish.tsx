'use client'

import { useState } from "react"
import { useMutation } from "convex/react"
import { Check, Copy, Globe } from "lucide-react"
import { toast } from "sonner"

import { Doc } from "@/convex/_generated/dataModel"
import {Popover,PopoverTrigger,PopoverContent} from '@/components/ui/popover'

import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"
import { useOrigin } from "@/hooks/use-origin"

interface PublishProps {
  initialData:Doc<'documents'>
}

export function Publish ({initialData}:PublishProps) {

  const origin = useOrigin()
  const update = useMutation(api.documents.update)

  const [copied,setCopied] = useState(false)
  const [isSubmitting,setIsSubmitting] = useState(false)

  const url = `${origin}/preview/${initialData._id}`

  const onPublish = () => {
    setIsSubmitting(true)

    const promise = update({
      id:initialData._id,
      isPublished:true
    })
    .finally(() => setIsSubmitting(false))
  
    toast.promise(promise,{
      loading:"Yayınlanıyor...",
      success:"Not yayınlandı",
      error:"Not yayınlama başarısız."
    })
  }

    const onUnPublish = () => {
    setIsSubmitting(true)

    const promise = update({
      id:initialData._id,
      isPublished:false
    })
    .finally(() => setIsSubmitting(false))
  
    toast.promise(promise,{
      loading:"Yayından kaldırılıyor...",
      success:"Yayından kaldırıldı.",
      error:"Yayından kaldırma başarısız."
    })
  }

  const onCopy = () => {
    navigator.clipboard.writeText(url)

    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1000);
  }

return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size='sm' variant='ghost'>
          Yayınla
          {initialData.isPublished && <Globe className="text-sky-500 w-4 h-4 ml-2"/>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex gap-x-2 items-center">
              <Globe className="text-sky-500 animate-pulse w-4 h-4"/>
              <p className="text-xs font-medium text-sky-500">
                Bu not web'de canlı
              </p>
            </div>
            <div className="flex items-center">
              <input className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
               value={url} disabled/>
               <Button className="h-8 rounded-l-none" onClick={onCopy} disabled={copied}>
                {copied ? (
                  <Check className="w-4 h-4"/>
                ) : (
                  <Copy className="w-4 h-4"/>
                )}
               </Button>
            </div>
            <Button className="w-full text-xs" size='sm' disabled={isSubmitting} onClick={onUnPublish}>
              Yayından Kaldır
            </Button>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <Globe className="w-8 h-8 text-muted-foreground mb-2"/>
            <p className="text-sm font-medium mb-2">
              Notu yayınla
            </p>
            <span className="text-xs text-muted-foreground mb-4">
              Çalışmanızı başkalarıyla paylaşın.
            </span>
            <Button className="w-full text-xs" size='sm' disabled={isSubmitting} onClick={onPublish}>
              Yayınla
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
)
}