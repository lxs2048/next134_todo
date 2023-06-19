import { storage, ID } from '@/appwrite'

export const uploadImage = async (file: ImageFile | null | undefined) => {
  if (!file) return
  const fileUploaded = await storage.createFile(
    process.env.NEXT_PUBLIC_TODOS_BUCKETS_ID!,
    ID.unique(),
    file.file
  )
  return fileUploaded
}
