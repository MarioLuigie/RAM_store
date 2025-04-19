// lib
import { APP_NAME } from "@/lib/constants"

export default function CopyrightNotice() {
  const currentYear = new Date().getFullYear()
  
	return (
		<div className="p-5 flex-center">
			{currentYear} &copy; <span className="font-bold pr-2 pl-1">{APP_NAME}</span>{' '}
			All Rights Reserved.
		</div>
	)
}
