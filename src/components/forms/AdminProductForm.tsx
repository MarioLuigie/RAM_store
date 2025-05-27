'use client'

import { ActionTypes } from "@/lib/constants/enums"

export default function AdminProductForm({
  type,
}: {
  type: ActionTypes
}) {

  return (
    <div>
      PRODUCT FORM {`${type}`}
    </div>
  )
}