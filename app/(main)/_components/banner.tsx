'use client'

import { useRouter } from "next/navigation"
import { useMutation } from "convex/react"
import { toast } from 'sonner'

import { Id } from "@/convex/_generated/dataModel"
import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"
import { ConfirmModal } from "@/components/modals/confirm-modal"

interface BannerProps {
  documentId:Id<'documents'>
}

export function Banner ({documentId}:BannerProps) {

  const router = useRouter()

  const remove = useMutation(api.documents.remove)
  const restore = useMutation(api.documents.restore)

  const onRemove = () => {
    const promise = remove({id:documentId})

    toast.promise(promise,{
      loading:'Not siliniyor...',
      success:'Not silindi!',
      error:'Not silme başarısız.'
    })

    router.push('/documents')
  }

  const onRestore = () => {
    const promise = restore({id:documentId})

    toast.promise(promise,{
      loading:'Not kurtarılıyor...',
      success:'Not kurtarıldı!',
      error:'Not kurtarma başarısız.'
    })
  }

return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex gap-x-2 justify-center items-center">
      <p>Bu sayfa çöpün içinde.</p>
      <Button className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2
      h-auto font-normal" variant='outline' size='sm' onClick={onRestore}>
        Sayfayı yenile
      </Button>
       <ConfirmModal onConfirm={onRemove}>
        <Button className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2
      h-auto font-normal" variant='outline' size='sm'>
        Sonsuza kadar sil
      </Button>
       </ConfirmModal>
    </div>
)
}