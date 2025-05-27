// components
import AdminProductForm from "@/components/forms/AdminProductForm";
import { ActionTypes } from "@/lib/constants/enums";

export default function CreateProductPage() {
	return (
		<div>
			<h1 className="text-xl  mb-3">Create Product</h1>
      <div className="my-8">
        <AdminProductForm type={ActionTypes.CREATE} />
      </div>
		</div>
	);
}
