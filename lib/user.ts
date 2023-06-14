import { databases, ID, Query } from '@/appwrite'

export const getUserbyEmail = async (email: string): Promise<User | null> => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
    [Query.equal('email', email)]
  )
  const users = data.documents as User[]
  return users[0] || null
}

export const updateUser = async (user: UserBase) => {
  await databases.createDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
    ID.unique(),
    user
  )
}
