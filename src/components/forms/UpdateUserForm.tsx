'use client'

import { User } from "@/lib/types/user.types"

export default function UpdateUserForm({
  user
}: {
  user: User
}) {
  console.log(user.name)
  
  return (
    <div>
      Update User Form
    </div>
  )
}